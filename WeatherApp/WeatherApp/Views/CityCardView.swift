import SwiftUI

struct CityCardView: View {
    let city: CityWeather
    @EnvironmentObject var viewModel: WeatherViewModel

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 6) {
                Text(city.cityName)
                    .font(.title2)
                    .fontWeight(.semibold)
                    .foregroundColor(.white)

                Text(city.region)
                    .font(.caption)
                    .foregroundColor(.white.opacity(0.8))

                Text(city.conditionText)
                    .font(.subheadline)
                    .foregroundColor(.white.opacity(0.9))
            }

            Spacer()

            VStack(alignment: .trailing, spacing: 6) {
                HStack(spacing: 4) {
                    Image(systemName: city.sfSymbolName)
                        .font(.title)
                        .symbolRenderingMode(.multicolor)

                    Text(viewModel.temperatureString(city.temperature))
                        .font(.system(size: 42, weight: .light))
                        .foregroundColor(.white)
                }

                HStack(spacing: 8) {
                    Label("H: \(viewModel.temperatureString(city.high))", systemImage: "arrow.up")
                    Label("L: \(viewModel.temperatureString(city.low))", systemImage: "arrow.down")
                }
                .font(.caption)
                .foregroundColor(.white.opacity(0.8))
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(
                    LinearGradient(
                        colors: gradientColors(for: city.conditionCode),
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
        )
        .shadow(color: .black.opacity(0.15), radius: 8, x: 0, y: 4)
    }

    private func gradientColors(for code: Int) -> [Color] {
        switch code {
        case 1000:
            return [.orange, .yellow.opacity(0.8)]
        case 1003:
            return [.blue.opacity(0.7), .cyan.opacity(0.6)]
        case 1006, 1009:
            return [.gray.opacity(0.7), .gray.opacity(0.5)]
        case 1063, 1180...1201, 1240...1246:
            return [.blue.opacity(0.8), .indigo.opacity(0.6)]
        case 1066, 1114, 1117, 1210...1225, 1255, 1258:
            return [.white.opacity(0.7), .cyan.opacity(0.4)]
        case 1087, 1273...1282:
            return [.indigo, .purple.opacity(0.7)]
        default:
            return [.blue.opacity(0.6), .cyan.opacity(0.5)]
        }
    }
}
