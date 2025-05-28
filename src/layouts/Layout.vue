<template>
  <v-app>
    <Appbar />
    <SettingsDrawer></SettingsDrawer>
    <v-main>
      <slot></slot>
    </v-main>
    <Footer />
  </v-app>
</template>
