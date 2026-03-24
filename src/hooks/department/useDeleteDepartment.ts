import { departmentService } from "@/features/department/department.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteDepartment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => departmentService.delete(id),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["departments"] });
			toast.success("Kafedra muvaffaqiyatli o'chirildi", { position: "bottom-right" });
		},

		onError: (error: { message: string }) => {
			toast.error(error.message || "Kafedra o'chirishda xatolik");
		},
	});
}
