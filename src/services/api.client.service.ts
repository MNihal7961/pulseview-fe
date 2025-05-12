import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

// Axios Instance
const apiClient = axios.create({
  baseURL: import.meta.env.API_BASE_URL ?? "https://pulseview-be.onrender.com",
  timeout: 60000 * 2,
});

// Adding Request Interceptor to add token to the request
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config; // Always return config to ensure the request proceeds
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response Interceptor to Handle Errors
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      switch (error.response.status) {
        // Handle unauthorized error
        case 401:
          if (window.location.pathname !== "/auth/signin") {
            localStorage.clear();
            // window.location.href = "/sign-in";
          }
          break;
        // Handle forbidden error
        case 403:
          if (window.location.pathname !== "/auth/signin") {
            // window.location.href = "/sign-in";
          }
          break;
        // Handle not found error
        case 404:
          if (window.location.pathname !== "/404") {
            window.location.href = "/404";
          }
          break;
        case 500:
          // Handle internal server error
          console.error("Internal server error, please try again later.");
          break;
        default:
          console.error(`Unexpected error: ${error.response.status}`);
      }
    } else {
      console.error("Network error or server is not responding.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
