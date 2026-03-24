// src/features/user/api/user.service.ts

import { apiClient } from "@/api/client";
import { USER } from "@/constants/apiEndpoint";
import type { UserResponse } from "./user.types";

export const userService = {
	getMe() {
		return apiClient.get<UserResponse>(USER.USER_ME);
	},
};