import { httpService } from "@/services/httpServices";
import { weatherSlice } from "@/store/WeatherReducer";
import { WeatherData, WeatherResponse } from "@/types/Weather";
import beautifyWeatherResponse from "@/utils/BeautifyWeatherResponse";
import saveRecentSearches from "@/utils/SaveRecentSearch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";


const getWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  const { get } = httpService();
  const url = `/2.5/weather?q=${city}`;
  const response = await get(url);
  return response.data as WeatherResponse;
}

const getWeatherByCoordinates = async (lat: number, lon: number): Promise<any> => {
  const { get } = httpService();
  const url = `/2.5/weather?lat=${lat}&lon=${lon}`;
  const response = await get(url);
  return response.data;
}


export const useWeatherQuery = (lat: number, lon: number, skip: boolean) => {
  return useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeatherByCoordinates(lat, lon),
    enabled: !skip && !!(lat && lon),
    retry: 1,
  });
}

export const useWeatherMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: getWeatherByCity,
    onSuccess: (data: WeatherResponse) => {
      const weatherData: WeatherData = beautifyWeatherResponse(data);
      saveRecentSearches(weatherData.name);
      console.log("Mutation Weather data fetched successfully:", weatherData);
      dispatch(weatherSlice.actions.fetchWeatherSuccess(weatherData));

    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Error fetching weather data:", err.response?.data?.message);
      dispatch(weatherSlice.actions.fetchWeatherFailure(err.response?.data?.message));
    }
  });
} 