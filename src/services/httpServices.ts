import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_WEATHERMAP_API_KEY;
export const httpService = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor to add apiKey as query param
  axiosInstance.interceptors.request.use((config) => {
    config.params = {
      ...(config.params || {}),
      apiKey,
    };
    return config;
  });

  const get = <T,>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosInstance.get<T>(baseURL+endpoint, config);
  };

  const post = <T,>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosInstance.post<T>(url, data, config);
  };

  const put = <T,>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosInstance.put<T>(url, data, config);
  };

  const del = <T,>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosInstance.delete<T>(url, config);
  };

  return { get, post, put, del };
}