export {};
declare global {
  const computed: typeof import('vue')['computed'];
  const isDark: typeof import('./composables/dark')['isDark'];
  const preferredDark: typeof import('./composables/dark')['preferredDark'];
  const toggleDark: typeof import('./composables/dark')['toggleDark'];
  const useHead: typeof import('@vueuse/head')['useHead'];
}
// for vue template auto import
import { UnwrapRef } from 'vue';
declare module 'vue' {
  interface ComponentCustomProperties {
    readonly computed: typeof import('vue')['computed'];
    readonly isDark: UnwrapRef<typeof import('./composables/dark')['isDark']>;
    readonly preferredDark: UnwrapRef<
      typeof import('./composables/dark')['preferredDark']
    >;
    readonly useHead: UnwrapRef<typeof import('@vueuse/head')['useHead']>;
  }
}
