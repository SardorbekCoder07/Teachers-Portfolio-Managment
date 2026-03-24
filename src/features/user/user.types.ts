// src/features/user/api/user.types.ts

// Backend'dan keladigan to'liq javob
export interface UserResponse {
	success: boolean;
	message: string;
	data: {
		id: number;
		fullName: string;
		phone: string;
		email: string;
		imageUrl: string | null;
		role: string;
	};
}

// Biz ishlatadigan 3 ta field
export interface UserProfile {
	fullName: string;
	phone: string;
	imageUrl: string | null;
}
