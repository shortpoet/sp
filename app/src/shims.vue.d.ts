declare module '*.vue';
declare module '*.vue' {
  import type { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}

declare module 'jquery.easing' {
  const easing: any;
  export default easing;
}
