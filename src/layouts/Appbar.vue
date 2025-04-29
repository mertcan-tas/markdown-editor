<template>
  <v-app-bar app color="primary" elevation="0" height="45">

    
    <v-toolbar-items>
      <v-btn size="small" @click="toggleExplorer"><IconPath/></v-btn>
      <v-btn size="x-small"><IconPrevious/></v-btn>
      <v-btn size="x-small"><IconNext/></v-btn>
      <v-btn size="x-small" @click="makeBold"><IconBold/></v-btn>
      <v-btn size="x-small" @click="makeItalic"><IconItalic/></v-btn>
      <v-btn size="x-small" @click="makeHeading"><IconHeader/></v-btn>
      <v-btn size="x-small" @click="makeOverline" class="d-none d-lg-block"><IconOverline/></v-btn>
      <v-btn size="x-small" @click="makeDotList" class="d-none d-lg-block"><IconDotList/></v-btn>
      <v-btn size="x-small" @click="makeOrderedList" class="d-none d-lg-block"><IconNumList/></v-btn>
      <v-btn size="x-small" @click="makeCheckList" class="d-none d-lg-block"><IconCheckList/></v-btn>
      <v-btn size="x-small" @click="makeBlockquote" class="d-none d-lg-block"><IconBlockquote/></v-btn>
      <v-btn size="x-small" class="d-none d-lg-block"><IconTable/></v-btn>
      <v-btn size="x-small" class="d-none d-lg-block"><IconLink/></v-btn>
      <v-btn size="x-small" class="d-none d-lg-block"><IconImage/></v-btn>
    </v-toolbar-items>

    
    <v-spacer></v-spacer>
    
    <v-toolbar-items class="mr-3">
      <v-btn size="small" @click="toggleSettings"><IconSettings/></v-btn>
    </v-toolbar-items>
    
  </v-app-bar>
</template>




<script>
import { mapActions } from 'pinia'
import { useUIStore } from '@/plugins/stores/ui.js'

import { useMarkdownStore } from '@/plugins/stores/markdown.js'

export default {
  methods: {
    ...mapActions(useMarkdownStore, ['requestFormat']),
    ...mapActions(useUIStore, ['toggleExplorer', 'toggleSettings']),

    makeBold() {
      this.requestFormat('**', '**')
    },
    makeItalic() {
      this.requestFormat('*', '*')
    },
    makeHeading() {
      this.requestFormat('## ', '')
    },
    makeOverline() {
      this.requestFormat('~~', '~~')
    },
    makeDotList() {
      this.requestFormat('- ', '')
    },
    makeOrderedList() {
      this.requestFormat('1. ', '')
    },
    makeCheckList() {
      this.requestFormat('- [ ] ', '')
    },
    makeBlockquote() {
      this.requestFormat('> ', '')
    },

    makeLink() {
      this.requestFormat('[', '](url)')
    },
    makeCode() {
      this.requestFormat('`', '`')
    },


  },
};
</script>


