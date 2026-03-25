<script setup lang="ts">
import { useFrontmatter, useFullUrl, useSiteConfig } from 'valaxy'

const siteConfig = useSiteConfig()
const frontmatter = useFrontmatter()
const url = useFullUrl()
</script>

<template>
  <ValaxyCopyright
    v-if="frontmatter.copyright || (frontmatter.copyright !== false && siteConfig.license.enabled)"
    :url="url"
    m="y-4"
  />
</template>
