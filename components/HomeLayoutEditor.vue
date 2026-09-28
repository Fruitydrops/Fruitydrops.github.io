<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type LayoutKey = 'avatar' | 'author' | 'title' | 'subtitle' | 'description' | 'social' | 'navigation'
type Offset = { x: number; y: number }
type LayoutOffsets = Record<LayoutKey, Offset>

const labels: Record<LayoutKey, string> = {
  avatar: '头像',
  author: '名字',
  title: '站点标题',
  subtitle: '副标题',
  description: '简介',
  social: '社交图标',
  navigation: '导航',
}

const selectors: Record<LayoutKey, string> = {
  avatar: '.yun-square-container .yun-square',
  author: '.yun-square-container .site-author-name',
  title: '.yun-square-container .prologue-introduction .site-name',
  subtitle: '.yun-square-container .prologue-introduction .site-subtitle',
  description: '.yun-square-container .prologue-introduction .site-description',
  social: '.yun-square-container .links-of-author',
  navigation: '.yun-square-container .prologue-navigation',
}

const keys = Object.keys(labels) as LayoutKey[]
const enabled = ref(false)
const ready = ref(false)
const isDesktop = ref(false)
const copied = ref(false)
const offsets = ref<LayoutOffsets>(emptyOffsets())
const isDark = ref(false)
let observer: MutationObserver | undefined
let activeDrag: { key: LayoutKey; startX: number; startY: number; origin: Offset } | undefined
let detachHandlers: Array<() => void> = []

const modeName = computed(() => isDark.value ? '深色' : '浅色')

function emptyOffsets(): LayoutOffsets {
  return Object.fromEntries(keys.map(key => [key, { x: 0, y: 0 }])) as LayoutOffsets
}

function storageKey() {
  return `valaxy-home-layout:${isDark.value ? 'dark' : 'light'}`
}

function updateTheme() {
  isDark.value = document.documentElement.classList.contains('dark')
  isDesktop.value = window.innerWidth >= 960
}

function loadOffsets() {
  const empty = emptyOffsets()
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey()) || '{}') as Partial<LayoutOffsets>
    for (const key of keys) {
      const point = saved[key]
      if (point && Number.isFinite(point.x) && Number.isFinite(point.y))
        empty[key] = { x: point.x, y: point.y }
    }
  }
  catch {
    // Ignore invalid local editor state and start with a clean layout.
  }
  offsets.value = empty
  applyOffsets()
}

function applyOffsets() {
  if (typeof window === 'undefined')
    return
  for (const key of keys) {
    const element = document.querySelector<HTMLElement>(selectors[key])
    if (!element)
      continue
    const { x, y } = offsets.value[key]
    element.style.translate = isDesktop.value && (x || y) ? `${x}px ${y}px` : ''
    element.classList.toggle('home-layout-draggable', enabled.value && isDesktop.value)
  }
}

function saveOffsets() {
  localStorage.setItem(storageKey(), JSON.stringify(offsets.value))
}

function detach() {
  detachHandlers.forEach(remove => remove())
  detachHandlers = []
}

function attach() {
  detach()
  if (!enabled.value)
    return

  for (const key of keys) {
    const element = document.querySelector<HTMLElement>(selectors[key])
    if (!element)
      continue

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0)
        return
      event.preventDefault()
      activeDrag = {
        key,
        startX: event.clientX,
        startY: event.clientY,
        origin: { ...offsets.value[key] },
      }
      element.classList.add('home-layout-dragging')
      element.setPointerCapture(event.pointerId)
    }

    const onMove = (event: PointerEvent) => {
      if (!activeDrag || activeDrag.key !== key)
        return
      offsets.value[key] = {
        x: Math.round(activeDrag.origin.x + event.clientX - activeDrag.startX),
        y: Math.round(activeDrag.origin.y + event.clientY - activeDrag.startY),
      }
      applyOffsets()
    }

    const onUp = () => {
      if (activeDrag?.key !== key)
        return
      activeDrag = undefined
      element.classList.remove('home-layout-dragging')
      saveOffsets()
    }

    element.addEventListener('pointerdown', onDown)
    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerup', onUp)
    element.addEventListener('pointercancel', onUp)
    detachHandlers.push(() => {
      element.removeEventListener('pointerdown', onDown)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerup', onUp)
      element.removeEventListener('pointercancel', onUp)
    })
  }
}

function toggleEditor() {
  if (!isDesktop.value)
    return
  enabled.value = !enabled.value
  applyOffsets()
  attach()
}

function resetLayout() {
  offsets.value = emptyOffsets()
  localStorage.removeItem(storageKey())
  applyOffsets()
  attach()
}

async function copyCss() {
  const rules = keys
    .filter(key => offsets.value[key].x || offsets.value[key].y)
    .map((key) => {
      const { x, y } = offsets.value[key]
      const themeSelector = isDark.value ? ':root.dark' : ':root:not(.dark)'
      return `  ${themeSelector} ${selectors[key]} {\n    translate: ${x}px ${y}px !important;\n  }`
    })
  const css = `/* ${modeName.value}首页布局，由本地拖拽编辑器生成 */\n@media (min-width: 960px) {\n${rules.join('\n\n') || '  /* 当前元素均未移动 */'}\n}\n`
  await navigator.clipboard.writeText(css)
  copied.value = true
  window.setTimeout(() => copied.value = false, 1800)
}

watch(enabled, () => {
  applyOffsets()
  attach()
})

onMounted(() => {
  ready.value = true
  updateTheme()
  loadOffsets()
  observer = new MutationObserver(() => {
    const wasDark = isDark.value
    updateTheme()
    if (wasDark !== isDark.value)
      loadOffsets()
    else
      applyOffsets()
    attach()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  observer.observe(document.body, { childList: true, subtree: true })
  window.addEventListener('resize', updateViewport)
})

function updateViewport() {
  const wasDesktop = isDesktop.value
  isDesktop.value = window.innerWidth >= 960
  if (wasDesktop !== isDesktop.value) {
    if (!isDesktop.value)
      enabled.value = false
    applyOffsets()
    attach()
  }
}

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('resize', updateViewport)
  detach()
  for (const key of keys) {
    document.querySelector<HTMLElement>(selectors[key])?.classList.remove('home-layout-draggable', 'home-layout-dragging')
  }
})
</script>

<template>
  <aside v-if="ready" class="home-layout-editor" aria-label="首页布局编辑器">
    <div class="home-layout-editor__bar">
      <strong>本地布局编辑 · {{ modeName }}</strong>
      <button type="button" :disabled="!isDesktop" @click="toggleEditor">
        {{ enabled ? '完成拖动' : '开始拖动' }}
      </button>
      <button type="button" @click="copyCss">
        {{ copied ? '已复制 CSS' : '复制布局 CSS' }}
      </button>
      <button type="button" @click="resetLayout">重置本色布局</button>
    </div>
    <p>{{ !isDesktop ? '请将浏览器窗口加宽到 960 像素以上后拖动；手机布局保持自动。' : enabled ? '拖动首页元素调整位置；预览保存在此浏览器。' : '本地开发工具。浅色与深色布局分别保存，复制 CSS 后可写入样式表。' }}</p>
  </aside>
</template>

<style>
.home-layout-editor {
  position: fixed;
  z-index: 10000;
  right: 16px;
  bottom: 16px;
  width: min(460px, calc(100vw - 32px));
  padding: 12px 14px;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 12px;
  background: rgb(24 24 29 / 94%);
  color: #fff;
  font: 13px/1.5 system-ui, sans-serif;
  box-shadow: 0 8px 28px rgb(0 0 0 / 28%);
  backdrop-filter: blur(12px);
}

.home-layout-editor__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.home-layout-editor__bar strong {
  flex: 1 1 100%;
}

.home-layout-editor button {
  padding: 5px 9px;
  border: 1px solid rgb(255 255 255 / 26%);
  border-radius: 7px;
  background: rgb(255 255 255 / 10%);
  color: inherit;
  cursor: pointer;
}

.home-layout-editor button:hover {
  background: rgb(255 255 255 / 20%);
}

.home-layout-editor p {
  margin: 8px 0 0;
  opacity: 0.78;
}

.home-layout-draggable {
  cursor: move !important;
  outline: 1px dashed rgb(90 190 255 / 85%);
  outline-offset: 4px;
  touch-action: none;
}

.home-layout-dragging {
  z-index: 10001 !important;
  outline: 2px solid rgb(90 190 255 / 95%);
}
</style>
