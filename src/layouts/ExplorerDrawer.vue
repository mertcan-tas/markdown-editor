<template>
  <v-navigation-drawer v-model="state.explorer_drawer" :temporary="isMobile">
    
    <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            subtitle="Logged in"
            title="Jane Smith"
          ></v-list-item>
        </template>
    
    
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
export default {
  inject: ['state'],
  data() {
    return {
      mainMenu: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
      ],
      isMobile: false, // Ekran boyutunu izlemek için değişken
    };
  },
  mounted() {
    this.isMobile = window.innerWidth <= 600; // Başlangıçta ekran boyutunu kontrol et
    window.addEventListener('resize', this.checkScreenSize); // Ekran boyutu değişimini izleyin
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize); // Component temizlenmeden önce event listener'ı kaldır
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 600;
      if (!this.isMobile) {
        this.state.explorer_drawer = false;
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
