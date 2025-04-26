<template>
  <v-app-bar app color="primary" elevation="0" height="45">

    
    <v-toolbar-items>
      <v-btn size="small" @click="toggleDrawer"><IconPath/></v-btn>
      <v-btn size="x-small"><IconPrevious/></v-btn>
      <v-btn size="x-small"><IconNext/></v-btn>
      <v-btn size="x-small"><IconBold/></v-btn>
      <v-btn size="x-small"><IconItalic/></v-btn>
      <v-btn size="x-small"><IconHeader/></v-btn>
      <v-btn size="x-small"><IconOverline/></v-btn>
      <v-btn size="x-small"><IconDotList/></v-btn>
      <v-btn size="x-small"><IconNumList/></v-btn>
      <v-btn size="x-small"><IconCheckList/></v-btn>
      <v-btn size="x-small"><IconBlockquote/></v-btn>
    </v-toolbar-items>

    
    <v-spacer></v-spacer>

    
    <v-toolbar-items>
      <v-btn>Dashboard</v-btn>
      <v-btn>Resources</v-btn>
    </v-toolbar-items>
    
    <v-divider class="mx-2" vertical></v-divider>
    
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>




<script>
import { storeToRefs } from "pinia";



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
    toggleDrawer() {
      this.state.drawer = !this.state.drawer;
    },
  },
};
</script>


