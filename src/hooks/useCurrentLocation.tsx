import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { weatherSlice } from '@/store/WeatherReducer';

interface Coords {
    lat: number;
    lon: number;
}

export function useCurrentLocation() {
    const [coords, setCoords] = useState<Coords | null>(null);
    const dispatch = useDispatch();
    const requestLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (err) => {
                    dispatch(weatherSlice.actions.fetchWeatherFailure("We cannot get your current location. Please allow location access or enter a city name on search bar."));
                    console.error("Geolocation error:", err);
                }
            );
        } else {
            dispatch(weatherSlice.actions.fetchWeatherFailure("We cannot get your current location. Please allow location access or enter a city name on search bar."));
        }
    }, []);

    useEffect(() => {
        if (!navigator.permissions) return;

        navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
            permissionStatus.onchange = () => {
                console.log('Geolocation permission status changed:', permissionStatus.state);
                if (permissionStatus.state === 'granted') {
                    requestLocation();
                }
            };
        });
    }, []);
    return { coords, setCoords, requestLocation };
}
