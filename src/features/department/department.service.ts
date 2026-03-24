import { apiClient } from "@/api/client";
import { DEPARTMENT, DEPARTMENT_LIST, DEPARTMENT_PAGE } from "@/constants/apiEndpoint";
import type {
	CreateDepartmentDTO,
	DepartmentCreateResponse,
	DepartmentDeleteResponse,
	DepartmentListResponse,
	DepartmentPageParams,
	DepartmentPageResponse,
	DepartmentUpdateResponse,
	UpdateDepartmentDTO,
} from "./department.types";

export const departmentService = {
	getPage(params: DepartmentPageParams) {
		return apiClient.get<DepartmentPageResponse>(DEPARTMENT_PAGE, { params });
	},

	create(data: CreateDepartmentDTO) {
		return apiClient.post<DepartmentCreateResponse>(DEPARTMENT, data);
	},

	update(id: number, data: UpdateDepartmentDTO) {
		return apiClient.put<DepartmentUpdateResponse>(`${DEPARTMENT}/${id}`, data);
	},

	delete(id: number) {
		return apiClient.delete<DepartmentDeleteResponse>(`${DEPARTMENT}/${id}`);
	},

	getList() {
		return apiClient.get<DepartmentListResponse>(DEPARTMENT_LIST);
	},
};
