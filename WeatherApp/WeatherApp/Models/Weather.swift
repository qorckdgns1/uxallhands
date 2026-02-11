import Foundation

struct WeatherResponse: Codable {
    let location: Location
    let current: CurrentWeather
    let forecast: Forecast
}

struct Location: Codable {
    let name: String
    let region: String
    let country: String
    let lat: Double
    let lon: Double
    let localtime: String
}

struct CurrentWeather: Codable {
    let tempC: Double
    let tempF: Double
    let condition: WeatherCondition
    let windMph: Double
    let windKph: Double
    let humidity: Int
    let feelslikeC: Double
    let feelslikeF: Double
    let uv: Double
    let visKm: Double

    enum CodingKeys: String, CodingKey {
        case tempC = "temp_c"
        case tempF = "temp_f"
        case condition
        case windMph = "wind_mph"
        case windKph = "wind_kph"
        case humidity
        case feelslikeC = "feelslike_c"
        case feelslikeF = "feelslike_f"
        case uv
        case visKm = "vis_km"
    }
}

struct WeatherCondition: Codable {
    let text: String
    let icon: String
    let code: Int
}

struct Forecast: Codable {
    let forecastday: [ForecastDay]
}

struct ForecastDay: Codable, Identifiable {
    let date: String
    let day: DayWeather
    let hour: [HourWeather]

    var id: String { date }
}

struct DayWeather: Codable {
    let maxtempC: Double
    let maxtempF: Double
    let mintempC: Double
    let mintempF: Double
    let condition: WeatherCondition
    let dailyChanceOfRain: String
    let avghumidity: Double

    enum CodingKeys: String, CodingKey {
        case maxtempC = "maxtemp_c"
        case maxtempF = "maxtemp_f"
        case mintempC = "mintemp_c"
        case mintempF = "mintemp_f"
        case condition
        case dailyChanceOfRain = "daily_chance_of_rain"
        case avghumidity
    }
}

struct HourWeather: Codable, Identifiable {
    let timeEpoch: Int
    let time: String
    let tempC: Double
    let tempF: Double
    let condition: WeatherCondition
    let chanceOfRain: String

    var id: Int { timeEpoch }

    enum CodingKeys: String, CodingKey {
        case timeEpoch = "time_epoch"
        case time
        case tempC = "temp_c"
        case tempF = "temp_f"
        case condition
        case chanceOfRain = "chance_of_rain"
    }
}
