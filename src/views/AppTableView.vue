<script setup lang="ts" generic="T extends {id: number}">
export interface AppTableViewColumnDefinition {
  name: string
  title?: string
  slot?: string
}

defineProps<{
  cols: AppTableViewColumnDefinition[]
  data: T[]
}>()

</script>

<template>
  <table>
    <thead>
      <tr class="header">
        <td v-for="col of cols" :key="col.name">
          {{ col.title }}
          <slot :name="`th-${col.slot}`"></slot>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row of data" :key="row.id">
        <slot name="row" :rowData="row"></slot>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  max-width: 872px;
  border-radius: 8px;
  border-collapse: collapse;
  background-color: var(--ui-white);
}

.header {
  width: 100%;
  background-color: var(--ui-header-bg);
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 107px;
}

td {
  padding: 10px;
  min-width: 70px;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--ui-gray);
}
</style>
