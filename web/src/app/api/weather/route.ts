import { NextRequest, NextResponse } from "next/server";
import { fetchWeather, toCity } from "@/lib/weather";

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city");

  if (!city) {
    return NextResponse.json({ error: "City parameter required" }, { status: 400 });
  }

  try {
    const res = await fetchWeather(city);
    const data = toCity(res);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}
