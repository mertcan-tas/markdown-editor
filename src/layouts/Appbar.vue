<template>
  <v-app-bar app color="primary" elevation="0" height="45">

    
    <v-toolbar-items>
      <v-btn size="small" @click="toggleExplorerDrawer"><IconPath/></v-btn>
      <v-btn size="x-small"><IconPrevious/></v-btn>
      <v-btn size="x-small"><IconNext/></v-btn>
      <v-btn size="x-small "><IconBold/></v-btn>
      <v-btn size="x-small"><IconItalic/></v-btn>
      <v-btn size="x-small "><IconHeader/></v-btn>
      <v-btn size="x-small" class="d-none d-lg-block"><IconOverline/></v-btn>
      <v-btn size="x-small" class="d-none d-lg-block"><IconDotList/></v-btn>
      <v-btn size="x-small" class="d-none d-lg-block"><IconNumList/></v-btn>
      <v-btn size="x-small" class="d-none d-lg-block"><IconCheckList/></v-btn>
      <v-btn size="x-small" class="d-none d-lg-block"><IconBlockquote/></v-btn>
    </v-toolbar-items>

    
    <v-spacer></v-spacer>
    
    <v-toolbar-items class="mr-3">
      <v-btn size="small" @click="toggleSettingsDrawer"><IconSettings/></v-btn>
    </v-toolbar-items>
    
  </v-app-bar>
</template>




<script>

export default {
  inject: ["state"],
  data() {
    return {
      userData: {
        name: "Mertcan",
        surname: "Taş",
      },
    };
  },
  methods: {
    toggleExplorerDrawer() {
      this.state.explorer_drawer = !this.state.explorer_drawer;
    },
    toggleSettingsDrawer() {
      this.state.settings_drawer = !this.state.settings_drawer;
    },
  },
};
</script>


