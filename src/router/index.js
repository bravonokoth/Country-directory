import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../views/HomeComponent.vue'; // Corrected path


// Debug the import path
console.log('Importing HomeComponent:', HomeComponent);

// Define your routes
const routes = [
  {
    path: '/',
    name: 'HomeComponent', // Main route for Home
    component: HomeComponent, // Component to render for this route
  },
];

// Debug the routes
console.log('Defined routes:', routes);

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // HTML5 History mode
  routes, // Pass the routes defined above
});

// Debug the router instance
console.log('Created router:', router);

// Export the router instance for use in the main.js file
export default router;
