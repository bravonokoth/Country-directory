<template>
  <div>
    <h2>{{ country.name.common }}</h2>
    <img :src="country.flags.svg" :alt="`${country.name.common} flag`" width="200" />
    
    <ul class="list-group mt-3">
      <li class="list-group-item"><strong>Official Name:</strong> {{ country.name.official || 'N/A' }}</li>
      <li class="list-group-item"><strong>Capital:</strong> {{ country.capital ? country.capital.join(', ') : 'N/A' }}</li>
      <li class="list-group-item"><strong>Region:</strong> {{ country.region || 'N/A' }}</li>
      <li class="list-group-item"><strong>Subregion:</strong> {{ country.subregion || 'N/A' }}</li>
      <li class="list-group-item"><strong>Population:</strong> {{ country.population ? country.population.toLocaleString() : 'N/A' }}</li>
      <li class="list-group-item"><strong>Political System:</strong> {{ country.government || 'N/A' }}</li> <!-- Placeholder -->
      <li class="list-group-item"><strong>Military:</strong> {{ country.military || 'N/A' }}</li> <!-- Placeholder -->
      <li class="list-group-item"><strong>Timezones:</strong> {{ country.timezones ? country.timezones.join(', ') : 'N/A' }}</li>
    </ul>
    
    <!-- Embed a map of the country using Google Maps or OpenStreetMap -->
    <div v-if="mapUrl" class="mt-3">
      <iframe
        :src="mapUrl"
        width="600"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div v-else class="mt-3">
      <p>No map available for this country.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    country: {
      type: Object,
      required: true,
    },
  },
  computed: {
    mapUrl() {
      if (this.country.latlng && this.country.latlng.length === 2) {
        return `https://www.google.com/maps?q=${this.country.latlng[0]},${this.country.latlng[1]}&z=6&output=embed`;
      }
      return ''; // Return empty string if latlng is not available
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 10px;
}

iframe {
  max-width: 100%;
  border-radius: 5px;
}

.text-center {
  text-align: center;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
