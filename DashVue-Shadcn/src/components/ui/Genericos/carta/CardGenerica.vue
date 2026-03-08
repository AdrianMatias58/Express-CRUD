<script setup lang="ts" generic="T extends Record<string, any>">
import {
  Card,
  CardContent,
  CardDescription, 
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

defineProps<{
  titulo?: string
  data: T[]
}>()
</script>

<template>
  <div>
    <Card v-for="(item, index) in data" :key="index" >
      <CardHeader>
        <CardTitle>
          <slot name="titulo" :item="item" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <slot name="descripcion" :item="item" />
        </CardDescription>
        <slot name="contenido" :item="item" />
      </CardContent>
    </Card>
  </div>
</template>