export interface CreateDepartmentDTO {
	name: string;
	imgUrl: string;
	collegeId: number;
}

export interface DepartmentCreateResponse {
	success: boolean;
	message: string;
	data: null;
}

export interface UpdateDepartmentDTO {
	name: string;
	imgUrl?: string;
	collegeId: number;
}

export interface DepartmentUpdateResponse {
	success: boolean;
	message: string;
	data: string;
}

export interface DepartmentDeleteResponse {
	success: boolean;
	message: string;
}

export interface Department {
	id: number;
	name: string;
	imgUrl: string | null;
	collegeId: number;
	collegeName: string;
}

export interface DepartmentPage {
	page: number;
	size: number;
	totalPage: number;
	totalElements: number;
	body: Department[];
}

export interface DepartmentPageParams {
	page: number;
	size: number;
	name?: string;
	collegeId?: number;
}

export interface DepartmentPageResponse {
	success: boolean;
	message: string;
	data: DepartmentPage;
}

export interface DepartmentListResponse {
	success: boolean;
	message: string;
	data: Department[];
}
