<!-- src/App.vue -->
<template>
  <div id="app">
   

    <!-- Main Content -->
    <main class="container mt-5">
      <!-- Render the component associated with the current route -->
      <router-view></router-view>
    </main>

    <!-- Footer (Optional) -->
    <footer class="app-footer bg-light text-center py-3">
      <div class="container">
        <p>&copy; 2024 Country Directory App</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Global styles for App.vue */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.app-header {
  /* Optional styles for header */
}
.app-footer {
  margin-top: auto;
}
</style>
