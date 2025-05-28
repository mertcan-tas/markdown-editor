import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    isExplorerOpen: false,
    isSettingsOpen: false,
    isVersionDialogOpen: false,
  }),
  actions: {
    toggleExplorer() {
      if (!this.isExplorerOpen) {
        this.closeSettings() 
      }
      this.isExplorerOpen = !this.isExplorerOpen
    },
    openExplorer() {
      this.isExplorerOpen = true
    },
    closeExplorer() {
      this.isExplorerOpen = false
    },

    toggleSettings() {
      if (!this.isSettingsOpen) {
        this.closeExplorer()
      }
      this.isSettingsOpen = !this.isSettingsOpen
    },
    openSettings() {
      this.isSettingsOpen = true
    },
    closeSettings() {
      this.isSettingsOpen = false
    },
    
    setVersionDialogOpen(isOpen) {
      this.isVersionDialogOpen = isOpen
    },

    toggleVersionDialog() {
      this.isVersionDialogOpen = !this.isVersionDialogOpen
    }

  },
})
