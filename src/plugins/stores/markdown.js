import { defineStore } from 'pinia'

export const useMarkdownStore = defineStore('markdown', {
  state: () => ({
    formatRequest: null,
    markdownContent: '',
    fileName: 'untitled.md'
  }),
  
  actions: {
    
    requestFormat(before, after) {
      this.formatRequest = { before, after }
    },
    
    clearRequest() {
      this.formatRequest = null
    },
    
    // İçerik yönetimi metodları
    updateContent(content) {
      this.markdownContent = content
    },
    
    setFileName(name) {
      this.fileName = name
    },
    
    // Dosya işlemleri
    saveContent() {
      localStorage.setItem(`markdown_${this.fileName}`, this.markdownContent)
      return true
    },
    
    loadContent(fileName) {
      const content = localStorage.getItem(`markdown_${fileName || this.fileName}`)
      if (content) {
        this.markdownContent = content
        return true
      }
      return false
    }
  }
})