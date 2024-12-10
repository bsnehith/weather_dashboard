const appid = import.meta.env.VITE_OWM_API; 
const appid_wa = import.meta.env.VITE_WA_API;

export const handleSearchNameReq = async (city, limit = 1) => {
    if (!city) {
        console.error("No city name provided");
        return null;
    }

    // Construct URL for OpenWeatherMap geocoding API
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${appid}`;

    try {
        const resp = await fetch(url);
        const data = await resp.json();

        if (data && data.length > 0) {
            return data.map((d) => ({
                name: d.name,
                state: d.state,
                country: d.country,
                lat: d.lat,
                lon: d.lon
            }));
        } else {
            console.error("City not found in OpenWeatherMap geocoding API.");
            throw new Error("City not found");
        }
    } catch (err) {
        console.error("Error fetching city data:", err);
        return null;
    }
};

export const handleFinalSearch = async (lat, lon) => {
    if (!lat || !lon) {
        console.error("Invalid latitude or longitude");
        return null;
    }

    // Construct URL for WeatherAPI to get the weather data
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${appid_wa}&q=${lat},${lon}&days=3&aqi=yes&alerts=no`;

    try {
        const resp = await fetch(url);
        const data = await resp.json();

        if (data.error) {
            console.error("Error from WeatherAPI:", data.error.message);
            throw new Error(data.error.message);
        }

        return data;
    } catch (err) {
        console.error("Error fetching weather data:", err);
        return null;
    }
};
