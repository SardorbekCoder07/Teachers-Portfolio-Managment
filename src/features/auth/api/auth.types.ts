// src/features/auth/api/auth.types.ts

// Form'dan keladigan ma'lumot
export interface LoginDTO {
	phone: string;
	password: string;
}

// Backend javobi — Swagger'dan
export interface LoginResponse {
	success: boolean;
	message: string;
	data: string; // token
}
