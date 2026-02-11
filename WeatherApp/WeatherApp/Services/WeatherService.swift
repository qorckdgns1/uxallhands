import Foundation
import CoreLocation

class WeatherService {
    // Using WeatherAPI.com free tier
    // Users should replace with their own API key from https://www.weatherapi.com
    private let apiKey = "YOUR_API_KEY"
    private let baseURL = "https://api.weatherapi.com/v1"

    func fetchWeather(for city: String) async throws -> WeatherResponse {
        let query = city.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? city
        let urlString = "\(baseURL)/forecast.json?key=\(apiKey)&q=\(query)&days=7&aqi=no"

        guard let url = URL(string: urlString) else {
            throw WeatherError.invalidURL
        }

        let (data, response) = try await URLSession.shared.data(from: url)

        guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
            throw WeatherError.invalidResponse
        }

        let decoder = JSONDecoder()
        return try decoder.decode(WeatherResponse.self, from: data)
    }

    func fetchWeather(lat: Double, lon: Double) async throws -> WeatherResponse {
        let query = "\(lat),\(lon)"
        return try await fetchWeather(for: query)
    }
}

enum WeatherError: LocalizedError {
    case invalidURL
    case invalidResponse
    case decodingError
    case locationNotFound

    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "Invalid URL"
        case .invalidResponse:
            return "Invalid response from server"
        case .decodingError:
            return "Failed to decode weather data"
        case .locationNotFound:
            return "Location not found"
        }
    }
}
