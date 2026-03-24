import { apiClient } from "@/api/client";
import { COLLAGE, COLLAGE_PAGE } from "@/constants/apiEndpoint";
import type {
	CreateCollageDTO,
	UpdateCollageDTO,
	CollageListResponse,
	CollageCreateResponse,
	CollagePageParams,
	CollagePageResponse,
} from "./collage.types";

export const collageService = {
	getAll() {
		return apiClient.get<CollageListResponse>(COLLAGE);
	},

	getPage(params: CollagePageParams) {
		return apiClient.get<CollagePageResponse>(COLLAGE_PAGE, { params });
	},

	create(data: CreateCollageDTO) {
		return apiClient.post<CollageCreateResponse>(COLLAGE, data);
	},

	update(id: number, data: UpdateCollageDTO) {
		return apiClient.put<CollageCreateResponse>(`${COLLAGE}/${id}`, data);
	},

	delete(id: number) {
		return apiClient.delete<{ success: boolean; message: string }>(`${COLLAGE}/${id}`);
	},
};
