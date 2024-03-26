<template>
  <transition
    :name="props.quick ? 'fade-up-quick' : 'fade-up'"
    appear
    mode="out-in"
  >
    <slot />
  </transition>
</template>
<script lang="ts" setup>
const props = defineProps({
  quick: {
    type: Boolean,
    default: false,
  },
});
</script>
<script lang="ts">
import FadeUp from "./FadeUp.vue"
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    FadeUp: typeof FadeUp;
  }
}
</script>

<style lang="scss">
.fade-up {
  &-enter-from {
    opacity: 0;
    transform: translateY(10%);
  }
  &-enter-active {
    transition: all 0.3s;
  }
  &-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  &-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  &-leave-active {
    transition: all 0.3s;
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(10%);
  }
}
.fade-up-quick {
  &-enter-from {
    opacity: 0;
    transform: translateY(10%);
  }
  &-enter-active {
    transition: all 0.1s;
  }
  &-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  &-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  &-leave-active {
    transition: all 0.1s;
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(10%);
  }
}
</style>
