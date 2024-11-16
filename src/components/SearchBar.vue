<!-- src/components/SearchBar.vue -->
<template>
  <div>
    <input type="text" @input="updateSearch" placeholder="Search countries..." class="form-control" />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    updateSearch(event) {
      this.$emit('search', event.target.value);
    },
  },
};
</script>

<style scoped>
/* Add styles here if needed */
</style>
