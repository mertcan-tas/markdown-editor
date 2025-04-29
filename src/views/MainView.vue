<template>
  <BaseLayout>
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
          ></textarea>
        </v-col>
        
        <v-divider vertical></v-divider>

        <v-col cols="12" md="6" class="d-none d-md-flex flex-column">
          <v-card flat class="pl-8 flex-grow-1 preview-container">
            <div 
              class="markdown-output"
              v-html="compiledMarkdown"
            ></div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </BaseLayout>
</template>
  
<script>
import { marked } from 'marked';
import { mapState, mapActions } from 'pinia';
import { useMarkdownStore } from '@/plugins/stores/markdown.js';

export default {
  data() {
    return {
      markdownText: '# Welcome to the Markdown Editor\n\nYou can write text here.\n\nYou can use **Bold**, *italic* or `code`.\n\n- List item 1\n- List item 2\n\n> You can quote',
      selection: {
        start: 0,
        end: 0
      }
    }
  },
  computed: {
    ...mapState(useMarkdownStore, ['formatRequest']),
    
    compiledMarkdown() {
      marked.setOptions({
        breaks: true,    
        gfm: true,        
        headerIds: true, 
        mangle: false     
      });
      
      return marked(this.markdownText);
    }
  },
  watch: {
    formatRequest(newVal) {
      if (newVal) {
        this.applyFormat(newVal.before, newVal.after);
        this.clearRequest(); // İsteği işledikten sonra temizle
      }
    },
    
    // Markdown içeriğini store ile senkronize et (isteğe bağlı)
    markdownText: {
      handler(newValue) {
        this.updateContent(newValue);
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(useMarkdownStore, ['clearRequest', 'updateContent']),
    
    onSelect(event) {
      // Seçimin başlangıç ve bitiş konumlarını kaydet
      this.selection.start = event.target.selectionStart;
      this.selection.end = event.target.selectionEnd;
    },
    
    applyFormat(before, after) {
      const textarea = this.$refs.markdownTextarea;
      
      // Eğer textarea yoksa veya odaklanmamışsa işlem yapma
      if (!textarea) return;
      
      // Mevcut değeri al
      const currentValue = this.markdownText;
      
      // Eğer bir seçim varsa (start !== end)
      if (this.selection.start !== this.selection.end) {
        // Seçilen metni al
        const selectedText = currentValue.substring(this.selection.start, this.selection.end);
        
        // Formatı uygula
        const newText = before + selectedText + after;
        
        // Metni güncelle
        this.markdownText = 
          currentValue.substring(0, this.selection.start) + 
          newText + 
          currentValue.substring(this.selection.end);
        
        // Textarea'yı güncellendikten sonra yeniden odakla ve seçimi ayarla
        this.$nextTick(() => {
          textarea.focus();
          textarea.setSelectionRange(
            this.selection.start + before.length, 
            this.selection.start + before.length + selectedText.length
          );
        });
      } else {
        // Seçim yoksa, imlecin konumuna formatı ekle
        const cursorPos = this.selection.start || 0;
        
        // Metni güncelle
        this.markdownText = 
          currentValue.substring(0, cursorPos) + 
          before + after + 
          currentValue.substring(cursorPos);
        
        // İmleci format işaretleri arasına yerleştir
        this.$nextTick(() => {
          textarea.focus();
          textarea.setSelectionRange(cursorPos + before.length, cursorPos + before.length);
        });
      }
    },

    updateCursor(event) {
    this.selection.start = event.target.selectionStart;
    this.selection.end = event.target.selectionEnd;
  },
  
  onSelect(event) {
    this.updateCursor(event);
  },

    
  },
  mounted() {
    const textarea = this.$refs.markdownTextarea;
    if (textarea) textarea.focus();
    
    const markdownStore = useMarkdownStore();
    if (markdownStore.markdownContent && markdownStore.markdownContent !== this.markdownText) {
      this.markdownText = markdownStore.markdownContent;
    }
  }
}
</script>

<style scoped>



</style>