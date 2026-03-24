import { positionService } from "@/features/position/position.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeletePosition() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => positionService.delete(id),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["positions"] });
			toast.success("Lavozim muvaffaqiyatli o'chirildi", { position: "bottom-right" });
		},

		onError: (error: { message: string }) => {
			toast.error(error.message || "Lavozim o'chirishda xatolik");
		},
	});
}
