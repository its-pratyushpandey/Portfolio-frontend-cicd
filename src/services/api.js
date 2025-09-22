const API_BASE_URL = 'http://localhost:8080/api/portfolio';

class ApiService {
  async makeRequest(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Portfolio Data Endpoints
  async getServices() {
    return this.makeRequest('/services');
  }

  async getTechnologies() {
    return this.makeRequest('/technologies');
  }

  async getExperiences() {
    return this.makeRequest('/experiences');
  }

  async getProjects() {
    return this.makeRequest('/projects');
  }

  async getCertificates() {
    return this.makeRequest('/certificates');
  }

  // Contact Form
  async submitContactForm(formData) {
    return this.makeRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // Health Check
  async healthCheck() {
    return this.makeRequest('/health');
  }
}

export default new ApiService();