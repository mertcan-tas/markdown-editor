<template>
  <Layout>
    <v-container fluid class="pa-0 editor-container">
      <v-row no-gutters>
        <v-col cols="12" md="6" class="pa-0 d-flex flex-column">
          <textarea
            ref="markdownTextarea"
            v-model="markdownText"
            outlined
            dense
            solo
            hide-details
            class="flex-grow-1 markdown-input"
            placeholder="Enter markdown text here..."
            @select="onSelect"
            @click="updateCursor"
            @keyup="updateCursor"
            @input="handleInput"
          ></textarea>
        </v-col>

        <v-col cols="12" md="6" class="flex-column d-none d-lg-block d-md-block d-sm-none	">
          <div class="markdown-output d-none d-lg-block d-md-block d-sm-none" v-html="compiledMarkdown"></div>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<script>
import { marked } from "marked";
import { mapState, mapActions } from "pinia";
import { useMarkdownStore } from "@/stores/markdown.js";
import { useStatisticsStore } from "@/stores/statistics.js";
import debounce from "lodash/debounce";

export default {
  name: "MainView",

  data() {
    return {
      markdownText: "",
      selection: {
        start: 0,
        end: 0,
      },
      debouncedUpdateContent: null,
    };
  },

  computed: {
    ...mapState(useMarkdownStore, ["formatRequest", "markdownContent"]),

    compiledMarkdown() {
      try {
        if (!this.markdownText) {
          this.updateHtmlStats("");
          return "";
        }

        marked.setOptions({
          breaks: true,
          gfm: true,
          headerIds: true,
          mangle: false,
          sanitize: false,
          smartLists: true,
          smartypants: true,
          tables: true,
          tasklists: true,
          xhtml: false,
        });

        const html = marked.parse(this.markdownText);
        this.updateHtmlStats(html);
        return html;
      } catch (error) {
        this.updateHtmlStats("");
        return this.markdownText;
      }
    },
  },

  watch: {
    formatRequest: {
      handler(newVal) {
        if (newVal) {
          this.applyFormat(newVal.before, newVal.after);
          this.clearRequest();
        }
      },
      immediate: true,
    },

    markdownContent: {
      handler(newValue) {
        if (newValue !== this.markdownText) {
          this.markdownText = newValue;
        }
      },
      immediate: true,
    },
  },

  created() {
    this.debouncedUpdateContent = debounce((value) => {
      this.updateContent(value);
      this.updateMarkdownStats(value);
    }, 300);
  },

  methods: {
    ...mapActions(useMarkdownStore, ["clearRequest", "updateContent"]),
    ...mapActions(useStatisticsStore, [
      "updateMarkdownStats",
      "updateHtmlStats",
      "updateCursor",
    ]),

    handleInput(event) {
      if (event && event.target) {
        this.debouncedUpdateContent(event.target.value);
        this.updateCursorPosition(event.target);
      }
    },

    updateCursorPosition(textarea) {
      const text = textarea.value;
      const cursorPos = textarea.selectionStart;

      const textBeforeCursor = text.substring(0, cursorPos);
      const lines = textBeforeCursor.split("\n");
      const line = lines.length;
      const column = lines[lines.length - 1].length;

      this.updateCursor(line, column);
    },

    onSelect(event) {
      this.updateCursor(event);
    },

    applyFormat(before, after) {
      const textarea = this.$refs.markdownTextarea;
      if (!textarea) return;

      try {
        const currentValue = this.markdownText;
        const cursorPos = this.selection.start;

        if (this.selection.start !== this.selection.end) {
          const selectedText = currentValue.substring(
            this.selection.start,
            this.selection.end
          );

          const newText = before + selectedText + after;
          this.markdownText =
            currentValue.substring(0, this.selection.start) +
            newText +
            currentValue.substring(this.selection.end);

          this.$nextTick(() => {
            textarea.focus();
            textarea.setSelectionRange(
              this.selection.start + before.length,
              this.selection.start + before.length + selectedText.length
            );
          });
        } else {
          this.markdownText =
            currentValue.substring(0, cursorPos) +
            before +
            after +
            currentValue.substring(cursorPos);

          this.$nextTick(() => {
            textarea.focus();
            textarea.setSelectionRange(
              cursorPos + before.length,
              cursorPos + before.length
            );
          });
        }
      } catch (error) {
        console.error("Error applying format:", error);
      }
    },

    updateCursor(event) {
      if (event && event.target) {
        this.selection.start = event.target.selectionStart;
        this.selection.end = event.target.selectionEnd;
      }
    },
  },

  mounted() {
    const textarea = this.$refs.markdownTextarea;
    if (textarea) {
      textarea.focus();
      this.updateCursorPosition(textarea);
    }

    if (this.markdownContent) {
      this.markdownText = this.markdownContent;
      this.updateMarkdownStats(this.markdownContent);
    }
  },

  beforeDestroy() {
    if (this.debouncedUpdateContent && this.debouncedUpdateContent.cancel) {
      this.debouncedUpdateContent.cancel();
    }
  },
};
</script>
