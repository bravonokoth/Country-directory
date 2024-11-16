<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th @click="sortBy('name.common')">
            Name
            <span v-if="sortKey === 'name.common'">
              <i :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'"></i>
            </span>
          </th>
          <th @click="sortBy('region')">
            Region
            <span v-if="sortKey === 'region'">
              <i :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'"></i>
            </span>
          </th>
          <th @click="sortBy('population')">
            Population
            <span v-if="sortKey === 'population'">
              <i :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'"></i>
            </span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in sortedCountries" :key="country.cca3">
          <td>{{ country.name?.common || 'N/A' }}</td>
          <td>{{ country.region || 'N/A' }}</td>
          <td>{{ country.population ? country.population.toLocaleString() : 'N/A' }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="$emit('view-details', country)">
              View Details
            </button>
          </td>
        </tr>
        <tr v-if="sortedCountries.length === 0">
          <td colspan="4" class="text-center">No countries available</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CountriesTable',
  props: {
    countries: {
      type: Array,
      required: true,
      default: () => [], // Default to an empty array if no prop is passed
    },
  },
  data() {
    return {
      sortKey: '',  // The field by which to sort
      sortOrder: 'asc',  // The sorting direction, defaults to ascending
    };
  },
  computed: {
    // This computed property sorts the countries based on the sort key and order
    sortedCountries() {
      if (!this.countries || this.countries.length === 0) {
        return []; // Return an empty array if no countries are available
      }
      if (!this.sortKey) return this.countries;  // No sorting if no sort key

      // Create a new array to avoid direct mutation of the prop
      return [...this.countries].sort((a, b) => {
        const aValue = this.getNestedValue(a, this.sortKey);
        const bValue = this.getNestedValue(b, this.sortKey);

        // Handle sorting for population, which should be treated as a number
        if (this.sortKey === 'population') {
          return (Number(aValue) || 0) - (Number(bValue) || 0);
        }

        // Handle comparison for other fields like name and region
        if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    },
  },
  methods: {
    // Toggle sorting order and change sort key when a column header is clicked
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc'; // Default to ascending if new column is clicked
      }
    },
    // Get the nested value for a given key (used for properties like `name.common`)
    getNestedValue(obj, path) {
      return path.split('.').reduce((o, p) => (o ? o[p] : null), obj);
    },
  },
};
</script>

<style scoped>
th {
  cursor: pointer;
}
th i {
  margin-left: 5px;
}
.text-center {
  text-align: center;
}
</style>
