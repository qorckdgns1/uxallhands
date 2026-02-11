import SwiftUI

struct CityDetailView: View {
    let city: CityWeather
    @EnvironmentObject var viewModel: WeatherViewModel

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Current weather header
                currentWeatherHeader

                // Hourly forecast
                hourlyForecastSection

                // Daily forecast
                dailyForecastSection

                // Weather details grid
                weatherDetailsGrid
            }
            .padding()
        }
        .background(
            LinearGradient(
                colors: [Color.blue.opacity(0.5), Color.blue.opacity(0.15)],
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()
        )
        .navigationTitle(city.cityName)
        .navigationBarTitleDisplayMode(.inline)
    }

    // MARK: - Current Weather Header

    private var currentWeatherHeader: some View {
        VStack(spacing: 8) {
            Image(systemName: city.sfSymbolName)
                .font(.system(size: 64))
                .symbolRenderingMode(.multicolor)

            Text(viewModel.temperatureString(city.temperature))
                .font(.system(size: 72, weight: .thin))
                .foregroundColor(.primary)

            Text(city.conditionText)
                .font(.title3)
                .foregroundColor(.secondary)

            HStack(spacing: 16) {
                Label("H: \(viewModel.temperatureString(city.high))", systemImage: "arrow.up")
                Label("L: \(viewModel.temperatureString(city.low))", systemImage: "arrow.down")
            }
            .font(.subheadline)
            .foregroundColor(.secondary)
        }
        .padding(.vertical)
    }

    // MARK: - Hourly Forecast

    private var hourlyForecastSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label("HOURLY FORECAST", systemImage: "clock")
                .font(.caption)
                .foregroundColor(.secondary)

            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    ForEach(city.hourlyForecast.prefix(24)) { hour in
                        VStack(spacing: 8) {
                            Text(formatHour(hour.time))
                                .font(.caption2)
                                .foregroundColor(.secondary)

                            Image(systemName: weatherSymbol(for: hour.condition.code))
                                .font(.title3)
                                .symbolRenderingMode(.multicolor)

                            Text(viewModel.temperatureString(hour.tempC))
                                .font(.callout)
                                .fontWeight(.medium)
                        }
                        .frame(width: 56)
                    }
                }
            }
        }
        .padding()
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
    }

    // MARK: - Daily Forecast

    private var dailyForecastSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label("7-DAY FORECAST", systemImage: "calendar")
                .font(.caption)
                .foregroundColor(.secondary)

            ForEach(city.dailyForecast) { day in
                HStack {
                    Text(formatDay(day.date))
                        .font(.callout)
                        .frame(width: 80, alignment: .leading)

                    Image(systemName: weatherSymbol(for: day.day.condition.code))
                        .font(.title3)
                        .symbolRenderingMode(.multicolor)
                        .frame(width: 36)

                    Spacer()

                    HStack(spacing: 4) {
                        Text(viewModel.temperatureString(day.day.mintempC))
                            .foregroundColor(.secondary)
                        TemperatureBar(
                            low: day.day.mintempC,
                            high: day.day.maxtempC,
                            overallLow: overallLow,
                            overallHigh: overallHigh
                        )
                        .frame(width: 80, height: 6)
                        Text(viewModel.temperatureString(day.day.maxtempC))
                    }
                    .font(.callout)
                }
                if day.id != city.dailyForecast.last?.id {
                    Divider()
                }
            }
        }
        .padding()
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
    }

    // MARK: - Weather Details Grid

    private var weatherDetailsGrid: some View {
        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
            WeatherDetailCard(
                icon: "humidity.fill",
                title: "HUMIDITY",
                value: "\(city.humidity)%"
            )
            WeatherDetailCard(
                icon: "wind",
                title: "WIND",
                value: "\(Int(city.windSpeed)) km/h"
            )
            WeatherDetailCard(
                icon: "thermometer.medium",
                title: "FEELS LIKE",
                value: viewModel.temperatureString(city.feelsLike)
            )
            WeatherDetailCard(
                icon: "sun.max.fill",
                title: "UV INDEX",
                value: "\(Int(city.uvIndex))"
            )
            WeatherDetailCard(
                icon: "eye.fill",
                title: "VISIBILITY",
                value: "\(Int(city.visibility)) km"
            )
            WeatherDetailCard(
                icon: "drop.fill",
                title: "RAIN CHANCE",
                value: "\(city.dailyForecast.first?.day.dailyChanceOfRain ?? "0")%"
            )
        }
    }

    // MARK: - Helpers

    private var overallLow: Double {
        city.dailyForecast.map(\.day.mintempC).min() ?? 0
    }

    private var overallHigh: Double {
        city.dailyForecast.map(\.day.maxtempC).max() ?? 0
    }

    private func formatHour(_ time: String) -> String {
        let parts = time.split(separator: " ")
        if parts.count > 1 {
            return String(parts[1].prefix(5))
        }
        return time
    }

    private func formatDay(_ dateString: String) -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        guard let date = formatter.date(from: dateString) else { return dateString }
        let dayFormatter = DateFormatter()
        dayFormatter.dateFormat = "EEE"
        return dayFormatter.string(from: date)
    }
}

// MARK: - Temperature Bar

struct TemperatureBar: View {
    let low: Double
    let high: Double
    let overallLow: Double
    let overallHigh: Double

    var body: some View {
        GeometryReader { geometry in
            let range = overallHigh - overallLow
            let startFraction = range > 0 ? (low - overallLow) / range : 0
            let endFraction = range > 0 ? (high - overallLow) / range : 1

            ZStack(alignment: .leading) {
                Capsule()
                    .fill(Color.gray.opacity(0.2))

                Capsule()
                    .fill(
                        LinearGradient(
                            colors: [.blue, .green, .yellow, .orange],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .frame(
                        width: geometry.size.width * (endFraction - startFraction)
                    )
                    .offset(x: geometry.size.width * startFraction)
            }
        }
    }
}

// MARK: - Weather Detail Card

struct WeatherDetailCard: View {
    let icon: String
    let title: String
    let value: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Label(title, systemImage: icon)
                .font(.caption)
                .foregroundColor(.secondary)

            Text(value)
                .font(.title2)
                .fontWeight(.semibold)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
    }
}
