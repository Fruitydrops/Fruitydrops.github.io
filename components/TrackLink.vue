<script setup lang="ts">
defineProps<{
  href: string
}>()
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noreferrer"
    data-umami-event="shared-link-click"
    :data-umami-event-url="href"
  ><slot>{{ href }}</slot></a>
</template>
