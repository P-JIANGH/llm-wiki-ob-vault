/**
 * Vault content reader — reads markdown files from the wiki vault (parent dir).
 * Exposes type-safe helpers for Astro pages.
 */
import fs from 'fs';
import path from 'path';

export const VAULT_ROOT = path.resolve(import.meta.dirname, '../../..');

// ─── frontmatter parser (used by both lib and Astro pages) ─────────────────

export function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, any> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    if (val.startsWith('[')) {
      data[key] = val.slice(1, -1).split(',').map((s: string) => s.trim()).filter(Boolean);
    } else {
      data[key] = val;
    }
  }
  return { data, content: match[2] || '' };
}

export type PageSection = 'entities' | 'concepts' | 'comparisons' | 'queries' | 'open-source-game' | 'raw';

export interface VaultEntry {
  slug: string;        // e.g. "entities/claude-code"
  section: PageSection;
  title: string;
  path: string;         // absolute path
  raw: string;          // raw frontmatter-stripped content
  frontmatter: Record<string, any>;
}

export interface Section {
  id: PageSection;
  label: string;
  entries: VaultEntry[];
}

// ─── low-level file reading ────────────────────────────────────────────────

export function readVaultFile(relativePath: string): string {
  return fs.readFileSync(path.join(VAULT_ROOT, relativePath), 'utf-8');
}

export function walkVaultDir(relativeDir: string, extensions = ['.md']): string[] {
  const absDir = path.join(VAULT_ROOT, relativeDir);
  if (!fs.existsSync(absDir)) return [];
  const results: string[] = [];
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    const full = path.join(absDir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkVaultDir(path.join(relativeDir, entry.name), extensions));
    } else if (extensions.some(ext => entry.name.endsWith(ext))) {
      results.push(path.join(relativeDir, entry.name));
    }
  }
  return results;
}

// ─── slug helpers ───────────────────────────────────────────────────────────

export function filePathToSlug(relativePath: string): string {
  return relativePath
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
    .replace(/\/readme$/, '');
}

export function slugToUrl(slug: string): string {
  return `/${slug}`;
}

// ─── section layout (mirrors docsify sidebar) ────────────────────────────────

export const SECTION_ORDER: Section[] = [
  { id: 'entities',     label: 'Entities',       entries: [] },
  { id: 'concepts',     label: 'Concepts',       entries: [] },
  { id: 'comparisons',  label: 'Comparisons',    entries: [] },
  { id: 'queries',      label: 'Queries',        entries: [] },
  { id: 'raw',          label: 'Raw Sources',    entries: [] },
  { id: 'open-source-game', label: 'Open Source Games', entries: [] },
];

// ─── load all vault pages ───────────────────────────────────────────────────

export function loadAllPages(): VaultEntry[] {
  const pages: VaultEntry[] = [];
  const sectionDirs: Array<{ rel: string; section: PageSection }> = [
    { rel: 'entities',         section: 'entities' },
    { rel: 'concepts',         section: 'concepts' },
    { rel: 'comparisons',      section: 'comparisons' },
    { rel: 'queries',          section: 'queries' },
    { rel: 'raw',              section: 'raw' },
    { rel: 'open-source-game', section: 'open-source-game' },
    // top-level markdown files
    { rel: 'index.md',         section: 'entities' },
    { rel: 'SCHEMA.md',         section: 'entities' },
    { rel: 'log.md',           section: 'entities' },
  ];

  for (const { rel, section } of sectionDirs) {
    const abs = path.join(VAULT_ROOT, rel);
    if (!fs.existsSync(abs)) continue;

    if (abs.endsWith('.md')) {
      // single file
      const raw = fs.readFileSync(abs, 'utf-8');
      const { data, content } = parseFrontmatter(raw);
      pages.push({
        slug: filePathToSlug(rel),
        section,
        title: data.title || path.basename(rel, '.md'),
        path: abs,
        raw: content.trim(),
        frontmatter: data,
      });
    } else {
      // directory
      for (const fileRel of walkVaultDir(rel)) {
        const raw = fs.readFileSync(path.join(VAULT_ROOT, fileRel), 'utf-8');
        const { data, content } = parseFrontmatter(raw);
        pages.push({
          slug: filePathToSlug(fileRel),
          section,
          title: data.title || path.basename(fileRel, '.md'),
          path: path.join(VAULT_ROOT, fileRel),
          raw: content.trim(),
          frontmatter: data,
        });
      }
    }
  }

  return pages;
}

// ─── build sidebar sections from loaded pages ─────────────────────────────

export function buildSidebar(pages: VaultEntry[]): Section[] {
  const sections = SECTION_ORDER.map(s => ({ ...s, entries: [] as VaultEntry[] }));
  const sectionMap = new Map(sections.map(s => [s.id, s]));

  for (const page of pages) {
    // skip root-level md files from being added as section entries
    if (!page.slug.includes('/') && ['index', 'SCHEMA', 'log'].includes(page.slug)) {
      // handled separately as top-level pages
      continue;
    }
    const sec = sectionMap.get(page.section);
    if (sec) sec.entries.push(page);
  }

  // open-source-game: add all sub-entries
  const osg = sectionMap.get('open-source-game');
  if (osg) {
    // flatten subdir entries into a flat list sorted by name
    osg.entries.sort((a, b) => a.title.localeCompare(b.title));
  }

  return sections;
}
