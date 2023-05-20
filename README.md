# Auto-Typography for Obsidian

This is a simple plugin for Obsidian that converts ASCII typography to the correct Unicode symbols for English writing, similar to the original [SmartyPants plugin](https://daringfireball.net/projects/smartypants/) by John Gruber.

Text is replaced in **reading mode only**. This plugin does not interfere during editing or in live-preview mode, and Markdown files are never modified.

## Rules

- Convert double hyphens `--` to en-dash `–`
- Convert triple hyphens `---` to em-dash `—`
- Convert triple periods `...` to horizonal ellipsis `…`
- Convert single apostrophe `'` in the middle of a word to a right single quotation mark `’`
- Convert single ASCII quotes `'` around words to left and right single quotation marks `‘` and `’`
- Convert double ASCII quotes `"` around words to left and right double quotation marks `“` and `”`

## Notes

This is my first Obsidian plugin; I made it for my personal use and it's intentionally simple. There is currently no configuration, and no support for other languages or different kinds of quotation marks. More features might be added in the future.

The plugin registers a `MarkdownPostProcessor` and affects text nodes in the DOM tree only; this should prevent it from interfering with other plugins or replacing CSS classes or HTML attributes by accident.
