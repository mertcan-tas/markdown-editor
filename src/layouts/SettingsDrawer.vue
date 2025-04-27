<template>
  <v-navigation-drawer v-model="state.settings_drawer" :temporary="isMobile" location="right" permanent>
  
    <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            subtitle="Logged in"
            title="Jane Smith"
          ></v-list-item>
        </template>
  
        <v-divider></v-divider>

    <v-list density="compact" nav>
     
     
      <v-list-item class="py-2 px-3" button link>
        <v-list-item-title class="d-flex align-center no-select">
          <v-icon class="mr-2" size="20">
            <IconBold />
          </v-icon>
          Dashboard Test
        </v-list-item-title>
      </v-list-item>

      <v-list-item class="py-2 px-3" button link @click="showVersionDialog">
        <v-list-item-title class="d-flex align-center no-select">
          <v-icon class="mr-2" size="20">
            <IconAbout />
          </v-icon>
          About Markdown Editor
        </v-list-item-title>
      </v-list-item>


      <v-divider></v-divider>

      
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
export default {
  inject: ['state'],
  data() {
    return {
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
      // Eğer mobile'den desktop'a geçiş yaparsa, drawer'ı kapat
      if (!this.isMobile) {
        this.state.settings_drawer = false;
      }
    },
    showVersionDialog(){
      this.state.version_dialog = true;
    }
  },
};
</script>

<style scoped>
.no-select {
  user-select: none;
  cursor: hand;
}
</style>
