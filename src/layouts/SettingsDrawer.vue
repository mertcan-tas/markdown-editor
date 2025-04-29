<template>
  <v-navigation-drawer v-model="localSettingsOpen" :temporary="isMobile" location="right" >
  
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            subtitle="Logged in"
            title="Jane Smith"
          ></v-list-item>
 
   <v-divider/>

    <v-list density="compact" nav>
     
     
      <v-list-item class="py-2 px-3" button link>
        <v-list-item-title class="d-flex align-center no-select">
          <v-icon class="mr-2" size="20">
            <IconBold />
          </v-icon>
          Dashboard Test
        </v-list-item-title>
      </v-list-item>

      <v-list-item class="py-2 px-3" button link @click="toggleVersionDialog">
        <v-list-item-title class="d-flex align-center no-select">
          <v-icon class="mr-2" size="20">
            <IconAbout />
          </v-icon>
          About Markdown Editor
        </v-list-item-title>
      </v-list-item>


      <v-divider/>


      <VersionNotification/>

      
      <v-list-item class="py-3 px-3 " button link>
        <v-list-item-title class="d-flex align-center no-select">
          <v-icon class="mr-2" size="20">
            <IconPrint />
          </v-icon>
          Print
        </v-list-item-title>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { useUIStore } from '@/plugins/stores/ui.js'
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.isMobile = window.innerWidth <= 600; 
    window.addEventListener('resize', this.checkScreenSize); 
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize); 
  },
  computed: {
    ...mapState(useUIStore, ['isSettingsOpen']),
    localSettingsOpen: {
      get() {
        return this.isSettingsOpen
      },
      set(val) {
        this.setSettings(val)
      },
    },
  },
  methods: {
    ...mapActions(useUIStore, ['setSettings', 'toggleSettings', 'toggleVersionDialog']),
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 600;
      if (!this.isMobile) {
        this.toggleSettings()
      }
    },
  },
};
</script>

<style scoped>
.no-select {
  user-select: none;
  cursor: hand;
}
</style>
