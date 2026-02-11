import Foundation
import SwiftUI

@MainActor
class WeatherViewModel: ObservableObject {
    @Published var cities: [CityWeather] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    @Published var useCelsius = true
    @Published var searchText = ""

    private let weatherService = WeatherService()
    let locationManager = LocationManager()

    private let defaultCities = ["San Francisco", "New York", "London", "Tokyo", "Seoul"]

    init() {
        loadDefaultCities()
    }

    func loadDefaultCities() {
        Task {
            await loadCities(defaultCities)
        }
    }

    func loadCities(_ cityNames: [String]) async {
        isLoading = true
        errorMessage = nil

        var loaded: [CityWeather] = []
        for city in cityNames {
            if let weather = await fetchCity(city) {
                loaded.append(weather)
            }
        }

        cities = loaded
        isLoading = false
    }

    func addCity(_ name: String) async {
        guard !name.trimmingCharacters(in: .whitespaces).isEmpty else { return }

        isLoading = true
        if let weather = await fetchCity(name) {
            cities.append(weather)
        }
        isLoading = false
    }

    func removeCity(at offsets: IndexSet) {
        cities.remove(atOffsets: offsets)
    }

    func refreshAll() async {
        let names = cities.map { $0.cityName }
        await loadCities(names)
    }

    private func fetchCity(_ name: String) async -> CityWeather? {
        do {
            let response = try await weatherService.fetchWeather(for: name)
            return CityWeather(
                cityName: response.location.name,
                region: response.location.region,
                temperature: response.current.tempC,
                conditionText: response.current.condition.text,
                conditionCode: response.current.condition.code,
                high: response.forecast.forecastday.first?.day.maxtempC ?? 0,
                low: response.forecast.forecastday.first?.day.mintempC ?? 0,
                hourlyForecast: response.forecast.forecastday.first?.hour ?? [],
                dailyForecast: response.forecast.forecastday,
                humidity: response.current.humidity,
                windSpeed: response.current.windKph,
                feelsLike: response.current.feelslikeC,
                uvIndex: response.current.uv,
                visibility: response.current.visKm
            )
        } catch {
            errorMessage = error.localizedDescription
            return nil
        }
    }

    func temperatureString(_ temp: Double) -> String {
        let value = useCelsius ? temp : temp * 9 / 5 + 32
        let unit = useCelsius ? "°" : "°"
        return "\(Int(round(value)))\(unit)"
    }

    func unitLabel() -> String {
        useCelsius ? "°C" : "°F"
    }
}
