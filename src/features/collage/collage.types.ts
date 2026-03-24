export interface CreateCollageDTO {
	name: string;
	imgUrl: string;
}

export interface UpdateCollageDTO {
	name: string;
	imgUrl?: string;
}

export interface Collage {
	id: number;
	name: string;
	imgUrl: string | null;
	departmentCount: number;
	departmentNames: string[];
}

export interface CollagePage {
	page: number;
	size: number;
	totalPage: number;
	totalElements: number;
	body: Collage[];
}

export interface CollagePageParams {
	page: number;
	size: number;
	name?: string;
}

export interface CollagePageResponse {
	success: boolean;
	message: string;
	data: CollagePage;
}

export interface CollageListResponse {
	success: boolean;
	message: string;
	data: Collage[];
}

export interface CollageCreateResponse {
	success: boolean;
	message: string;
	data: Collage;
}
