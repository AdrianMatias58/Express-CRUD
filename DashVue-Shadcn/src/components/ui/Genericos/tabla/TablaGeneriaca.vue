<script setup lang="ts" generic="T extends Record<string, any>">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ColumnConfig } from "./Type";
defineProps<{
  columns: ColumnConfig<T>[],
  data: T[]
}>()
</script>

<template>
  <div class="w-full rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead v-for="col in columns" :key="String(col.key)">
            {{ col.header }}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="data.length">
          <TableRow v-for="(item, index) in data" :key="index">
            <TableCell v-for="col in columns" :key="String(col.key)">
              <slot :name="`cell-${String(col.key)}`" :row="item">
                {{ item[col.key] }}
              </slot>
            </TableCell>
          </TableRow>
        </template>
        <TableRow v-else>
          <TableCell :colspan="columns.length" class="h-24 text-center">
            No hay datos disponibles.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
