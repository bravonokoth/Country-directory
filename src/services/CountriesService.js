// src/services/CountriesService.js
import axios from 'axios';

// Correct API base URL for fetching countries data
const API_BASE_URL = 'https://restcountries.com/v3.1/all'; 

const CountriesService = {
  // Fetch all countries
  getAllCountries() {
    return axios.get(API_BASE_URL)
      .then(response => {
        // Check and return the response data (ensure it's in the expected format)
        return response.data;
      })
      .catch(error => {
        // Log any errors and rethrow them for further handling
        console.error('Error fetching countries:', error);
        throw error;
      });
  },

  // Search countries by name
  searchCountries(name) {
    return axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error searching countries:', error);
        throw error;
      });
  },

  // Filter countries by region
  filterByRegion(region) {
    return axios.get(`https://restcountries.com/v3.1/region/${region}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error filtering countries by region:', error);
        throw error;
      });
  }
};

export default CountriesService;
