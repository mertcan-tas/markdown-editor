<template>
  <v-footer app height="30">
    <div class="text-caption text-disabled d-none d-lg-block">
      <span class="stat-panel__block-name">Markdown</span>
      <span><span class="text-decoration-none on-surface">{{ markdownStats.bytes }}</span> bytes</span>
      <span><span class="text-decoration-none on-surface">{{ markdownStats.words }}</span> words</span>
      <span><span class="text-decoration-none on-surface">{{ markdownStats.lines }}</span> lines</span>
      <span class="text-decoration-none on-surface">Ln {{ markdownStats.cursor.line }}, Col {{ markdownStats.cursor.column }}</span>
    </div>
    <v-spacer></v-spacer>
    <div class="text-caption text-disabled d-none d-lg-block">
      <span class="stat-panel__block-name">HTML</span>
      <span><span class="text-decoration-none on-surface">{{ htmlStats.characters }}</span> characters</span>
      <span><span class="text-decoration-none on-surface">{{ htmlStats.words }}</span> words</span>
      <span><span class="text-decoration-none on-surface">{{ htmlStats.paragraphs }}</span> paragraphs</span>
    </div>
  </v-footer>
</template>

<script>
import { useStatisticsStore } from '@/stores/statistics'

export default {
  data() {
    return {
      statisticsStore: useStatisticsStore()
    }
  },
  computed: {
    markdownStats() {
      return this.statisticsStore.markdownStats
    },
    htmlStats() {
      return this.statisticsStore.htmlStats
    }
  }
}
</script>

<style scoped>
span {
  margin-right: 16px;
}
</style>