# ☁️ Real-time Weather Dashboard

A sleek, responsive weather application that provides live weather updates and forecasts by integrating the **OpenWeatherMap API**.

👉 **[Live Demo](https://tlamt.github.io/weather/)**

---

## 🚀 Engineering Highlights

*   **RESTful API Integration**: Implemented data fetching from OpenWeatherMap to retrieve real-time temperature, humidity, and wind speed.
*   **Dynamic Backgrounds**: Developed logic to change UI themes and background images dynamically based on the current weather condition (e.g., Sunny, Rainy, Cloudy).
*   **Asynchronous Data Handling**: Used **Fetch API** with error handling to manage network requests and invalid city queries.
*   **Responsive UI**: Optimized for all screen sizes using CSS Media Queries and Flexbox.

## 🛠️ Tech Stack

*   **Core**: JavaScript (ES6+), HTML5, CSS3
*   **API**: OpenWeatherMap API
*   **Icons**: FontAwesome / Weather Icons
*   **Deployment**: GitHub Pages

## 🧠 Key Challenges & Solutions

### 1. Handling API Errors
**Challenge**: Users entering non-existent cities would break the app.
**Solution**: Implemented a validation layer that catches 404 errors and provides user-friendly feedback instead of crashing the UI.

### 2. Unit Conversion
**Challenge**: API returns data in Kelvin by default.
**Solution**: Created utility functions to toggle between Metric (Celsius) and Imperial (Fahrenheit) units seamlessly.

## 📅 Roadmap

- [ ] **Geolocation**: Auto-detect user's location to provide local weather on load.
- [ ] **7-Day Forecast**: Expand the UI to display extended weekly data.
- [ ] **Search History**: Save recently searched cities using **LocalStorage**.
