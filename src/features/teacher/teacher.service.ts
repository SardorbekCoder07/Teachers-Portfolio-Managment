import { apiClient } from "@/api/client";
import { TEACHER } from "@/constants/apiEndpoint";
import type {
	CreateTeacherDTO,
	CreateTeacherResponse,
	DeleteTeacherResponse,
	TeacherSearchParams,
	TeacherSearchResponse,
	UpdateTeacherDTO,
	UpdateTeacherResponse,
} from "./teacher.types";

export const teacherService = {
	search(params: TeacherSearchParams) {
		return apiClient.get<TeacherSearchResponse>(TEACHER.SEARCH, { params });
	},

	create(data: CreateTeacherDTO) {
		return apiClient.post<CreateTeacherResponse>(TEACHER.SAVE, data);
	},

	update(data: UpdateTeacherDTO) {
		return apiClient.put<UpdateTeacherResponse>(TEACHER.UPDATE, data);
	},

	delete(userId: number) {
		return apiClient.delete<DeleteTeacherResponse>(`${TEACHER.DELETE}/${userId}`, {
			params: { userId },
		});
	},
};
