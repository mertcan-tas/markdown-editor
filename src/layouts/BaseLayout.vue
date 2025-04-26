<template>
  <v-app>
    <Appbar />
    <NavigationDrawer></NavigationDrawer>
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
      state: { drawer: false },
    };
  },
  provide() {
    return {
      state: this.state,
    };
  },
};
</script>
