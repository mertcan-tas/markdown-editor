<template>
  <v-app>
    <Appbar />
    <ExplorerDrawer></ExplorerDrawer>
    <SettingsDrawer></SettingsDrawer>
    <v-main>
      <slot></slot>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      state: {
        explorer_drawer: false,
        settings_drawer: false,
      },
    };
  },
  provide() {
    return {
      state: this.state,
    };
  },
};
</script>
