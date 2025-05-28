<template>
  <v-app-bar app color="primary" elevation="0" height="45">
    <v-toolbar-items class="no-select">
      <v-btn size="x-small" @click="makeBold"><IconBold /></v-btn>
      <v-btn size="x-small" @click="makeItalic"><IconItalic /></v-btn>
      <v-btn size="x-small" @click="makeHeading"><IconHeader /></v-btn>
      <v-btn size="x-small" @click="makeOverline" class="d-none d-lg-block"
        ><IconOverline
      /></v-btn>
      <v-btn size="x-small" @click="makeDotList" class="d-none d-lg-block"
        ><IconDotList
      /></v-btn>
      <v-btn size="x-small" @click="makeOrderedList" class="d-none d-lg-block"
        ><IconNumList
      /></v-btn>
      <v-btn size="x-small" @click="makeCheckList" class="d-none d-lg-block"
        ><IconCheckList
      /></v-btn>
      <v-btn size="x-small" @click="makeBlockquote" class="d-none d-lg-block"
        ><IconBlockquote
      /></v-btn>
      <v-btn size="x-small" @click="makeTable" class="d-none d-lg-block"
        ><IconTable
      /></v-btn>
      <v-btn size="x-small" @click="makeLink" class="d-none d-lg-block"
        ><IconLink
      /></v-btn>
      <v-btn size="x-small" @click="makeImage" class="d-none d-lg-block"
        ><IconImage
      /></v-btn>
      <v-btn size="x-small" @click="makeCode" class="d-none d-lg-block"
        ><IconCode
      /></v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn size="small" @click="toggleExplorer"><IconSettings /></v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapActions } from "pinia";
import { useUIStore } from "@/stores/ui.js";

import { useMarkdownStore } from "@/stores/markdown.js";

export default {
  data() {
    return {
      markdownText: "",
      selection: {
        start: 0,
        end: 0,
      },
      debouncedUpdateContent: null,
      history: [""],
      historyIndex: 0,
    };
  },
  methods: {
    ...mapActions(useMarkdownStore, ["requestFormat"]),
    ...mapActions(useUIStore, ["toggleExplorer"]),

    makeBold() {
      this.requestFormat("**", "**");
    },
    makeItalic() {
      this.requestFormat("*", "*");
    },
    makeHeading() {
      this.requestFormat("## ", "");
    },
    makeOverline() {
      this.requestFormat("~~", "~~");
    },
    makeDotList() {
      this.requestFormat("\n- ", "");
    },
    makeOrderedList() {
      this.requestFormat("\n1. ", "");
    },
    makeCheckList() {
      this.requestFormat("\n- [ ] ", "");
    },
    makeBlockquote() {
      this.requestFormat("\n> ", "");
    },
    makeTable() {
      const tableTemplate = `\n| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |\n`;
      this.requestFormat(tableTemplate, "");
    },
    makeLink() {
      this.requestFormat("[", "](https://)");
    },
    makeImage() {
      this.requestFormat("![alt text](", ")");
    },
    makeCode() {
      this.requestFormat("```\n", "\n```");
    },
    undo() {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.markdownText = this.history[this.historyIndex];
        this.updateContent(this.markdownText);
      }
    },
  },
};
</script>
