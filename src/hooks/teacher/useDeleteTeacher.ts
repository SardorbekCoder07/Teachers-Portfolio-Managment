import { teacherService } from "@/features/teacher/teacher.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteTeacher() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userId: number) => teacherService.delete(userId),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["teachers"] });
			queryClient.invalidateQueries({ queryKey: ["positions", "stats"] });
			toast.success("O'qituvchi muvaffaqiyatli o'chirildi", { position: "bottom-right" });
		},

		onError: (error: { message: string }) => {
			toast.error(error.message || "O'chirishda xatolik", { position: "bottom-right" });
		},
	});
}
