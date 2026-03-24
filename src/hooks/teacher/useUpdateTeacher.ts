import { fileService } from "@/features/file/file.service";
import { teacherService } from "@/features/teacher/teacher.service";
import type { TeacherItem } from "@/features/teacher/teacher.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface UpdateTeacherInput {
	existingTeacher: TeacherItem;
	fullName: string;
	phoneNumber: string;
	lavozmId: number;
	departmentId: number;
	gender: boolean;
	image: File | null;
}

export function useUpdateTeacher() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: UpdateTeacherInput) => {
			const imageUrl = input.image
				? await fileService.uploadImage(input.image)
				: input.existingTeacher.imgUrl;

			return teacherService.update({
				id: input.existingTeacher.id,
				fullName: input.fullName,
				phoneNumber: input.phoneNumber,
				email: input.existingTeacher.email ?? "",
				biography: "",
				input: input.existingTeacher.input ?? "",
				age: input.existingTeacher.age,
				orcId: "",
				scopusId: "",
				scienceId: "",
				researcherId: "",
				gender: input.gender,
				imageUrl,
				fileUrl: "",
				profession: input.existingTeacher.profession ?? "",
				lavozmId: input.lavozmId,
				departmentId: input.departmentId,
			});
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["teachers"] });
			toast.success("O'qituvchi muvaffaqiyatli tahrirlandi", { position: "bottom-right" });
		},

		onError: (error: { message: string }) => {
			toast.error(error.message || "Tahrirlashda xatolik", { position: "bottom-right" });
		},
	});
}
