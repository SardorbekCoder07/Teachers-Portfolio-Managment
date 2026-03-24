// src/features/auth/api/auth.service.ts

import { apiClient } from "@/api/client";
import { LOGIN } from "@/constants/apiEndpoint";
import type { LoginDTO, LoginResponse } from "./auth.types";

export const authService = {
	login(data: LoginDTO) {
		return apiClient.post<LoginResponse>(LOGIN, null, {
			params: {
				phone: data.phone.replace(/^\+/, ""),
				password: data.password,
			},
		});
	},
};
