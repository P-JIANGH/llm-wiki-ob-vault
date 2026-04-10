/**
 * Remark plugin: convert [[Page]] or [[Page|Label]] to markdown links.
 * Converts to relative Astro routes like [Label](./path) based on slug.
 */
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function remarkWikilinks() {
  return function (tree: Root) {
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
        // Convert page name to a slug-like path segment
        const slug = page.toLowerCase().replace(/\s+/g, '-');
        parts.push({
          type: 'link',
          url: `./${slug}`,
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
