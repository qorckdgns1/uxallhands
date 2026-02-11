import SwiftUI

@main
struct WeatherAppApp: App {
    @StateObject private var weatherViewModel = WeatherViewModel()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(weatherViewModel)
        }
    }
}
