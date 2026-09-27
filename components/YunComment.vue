<script lang="ts" setup>
import { useRuntimeConfig } from 'valaxy'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const runtimeConfig = useRuntimeConfig()
const { locale } = useI18n()
const supportCommentAddons = ['valaxy-addon-waline', 'valaxy-addon-twikoo', 'valaxy-addon-artalk']

const commentSystems = computed(() => {
  return supportCommentAddons
    .filter(addonName => runtimeConfig.value.addons[addonName])
    .map(addonName => addonName.split('-')[2])
})

const activeComment = ref(commentSystems.value[0])
const isEnglish = computed(() => locale.value.toLowerCase().startsWith('en'))

let originalAlert: typeof window.alert | undefined

// Waline 3.4.1 使用原生 alert 展示网络错误，这里只替换无法连接 Vercel 的提示。
const showCommentError: typeof window.alert = (message) => {
  const text = String(message)

  if (text === 'Failed to fetch') {
    originalAlert?.(isEnglish.value
      ? 'The comment service could not be reached. Vercel may be unavailable on your current network. Please switch to a network that can access Vercel and try again.'
      : '评论服务暂时无法连接。由于 Vercel 服务在部分网络环境下可达性不稳定，请科学上网后重试。')
    return
  }

  originalAlert?.(message)
}

onMounted(() => {
  originalAlert = window.alert
  window.alert = showCommentError
})

onBeforeUnmount(() => {
  if (window.alert === showCommentError && originalAlert)
    window.alert = originalAlert
})
</script>

<template>
  <YunCard w="full" p="4" class="comment yun-comment sm:p-6 lg:px-12 xl:px-16">
    <ClientOnly>
      <div v-if="commentSystems.length > 1" class="flex justify-end w-full mb-2">
        <YunSelect v-model="activeComment" :options="commentSystems" />
      </div>
      <YunWaline v-if="activeComment === 'waline'" />
      <YunTwikoo v-if="activeComment === 'twikoo'" />
      <YunArtalk v-if="activeComment === 'artalk'" />
      <slot />
    </ClientOnly>
  </YunCard>
</template>

<style lang="scss">
.comment {
  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h5 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h6 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  ul {
    list-style: disc;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }

  ol {
    list-style: decimal;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
