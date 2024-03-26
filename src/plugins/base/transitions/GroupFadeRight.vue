<template>
  <TransitionGroup
    name="faderight-group"
    class="faderight-group-container"
    :style="style"
  >
    <slot />
  </TransitionGroup>
</template>

<script lang="ts" setup>
defineProps({
  style: {
    type: Object,
    default: () => ({
      overflow: "visible",
    }),
  },
});
</script>
<script lang="ts">
import GroupFadeRight from "./GroupFadeRight.vue"
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    GroupFadeRight: typeof GroupFadeRight;
  }
}
</script>

<style lang="scss">
/* 
not scoped because slotted components are rendered 
outside of this transition component
which this transition component may have no control or effect
*/

.faderight-group-move, /* apply transition to moving elements */
.faderight-group-enter-active,
.faderight-group-leave-active {
  transition: all 0.5s ease;
}

.faderight-group-enter-from,
.faderight-group-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.faderight-group-leave-active {
  position: absolute;
}
</style>
