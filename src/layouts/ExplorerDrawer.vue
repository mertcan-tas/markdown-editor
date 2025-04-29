<template>
  <v-navigation-drawer v-model="localExplorerOpen" temporary="true" >
  
    <v-list-item
      lines="two"
      prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
      subtitle="Logged in"
      title="Jane Smith"
    ></v-list-item>
    
    <v-list density="compact" nav>
      
      <v-list-item class="py-2 px-3" button link>
        <v-list-item-title class="d-flex align-center no-select">
          <v-icon class="mr-2" size="20">
            <IconBold />
          </v-icon>
          Dashboard Test
        </v-list-item-title>
      </v-list-item>

      <v-list-item class="py-2 px-3" button link>
        <v-list-item-title class="d-flex align-center no-select">
          <v-icon class="mr-2" size="20">
            <IconBold />
          </v-icon>
          Dashboard Test 2
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
    ...mapState(useUIStore, ['isExplorerOpen']),
    localExplorerOpen: {
      get() {
        return this.isExplorerOpen
      },
      set(val) {
        this.setExplorer(val)
      },
    },
  },
  methods: {
    ...mapActions(useUIStore, ['setExplorer', 'toggleExplorer']),
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 600;
      if (!this.isMobile) {
        this.toggleExplorer();
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
