import { departmentService } from "@/features/department/department.service";
import type { DepartmentPageParams } from "@/features/department/department.types";
import { useQuery } from "@tanstack/react-query";

export function useDepartmentsPage(params: DepartmentPageParams, enabled = true) {
	return useQuery({
		queryKey: ["departments", "page", params],
		queryFn: () => departmentService.getPage(params),
		enabled,
	});
}
