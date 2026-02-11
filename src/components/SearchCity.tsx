"use client";

import { useState } from "react";

const SUGGESTED = [
  "Paris", "Berlin", "Sydney", "Dubai",
  "Singapore", "Mumbai", "Toronto", "Mexico City",
  "Cairo", "Bangkok", "Istanbul", "Rome",
];

export default function SearchCity({
  onAdd,
  onClose,
}: {
  onAdd: (city: string) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (city: string) => {
    if (!city.trim() || loading) return;
    setLoading(true);
    onAdd(city);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Add City</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            &times;
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-3">
            <span className="text-gray-400">&#128269;</span>
            <input
              type="text"
              placeholder="Search for a city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd(search)}
              className="bg-transparent outline-none flex-1 text-sm"
              autoFocus
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
                &times;
              </button>
            )}
          </div>
        </div>

        {search ? (
          <div className="px-4 pb-4">
            <button
              onClick={() => handleAdd(search)}
              disabled={loading}
              className="w-full flex items-center justify-between p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <span className="text-sm">
                Search &quot;{search}&quot;
              </span>
              {loading ? (
                <span className="text-xs text-gray-400">Loading...</span>
              ) : (
                <span className="text-blue-500">+</span>
              )}
            </button>
          </div>
        ) : (
          <div className="px-4 pb-4 max-h-64 overflow-y-auto">
            <p className="text-xs text-gray-500 mb-2 font-medium">SUGGESTED CITIES</p>
            <div className="flex flex-col gap-1">
              {SUGGESTED.map((city) => (
                <button
                  key={city}
                  onClick={() => handleAdd(city)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">&#128205;</span>
                    <span className="text-sm">{city}</span>
                  </div>
                  <span className="text-blue-500">+</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
