<template>
  <v-navigation-drawer
    v-model="localExplorerOpen"
    temporary="true"
    location="right"
  >
    <v-list density="compact" nav>
      <v-list-item class="py-2 px-3 no-select" button link>
        <v-list-item-title class="d-flex align-center">
          <v-icon class="mr-2" size="20">
            <IconBold />
          </v-icon>
          Dashboard Test
        </v-list-item-title>
      </v-list-item>

      <v-list-item class="py-2 px-3 no-select" button link>
        <v-list-item-title class="d-flex align-center">
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
import { useUIStore } from "@/stores/ui.js";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.isMobile = window.innerWidth <= 600;
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  computed: {
    ...mapState(useUIStore, ["isExplorerOpen"]),
    localExplorerOpen: {
      get() {
        return this.isExplorerOpen;
      },
      set(val) {
        this.setExplorer(val);
      },
    },
  },
  methods: {
    ...mapActions(useUIStore, [
      "setExplorer",
      "toggleExplorer",
      "openExplorer",
      "closeExplorer",
    ]),
    checkScreenSize() {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 600;

      if (wasMobile !== this.isMobile) {
        this.closeExplorer();
      }
    },
  },
};
</script>
