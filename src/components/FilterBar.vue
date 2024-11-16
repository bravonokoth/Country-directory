<!-- src/components/FilterBar.vue -->
<template>
  <div class="mb-3">
    <select @change="updateFilter" class="form-select">
      <option value="">All Regions</option>
      <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },
  computed: {
    regions() {
      const regions = this.countries.map(country => country.region).filter(region => region);
      return [...new Set(regions)];
    },
  },
  methods: {
    updateFilter(event) {
      this.$emit('filter', { region: event.target.value });
    },
  },
};
</script>

<style scoped>
/* Add styles here if needed */
</style>
