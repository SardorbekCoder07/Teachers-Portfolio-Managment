import { departmentService } from "@/features/department/department.service";
import { fileService } from "@/features/file/file.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateDepartmentInput {
	id: number;
	name: string;
	image: File | null;
	collegeId: number;
}

export function useUpdateDepartment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: UpdateDepartmentInput) => {
			let imgUrl: string | undefined;

			if (input.image) {
				imgUrl = await fileService.uploadImage(input.image);
			}

			return departmentService.update(input.id, {
				name: input.name,
				collegeId: input.collegeId,
				...(imgUrl ? { imgUrl } : {}),
			});
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["departments"] });
			toast.success("Kafedra muvaffaqiyatli tahrirlandi", { position: "bottom-right" });
		},

		onError: (error: { message: string }) => {
			toast.error(error.message || "Kafedra tahrirlashda xatolik");
		},
	});
}