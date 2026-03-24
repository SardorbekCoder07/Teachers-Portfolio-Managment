import { positionService } from "@/features/position/position.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdatePosition() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, name }: { id: number; name: string }) =>
			positionService.update(id, { name }),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["positions"] });
			toast.success("Lavozim muvaffaqiyatli tahrirlandi", { position: "bottom-right" });
		},

		onError: (error: { message: string }) => {
			toast.error(error.message || "Lavozim tahrirlashda xatolik");
		},
	});
}
