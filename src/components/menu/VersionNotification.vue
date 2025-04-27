<template>
  <v-dialog v-model="state.version_dialog" max-width="350">
    <v-card class="rounded-xl d-flex justify-center align-center">
      
      <MainLogo class="mt-8"/>

      <v-card-text class="text-h5	pa-3 ma-0">Markdown Editor</v-card-text>

      <v-card-text class="text-center mb-8 pa-0 ma-0 text-caption	">
        <div>Version: 1.99.3 (Universal)</div>
        <div>Commit: 17baf841</div>
        <div>Date: 2025-04-15T23:18:46.076Z (1 wk ago)</div>
        <div>Electron: 34.3.2</div>
        <div>ElectronBuildId: 11161073</div>
        <div>Chromium: 132.0.6834.210</div>
        <div>Node.js: 20.18.3</div>
        <div>V8: 13.2.152.41-electron.0</div>
        <div>OS: Darwin arm64 24.3.0</div>
      </v-card-text>


    </v-card>
  </v-dialog>
</template>

<script>
export default {
  inject: ['state'],
  methods: {
    closeDialog() {
      this.state.version_dialog = false;
    }
  }
};
</script>
