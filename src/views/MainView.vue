<template>
    <BaseLayout>
      <v-container fluid class="pa-0 editor-container">
        <v-row no-gutters style="flex: 1; min-height: 0;">
          
          <!-- Sol taraf: Yazma alanı -->
          <v-col cols="12" md="6" class="pa-0 d-flex flex-column" style="min-height: 0;">
            <textarea
  
              v-model="markdownText"
              outlined dense
              solo
              hide-details
              class="markdown-editor flex-grow-1"
              style="min-height: 0; "
            ></textarea>
          </v-col>
  
          <!-- Sağ taraf: Önizleme alanı -->
          <v-col cols="12" md="6" class="pa-0 d-flex flex-column" style="border-left: 1px solid #eee; min-height: 0;">
            <v-card flat class="pa-4 flex-grow-1" style="overflow-y: auto; min-height: 0;">
              <div 
                v-html="compiledMarkdown"
                class="h-100"
              ></div>
              
              <VersionNotification></VersionNotification>

            </v-card>
          </v-col>
  
        </v-row>
      </v-container>
    </BaseLayout>
  </template>
  
  <script>
  import { marked } from 'marked';
  
  export default {
    data() {
      return {
        markdownText: '# Welcome to the Markdown Editor\n\nYou can write text here.\n\nYou can use **Bold**, *italic* or `code`.\n\n- List item 1\n- List item 2\n\n> You can quote'
      }
    },
    computed: {
      compiledMarkdown() {
        return marked(this.markdownText);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Main container setup */
  .editor-container {
    display: flex;
    flex-direction: column;
    height: 93vh; 
    
  }
  
  /* Force textarea to fill its container */
  .markdown-editor {
    display: flex;
    flex-direction: column;
    border: none;
  }
  
  textarea {
  background-color: #1F1F1F;
  border: none;
  border-right: 0px solid #ccc;
  color: #D6BB9F;
  outline: none;
  padding: 20px;
  resize: none;

}

  </style>