import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:9898",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.request.use((onRequestConfig) => {
    // Log request details
    console.log("Request:", {
        method: onRequestConfig.method,
        url: onRequestConfig.url,
        headers: onRequestConfig.headers,
        data: onRequestConfig.data,
    });
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        onRequestConfig.headers["Authorization"] = `Bearer ${access_token}`
    }
    return onRequestConfig;
}, (onRequestError) => {
        // Log request error
        console.error("Request Error:", onRequestError);
    return Promise.reject(onRequestError);
})

apiClient.interceptors.response.use((onResFulfilled) => {
    // Log response details
    console.log("Response:", {
        status: onResFulfilled.status,
        statusText: onResFulfilled.statusText,
        data: onResFulfilled.data,
        headers: onResFulfilled.headers,
    });
    // Return the response if successful
    return onResFulfilled;
}, async (error) => {
    if (error.response?.status === 401){
        console.error("Response Error:", {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
        });
        const originalRequest = error.config;
        // Avoid infinite loops
        if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token'); // Retrieve the refresh token

                const response = await axios.post('https://api.example.com/auth/refresh', {
                    refresh_token: refreshToken,
                });

                const newAccessToken = response.data.access_token;
                localStorage.setItem('access_token', newAccessToken);
                // Update the Authorization header
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                // Retry the original request
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Handle refresh token failure (e.g., log out user)
                console.error('Refresh token failed:', refreshError);
                return Promise.reject(refreshError);
            }
        }
    } else if (error.request) {
        // No response was received
        console.error("No Response Error:", error.request);
    } else {
        // Error during request setup
        console.error("Axios Error:", error.message);
    }
    return Promise.reject(error);
})

