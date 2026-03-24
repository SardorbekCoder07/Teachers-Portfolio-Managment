import { departmentService } from "@/features/department/department.service";
import { useQuery } from "@tanstack/react-query";

export function useDepartmentList() {
	return useQuery({
		queryKey: ["departments", "list"],
		queryFn: () => departmentService.getList(),
	});
}
