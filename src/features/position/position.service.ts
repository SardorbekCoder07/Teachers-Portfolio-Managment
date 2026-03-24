import { apiClient } from "@/api/client";
import { POSITION, POSITION_STATS } from "@/constants/apiEndpoint";
import type {
	CreatePositionDTO,
	PositionCreateResponse,
	PositionDeleteResponse,
	PositionListResponse,
	PositionStatsResponse,
	PositionUpdateResponse,
	UpdatePositionDTO,
} from "./position.types";

export const positionService = {
	getList() {
		return apiClient.get<PositionListResponse>(POSITION);
	},

	getStats() {
		return apiClient.get<PositionStatsResponse>(POSITION_STATS);
	},

	create(data: CreatePositionDTO) {
		return apiClient.post<PositionCreateResponse>(POSITION, data);
	},

	update(id: number, data: UpdatePositionDTO) {
		return apiClient.put<PositionUpdateResponse>(`${POSITION}/${id}`, data);
	},

	delete(id: number) {
		return apiClient.delete<PositionDeleteResponse>(`${POSITION}/${id}`);
	},
};
