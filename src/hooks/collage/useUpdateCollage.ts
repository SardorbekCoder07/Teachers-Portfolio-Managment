import { collageService } from "@/features/collage/collage.service";
import { fileService } from "@/features/file/file.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateCollageInput {
	id: number;
	name: string;
	image: File | null;
}

export function useUpdateCollage() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: UpdateCollageInput) => {
			let imgUrl: string | undefined;

			if (input.image) {
				imgUrl = await fileService.uploadImage(input.image);
			}

			return collageService.update(input.id, {
				name: input.name,
				...(imgUrl ? { imgUrl } : {}),
			});
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["collages"] });
			toast.success("Fakultet muvaffaqiyatli tahrirlandi", { position: "bottom-right" });
		},

		onError: (error: { message: string }) => {
			toast.error(error.message || "Fakultet tahrirlashda xatolik");
		},
	});
}
