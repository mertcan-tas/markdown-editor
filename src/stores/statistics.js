import { defineStore } from "pinia";

export const useStatisticsStore = defineStore("statistics", {
  state: () => ({
    markdownStats: {
      bytes: 0,
      words: 0,
      lines: 0,
      cursor: {
        line: 1,
        column: 0,
      },
    },
    htmlStats: {
      characters: 0,
      words: 0,
      paragraphs: 0,
    },
  }),

  actions: {
    updateMarkdownStats(content) {
      if (!content) {
        this.markdownStats = {
          bytes: 0,
          words: 0,
          lines: 0,
          cursor: { line: 1, column: 0 },
        };
        return;
      }

      // Calculate bytes
      const bytes = new TextEncoder().encode(content).length;

      const words = content
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

      const lines = content.split("\n").length;

      this.markdownStats = {
        bytes,
        words,
        lines,
        cursor: this.markdownStats.cursor,
      };
    },

    updateHtmlStats(htmlContent) {
      if (!htmlContent) {
        this.htmlStats = {
          characters: 0,
          words: 0,
          paragraphs: 0,
        };
        return;
      }

      const characters = htmlContent.length;

      const textContent = htmlContent.replace(/<[^>]*>/g, " ");
      const words = textContent
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

      const paragraphs = (htmlContent.match(/<p[^>]*>.*?<\/p>/gs) || []).length;

      this.htmlStats = {
        characters,
        words,
        paragraphs,
      };
    },

    updateCursor(line, column) {
      this.markdownStats.cursor = {
        line,
        column,
      };
    },
  },
});
