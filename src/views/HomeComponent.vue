<template>
  <div class="container mt-4">
    <h1 class="mb-4">Countries Directory</h1>

    <!-- Search and Filter Components -->
    <div class="mb-4">
      <SearchBar @search="handleSearch" />
      <FilterBar :countries="filteredCountries" @filter="handleFilter" />
      <button class="btn btn-secondary mt-2" @click="clearFilters">Clear Filters</button>
    </div>

    <!-- Countries Table -->
    <CountriesTable :countries="paginatedCountries" @view-details="viewDetails" />

    <!-- Pagination Component -->
    <template v-if="pageCount > 1">
      <Paginate
        :page-count="pageCount"
        :page-range="3"
        :margin-pages="2"
        @page-change="handlePageClick"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination justify-content-center mt-4'"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-class="'page-item'"
        :prev-link-class="'page-link'"
        :next-class="'page-item'"
        :next-link-class="'page-link'"
        :active-class="'active'"
      />
    </template>
    <template v-else>
      <p>No pages to display</p>
    </template>

    <!-- Modal for Country Details -->
    <div
      class="modal fade"
      id="countryModal"
      tabindex="-1"
      aria-labelledby="countryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="countryModalLabel">Country Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <CountryDetails v-if="selectedCountry" :country="selectedCountry" />
            <p v-else>Loading...</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center mt-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import CountriesService from '@/services/CountriesService';
import CountriesTable from '@/components/CountriesTable.vue';
import SearchBar from '@/components/SearchBar.vue';
import FilterBar from '@/components/FilterBar.vue';
import CountryDetails from '@/components/CountryDetails.vue';
import Paginate from '@hennge/vue3-pagination';

import { Modal } from 'bootstrap'; // Import Bootstrap's Modal

export default {
  name: 'HomeComponent',
  components: {
    CountriesTable,
    SearchBar,
    FilterBar,
    CountryDetails,
    Paginate,
  },
  data() {
    return {
      countries: [],
      filteredCountries: [],
      searchQuery: '',
      filterCriteria: {
        region: '',
        subregion: '',
      },
      selectedCountry: null,
      currentPage: 1,
      perPage: 20,
      loading: false,
    };
  },
  created() {
    this.fetchCountries();
  },
  computed: {
    pageCount() {
      return Math.ceil(this.filteredCountries.length / this.perPage);
    },
    paginatedCountries() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredCountries.slice(start, end);
    },
  },
  methods: {
    async fetchCountries() {
      try {
        this.loading = true;
        const response = await CountriesService.getAllCountries();
        this.countries = response;
        this.applyFilters(); // Apply filters after data is fetched
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        this.loading = false;
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
      this.applyFilters();
    },
    handleFilter(criteria) {
      this.filterCriteria = criteria;
      this.applyFilters();
    },
    applyFilters() {
      let tempCountries = this.countries;

      // Apply search filter
      if (this.searchQuery) {
        const lowerQuery = this.searchQuery.toLowerCase();
        tempCountries = tempCountries.filter(country =>
          country.name.common.toLowerCase().includes(lowerQuery)
        );
      }

      // Apply region filter
      if (this.filterCriteria.region) {
        tempCountries = tempCountries.filter(country => country.region === this.filterCriteria.region);
      }

      // Apply subregion filter
      if (this.filterCriteria.subregion) {
        tempCountries = tempCountries.filter(country => country.subregion === this.filterCriteria.subregion);
      }

      this.filteredCountries = tempCountries;
      this.currentPage = 1;
    },
    handlePageClick(pageNumber) {
      this.currentPage = pageNumber;
    },
    viewDetails(country) {
      if (country) {
        this.selectedCountry = country;
        this.$nextTick(() => {
          const modalElement = document.getElementById('countryModal');
          if (modalElement) {
            const modal = new Modal(modalElement);
            modal.show();
          }
        });
      } else {
        console.error('Selected country is null or undefined');
      }
    },
    closeModal() {
      const modalElement = document.getElementById('countryModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.hide();
      }
      this.selectedCountry = null;
    },
    clearFilters() {
      this.searchQuery = '';
      this.filterCriteria = {
        region: '',
        subregion: '',
      };
      this.applyFilters();
    },
  },
};
</script>

<style scoped>
.pagination {
  margin-top: 20px;
}

.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.pagination .page-item .page-link {
  color: #007bff;
}

.pagination .page-item .page-link:hover {
  background-color: #e9ecef;
}
</style>
