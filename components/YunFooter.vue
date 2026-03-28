<script lang="ts" setup>
import { useSiteConfig, useValaxyConfig } from 'valaxy'
import { computed } from 'vue'

const siteConfig = useSiteConfig()
const config = useValaxyConfig()

const themeConfig = computed(() => config.value.themeConfig)

const footerYear = computed(() => themeConfig.value?.footer?.since || new Date().getFullYear())

const policeCode = computed(() => {
  const police = themeConfig.value?.footer?.beian?.police
  if (!police)
    return ''
  const match = police.match(/(\d+)/)
  return match ? match[1] : ''
})
</script>

<template>
  <footer
    flex="~ col"
    class="relative yun-footer va-footer px-4 py-4 pt-0 text-$va-c-text-light w-full mt-14"
    bg="white dark:$va-c-bg-soft"
    text="center sm"
  >
    <YunCloud v-if="themeConfig.footer?.cloud?.enable" class="absolute top--10 left-0 right-0" />

    <div v-if="themeConfig.footer?.beian?.enable && themeConfig.footer?.beian?.icp" class="beian" m="y-2">
      <a :href="themeConfig.footer?.beian?.icpLink || 'https://beian.miit.gov.cn/'" target="_blank" rel="noopener">
        {{ themeConfig.footer?.beian?.icp }}
      </a>

      <template v-if="themeConfig.footer?.beian?.police && policeCode">
        <span mx-2>|</span>
        <a
          :href="`https://beian.mps.gov.cn/#/query/webSearch?code=${policeCode}`"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center justify-center gap-1"
        >
          <img
            src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png"
            alt="备案图标"
            class="w-4 h-4 inline-block"
          >
          {{ themeConfig.footer?.beian?.police }}
        </a>
      </template>
    </div>

    <div class="copyright flex justify-center items-center gap-2" p="1">
      <span>&copy; {{ footerYear }} {{ siteConfig.author.name }}. Licensed under CC BY 4.0.</span>
    </div>

    <slot />

    <div class="yun-footer-gradient" />
  </footer>
</template>

<style lang="scss">
.yun-footer {
  letter-spacing: 0.05rem;
  line-height: 1.8;
}

.yun-footer-gradient {
  --gradient-from: 161 196 253;
  --gradient-to: 194 233 251;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 300px;
  z-index: 999;
  pointer-events: none;
  background: linear-gradient(to right, rgb(var(--gradient-from) / 0.2) 0, rgb(var(--gradient-to) / 0.2) 100%);
  mask-image: linear-gradient(#fff0, #000 70%);
  animation: fade-in 2s;

  html.dark & {
    --gradient-from: 0 0 0;
    --gradient-to: 0 0 0;
  }
}
</style>
