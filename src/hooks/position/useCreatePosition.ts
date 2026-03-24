import { positionService } from "@/features/position/position.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreatePosition() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { name: string }) => positionService.create(data),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["positions"] });
			toast.success("Lavozim muvaffaqiyatli qo'shildi", { position: "bottom-right" });
		},

		onError: (error: { message: string }) => {
			toast.error(error.message || "Lavozim qo'shishda xatolik");
		},
	});
}
