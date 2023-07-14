import { MarkdownPostProcessor, MarkdownPostProcessorContext, MarkdownPreviewRenderer, Plugin } from 'obsidian';

export default class AutoTypographyPlugin extends Plugin {

    static postprocessor: MarkdownPostProcessor = (el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
        const treeWalker = el.ownerDocument.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let currentNode;

        // Go through all text nodes in the rendered HTML
        while ((currentNode = treeWalker.nextNode())) {
            // Skip anything inside code blocks
            if (currentNode.parentElement?.closest("code") != null) {
                continue;
            }

            let t = currentNode.textContent!;

            // convert triple hyphens to em-dash
            t = t.replace(/---/g, "\u2014");

            // convert double hyphens to en-dash
            t = t.replace(/--/g, "\u2013");

            // convert triple periods to horizontal ellipsis
            t = t.replace(/\.\.\./g, "\u2026");

            // convert apostrophe in the middle of a word to right single quotation mark
            t = t.replace(/(?<=\w)'(?=\w)/gu, "\u2019");

            // convert double quote at the end of a word to right double quotation mark
            t = t.replace(/(?<=(\w|\p{P}))"/gu, "\u201d");

            // convert single quote at the end of a word to right single quotation mark
            t = t.replace(/(?<=(\w|\p{P}))'/gu, "\u2019");

            // convert double quote at the beginning of a word to left double quotation mark
            t = t.replace(/"(?=(\w|\p{P}))/gu, "\u201c");

            // convert single quote at the beginning of a word to left single quotation mark
            t = t.replace(/'(?=(\w|\p{P}))/gu, "\u2018");
            
            if (currentNode.textContent != t) {
                currentNode.textContent = t;
            }
        }
    }

    async onload() {
        MarkdownPreviewRenderer.registerPostProcessor(AutoTypographyPlugin.postprocessor);
    }

    async onunload() {
        MarkdownPreviewRenderer.unregisterPostProcessor(AutoTypographyPlugin.postprocessor);
    }

}
