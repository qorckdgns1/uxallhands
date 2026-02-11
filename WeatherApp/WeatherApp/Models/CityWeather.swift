import Foundation

struct CityWeather: Identifiable {
    let id = UUID()
    let cityName: String
    let region: String
    let temperature: Double
    let conditionText: String
    let conditionCode: Int
    let high: Double
    let low: Double
    let hourlyForecast: [HourWeather]
    let dailyForecast: [ForecastDay]
    let humidity: Int
    let windSpeed: Double
    let feelsLike: Double
    let uvIndex: Double
    let visibility: Double
}

extension CityWeather {
    var sfSymbolName: String {
        weatherSymbol(for: conditionCode)
    }
}

func weatherSymbol(for code: Int) -> String {
    switch code {
    case 1000:
        return "sun.max.fill"
    case 1003:
        return "cloud.sun.fill"
    case 1006, 1009:
        return "cloud.fill"
    case 1030, 1135, 1147:
        return "cloud.fog.fill"
    case 1063, 1150, 1153, 1180, 1183:
        return "cloud.drizzle.fill"
    case 1066, 1210, 1213:
        return "cloud.snow.fill"
    case 1069, 1204, 1207:
        return "cloud.sleet.fill"
    case 1072, 1168, 1171:
        return "cloud.hail.fill"
    case 1087:
        return "cloud.bolt.fill"
    case 1114, 1117:
        return "wind.snow"
    case 1186, 1189, 1192, 1195, 1240, 1243, 1246:
        return "cloud.rain.fill"
    case 1198, 1201:
        return "cloud.hail.fill"
    case 1216, 1219, 1222, 1225, 1255, 1258:
        return "cloud.snow.fill"
    case 1237, 1261, 1264:
        return "cloud.hail.fill"
    case 1273, 1276:
        return "cloud.bolt.rain.fill"
    case 1279, 1282:
        return "cloud.bolt.fill"
    default:
        return "cloud.fill"
    }
}
