<template lang="pug">
AppScaffold(
  mainMaxWidth="auto"
)
  template(v-slot:default)
    venue
</template>

<script>
import AppScaffold from '@/components/AppScaffold.vue';
import venue from '@/views/venue/venue.vue';
export default {
  name: 'app',
  components: {
    AppScaffold,
    venue,
  },
  setup() {},
};
</script>

<style lang="scss" scoped></style>
