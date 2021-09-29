<template lang="pug">
main.venue
  stage.stage
  control.control
</template>

<script>
import stage from './stage.vue';
import control from './control.vue';
export default {
  name: 'venue',
  components: {
    stage,
    control,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.venue {
  height: 100vh;
  display: flex;
  flex-flow: row;
  overflow: hidden;
  // background-color: var(--bg-color);
  background-color: #00b140;

  @media (orientation: Portrait) {
    flex-flow: column;
  }
}

// .stage {

// }
// .control {
//   --ctrl-bg-color: var(--bg-color);
//   --minHeight: 16rem;
//   --maxHeight: 24rem;
//   --minWidth: 16rem;
//   --maxWidth: 32rem;
// }
</style>
