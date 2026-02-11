import SwiftUI

struct ContentView: View {
    @EnvironmentObject var viewModel: WeatherViewModel
    @State private var showingSearch = false

    var body: some View {
        NavigationStack {
            ZStack {
                LinearGradient(
                    colors: [Color.blue.opacity(0.6), Color.blue.opacity(0.2)],
                    startPoint: .top,
                    endPoint: .bottom
                )
                .ignoresSafeArea()

                if viewModel.isLoading && viewModel.cities.isEmpty {
                    ProgressView("Loading weather...")
                        .foregroundColor(.white)
                } else {
                    ScrollView {
                        LazyVStack(spacing: 16) {
                            ForEach(viewModel.cities) { city in
                                NavigationLink(destination: CityDetailView(city: city)) {
                                    CityCardView(city: city)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                        .padding()
                    }
                    .refreshable {
                        await viewModel.refreshAll()
                    }
                }
            }
            .navigationTitle("Weather")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        showingSearch = true
                    } label: {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(.primary)
                    }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        viewModel.useCelsius.toggle()
                    } label: {
                        Text(viewModel.unitLabel())
                            .fontWeight(.medium)
                    }
                }
            }
            .sheet(isPresented: $showingSearch) {
                SearchCityView()
            }
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(WeatherViewModel())
}
