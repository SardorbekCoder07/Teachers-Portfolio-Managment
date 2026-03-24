import { teacherService } from "@/features/teacher/teacher.service";
import type { TeacherSearchParams } from "@/features/teacher/teacher.types";
import { useQuery } from "@tanstack/react-query";

export function useTeachersSearch(params: TeacherSearchParams) {
	return useQuery({
		queryKey: ["teachers", "search", params],
		queryFn: () => teacherService.search(params),
	});
}
