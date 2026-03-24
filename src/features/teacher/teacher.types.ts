// ─── Search ───────────────────────────────────────────────────────────────────

export interface TeacherSearchParams {
	name?: string;
	department?: string;
	lavozim?: string;
	page: number;
	size: number;
}

export interface TeacherItem {
	id: number;
	fullName: string;
	lavozim: string;
	email: string | null;
	age: number;
	gender: boolean;
	profession: string | null;
	imgUrl: string;
	input: string | null;
	phoneNumber: string;
	departmentName: string;
}

export interface TeacherPage {
	page: number;
	size: number;
	totalPage: number;
	totalElements: number;
	body: TeacherItem[];
}

export interface TeacherSearchResponse {
	success: boolean;
	message: string;
	data: TeacherPage;
}

// ─── Request ──────────────────────────────────────────────────────────────────

export interface CreateTeacherDTO {
	fullName: string;
	phoneNumber: string;
	imgUrl: string;
	fileUrl: string;
	lavozmId: number;
	gender: boolean;
	password: string;
	departmentId: number;
}

// ─── Update ───────────────────────────────────────────────────────────────────

export interface UpdateTeacherDTO {
	id: number;
	fullName: string;
	phoneNumber: string;
	email: string;
	biography: string;
	input: string;
	age: number;
	orcId: string;
	scopusId: string;
	scienceId: string;
	researcherId: string;
	gender: boolean;
	imageUrl: string;
	fileUrl: string;
	profession: string;
	lavozmId: number;
	departmentId: number;
}

export interface UpdateTeacherResponse {
	success: boolean;
	message: string;
	data: string;
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export interface DeleteTeacherResponse {
	success: boolean;
	message: string;
	data: string;
}

// ─── Response ─────────────────────────────────────────────────────────────────

export interface CreateTeacherResponse {
	success: boolean;
	message: string;
	data: string;
}
