export interface Position {
	id: number;
	name: string;
	count: number;
}

export interface PositionStat {
	name: string;
	totalEmployees: number;
}

export interface PositionStatsData {
	total: number;
	data: PositionStat[];
}

export interface PositionStatsResponse {
	success: boolean;
	message: string;
	data: PositionStatsData;
}

export interface CreatePositionDTO {
	name: string;
}

export interface UpdatePositionDTO {
	name: string;
}

export interface PositionListResponse {
	success: boolean;
	message: string;
	data: Position[];
}

export interface PositionCreateResponse {
	success: boolean;
	message: string;
	data: string;
}

export interface PositionUpdateResponse {
	success: boolean;
	message: string;
	data: string;
}

export interface PositionDeleteResponse {
	success: boolean;
	message: string;
	data: string;
}
