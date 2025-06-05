import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BadRequestError } from '../../../errors/AppError';
class CoreIOTService {
  private axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://app.coreiot.io',
      timeout: 3000,
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.setupInterceptors();
  }
  private setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add any request modifications here (e.g., auth tokens)
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Handle common error cases
        if (error.response) {
          console.error(`API error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          console.error('No response received from the server');
        } else {
          console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }
  public async sendAttribute({ accessToken, deviceID, key, value }: { accessToken: string, deviceID: string, key: string, value: string }) {
    try {
      const url = `/api/plugins/telemetry/DEVICE/${deviceID}/SHARED_SCOPE`
      const response = await this.axiosInstance.post(url, {
        [key]: value
      }, {
        headers: {
          'X-Authorization': accessToken,
          'Content-Type': 'application/json'
        },
      })
      return response.data
    } catch (error) {
      console.log(error)
      throw new BadRequestError("Error in core iot. Try again")

    }
  }
  public async getAttribute({ accessToken, deviceAccessToken, clientKeys, sharedKeys }: { accessToken: string, deviceAccessToken: string, clientKeys?: string, sharedKeys?: string }) {
    try {
      const url = `/api/v1/${deviceAccessToken}/attributes`
      const response = await this.axiosInstance.get(url, {
        headers: {
          'X-Authorization': accessToken,
          'Content-Type': 'application/json'
        },
        params: {
          clientKeys,
          sharedKeys
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
      throw new BadRequestError("Error in core iot. Try again")

    }
  }
  public async getTelemetry({ deviceID, keys, accessToken }: { deviceID: string, keys: string, accessToken: string }) {

    try {
      const url = `/api/plugins/telemetry/DEVICE/${deviceID}/values/timeseries?keys=${keys}`;
      const response = await this.axiosInstance.get(url, {
        headers: {
          'X-Authorization': accessToken,
          'Content-Type': 'application/json'
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
      throw new BadRequestError("Error in core iot. Try again")
    }
  }
  public async callRPC({ deviceID, callType, rpcRequest, accessToken }: { deviceID: string, callType: 'oneway' | 'twoway', rpcRequest: { method: string, params: any }, accessToken: string }) {
    try {
      const url = `/api/plugins/rpc/${callType}/${deviceID}`;
      const response = await this.axiosInstance.post(url, rpcRequest, {
        headers: {
          'X-Authorization': accessToken,
          'Content-Type': 'application/json'
        }
      })
      return response
    } catch (error) {
      console.log(error)
      throw new BadRequestError("Error in core iot. Try again")
    }

  }
  public async login({ email, password }: { email: string, password: string }) {
    const response = await this.axiosInstance.post("/api/auth/login", { email, password })
    return response
  }
}
export const coreIOTService = new CoreIOTService()