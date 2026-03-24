// src/api/client.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toast } from "sonner";
import useUserStore from "@/store/userStore";

// Backend'dan keladigan xato shakli
export interface ApiError {
	message: string;
	status: number;
	success: boolean;
}

class ApiClient {
	private client: AxiosInstance;

	constructor() {
		this.client = axios.create({
			baseURL: import.meta.env.VITE_API_BASE_URL,
			timeout: 30000,
			headers: {
				"Content-Type": "application/json",
			},
		});

		this.setupInterceptors();
	}

	// ============================================
	// INTERCEPTORLAR
	// ============================================

	private setupInterceptors(): void {
		// REQUEST INTERCEPTOR — har bir so'rov ketishidan oldin ishlaydi
		this.client.interceptors.request.use(
			(config) => {
				const token = useUserStore.getState().userToken?.accessToken;

				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}

				return config;
			},
			(error: unknown) => {
				return Promise.reject(error);
			},
		);

		// RESPONSE INTERCEPTOR — har bir javob kelganda ishlaydi
		this.client.interceptors.response.use(
			(response) => response,
			(error: AxiosError<ApiError>) => {
				// Server javob qaytargan bo'lsa
				if (error.response) {
					const { status, data } = error.response;

					const apiError: ApiError = {
						message: data?.message ?? error.message ?? "Server xatosi",
						status,
						success: false,
					};

					// 401 — token eskirgan yoki noto'g'ri
					if (status === 401) {
						useUserStore.getState().actions.clearUserInfoAndToken();
						window.location.href = "/auth/login";
					}

					// 500 — server ichki xatosi
					if (status === 500) {
						toast.error("Server vaqtincha ishlamayapti, qaytadan urinib ko'ring");
					}

					return Promise.reject(apiError);
				}

				// Server javob bermagan — tarmoq xatosi
				return Promise.reject({
					message: "Tarmoq xatosi — serverga ulanib bo'lmadi",
					status: 0,
					success: false,
				} satisfies ApiError);
			},
		);
	}

	// ============================================
	// HTTP METODLAR
	// ============================================

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await this.client.get(url, config);
		return response.data;
	}

	async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await this.client.post(url, data, config);
		return response.data;
	}

	async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await this.client.put(url, data, config);
		return response.data;
	}

	async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await this.client.patch(url, data, config);
		return response.data;
	}

	async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await this.client.delete(url, config);
		return response.data;
	}
}

export const apiClient = new ApiClient();
