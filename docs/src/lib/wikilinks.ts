/**
 * Remark plugin: convert [[Page]] or [[Page|Label]] to markdown links.
 * Resolves titles against the vault's page slug map for correct routing.
 */
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { getPageSlugMap } from './vault';

export function remarkWikilinks() {
  return function (tree: Root) {
    // Resolve slug map lazily (memoized inside getPageSlugMap)
    const slugMap = getPageSlugMap();

    visit(tree, 'text', (node: any, index, parent: any) => {
      if (!parent || index === undefined || index === null) return;
      const pattern = /\[\[([^\]|]+?)(?:\|([^\]]+))?\]\]/g;
      let lastIndex = 0;
      const parts: any[] = [];
      let match: RegExpExecArray | null;
      let changed = false;

      while ((match = pattern.exec(node.value)) !== null) {
        changed = true;
        if (match.index > lastIndex) {
          parts.push({ type: 'text', value: node.value.slice(lastIndex, match.index) });
        }
        const page = match[1].trim();
        const label = (match[2] || match[1]).trim();
        // Resolve via slug map, fallback to simple slug
        const key = page.toLowerCase();
        const linkSlug = slugMap[key] || key.replace(/\s+/g, '-');
        parts.push({
          type: 'link',
          url: `/${linkSlug}`,
          children: [{ type: 'text', value: label }],
        });
        lastIndex = match.index + match[0].length;
      }

      if (!changed) return;

      if (lastIndex < node.value.length) {
        parts.push({ type: 'text', value: node.value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });
  };
}
