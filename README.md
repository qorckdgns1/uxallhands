# WeatherApp - iOS Weather Application

A modern iOS weather app built with SwiftUI that displays current weather conditions, hourly forecasts, and 7-day forecasts for multiple cities.

## Features

- **Multi-city support** - Track weather for multiple cities simultaneously
- **Current conditions** - Temperature, humidity, wind speed, UV index, visibility
- **Hourly forecast** - 24-hour forecast with temperature and conditions
- **7-day forecast** - Weekly forecast with temperature range bars
- **City search** - Add cities with search and suggested cities
- **Unit toggle** - Switch between Celsius and Fahrenheit
- **Pull to refresh** - Update weather data with pull-to-refresh
- **Location support** - CoreLocation integration for local weather
- **Dynamic styling** - Weather condition-based gradient cards

## Architecture

```
WeatherApp/
├── WeatherAppApp.swift          # App entry point
├── Info.plist                   # Location permission config
├── Models/
│   ├── Weather.swift            # API response models (Codable)
│   └── CityWeather.swift        # App domain model + SF Symbol mapping
├── Views/
│   ├── ContentView.swift        # Main city list view
│   ├── CityCardView.swift       # City weather card component
│   ├── CityDetailView.swift     # Detailed weather view with forecasts
│   └── SearchCityView.swift     # City search and add view
├── ViewModels/
│   └── WeatherViewModel.swift   # Main view model with business logic
├── Services/
│   ├── WeatherService.swift     # WeatherAPI.com network service
│   └── LocationManager.swift    # CoreLocation wrapper
└── Assets.xcassets/             # App icons and colors
```

## Requirements

- iOS 17.0+
- Xcode 15.0+
- Swift 5.9+

## Setup

1. Clone the repository
2. Open `WeatherApp.xcodeproj` in Xcode
3. Get a free API key from [WeatherAPI.com](https://www.weatherapi.com)
4. Replace `YOUR_API_KEY` in `WeatherService.swift` with your API key
5. Build and run on a simulator or device

## API

This app uses the [WeatherAPI.com](https://www.weatherapi.com) free tier which provides:
- Current weather data
- 7-day forecast
- Hourly forecast
- Location search
