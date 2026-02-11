import SwiftUI

struct SearchCityView: View {
    @EnvironmentObject var viewModel: WeatherViewModel
    @Environment(\.dismiss) var dismiss
    @State private var searchText = ""
    @State private var isAdding = false

    private let suggestedCities = [
        "Paris", "Berlin", "Sydney", "Dubai",
        "Singapore", "Mumbai", "Toronto", "Mexico City",
        "Cairo", "Bangkok", "Istanbul", "Rome"
    ]

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Search bar
                HStack {
                    Image(systemName: "magnifyingglass")
                        .foregroundColor(.secondary)

                    TextField("Search for a city...", text: $searchText)
                        .textFieldStyle(.plain)
                        .autocorrectionDisabled()
                        .submitLabel(.search)
                        .onSubmit {
                            addCity()
                        }

                    if !searchText.isEmpty {
                        Button {
                            searchText = ""
                        } label: {
                            Image(systemName: "xmark.circle.fill")
                                .foregroundColor(.secondary)
                        }
                    }
                }
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(12)
                .padding()

                if searchText.isEmpty {
                    // Suggested cities
                    List {
                        Section("Suggested Cities") {
                            ForEach(suggestedCities, id: \.self) { city in
                                Button {
                                    searchText = city
                                    addCity()
                                } label: {
                                    HStack {
                                        Image(systemName: "mappin.circle.fill")
                                            .foregroundColor(.blue)
                                        Text(city)
                                            .foregroundColor(.primary)
                                        Spacer()
                                        Image(systemName: "plus.circle")
                                            .foregroundColor(.blue)
                                    }
                                }
                            }
                        }
                    }
                    .listStyle(.insetGrouped)
                } else {
                    // Show add button for custom search
                    VStack(spacing: 16) {
                        Button {
                            addCity()
                        } label: {
                            HStack {
                                Image(systemName: "magnifyingglass")
                                Text("Search \"\(searchText)\"")
                                Spacer()
                                if isAdding {
                                    ProgressView()
                                } else {
                                    Image(systemName: "plus.circle.fill")
                                }
                            }
                            .padding()
                            .background(Color(.systemGray6))
                            .cornerRadius(12)
                        }
                        .disabled(isAdding)
                        .padding(.horizontal)

                        Spacer()
                    }
                    .padding(.top)
                }
            }
            .navigationTitle("Add City")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
    }

    private func addCity() {
        guard !searchText.isEmpty, !isAdding else { return }
        isAdding = true
        Task {
            await viewModel.addCity(searchText)
            isAdding = false
            dismiss()
        }
    }
}

#Preview {
    SearchCityView()
        .environmentObject(WeatherViewModel())
}
