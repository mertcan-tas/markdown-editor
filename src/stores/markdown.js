import { defineStore } from "pinia";

export const useMarkdownStore = defineStore("markdown", {
  state: () => ({
    formatRequest: null,
    markdownContent: "",
  }),

  actions: {
    requestFormat(before, after) {
      this.formatRequest = { before, after };
    },

    clearRequest() {
      this.formatRequest = null;
    },

    updateContent(content) {
      this.markdownContent = content;
    },
  },
});
