import { fileService } from "@/features/file/file.service";
import { teacherService } from "@/features/teacher/teacher.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CreateTeacherInput {
	fullName: string;
	phoneNumber: string;
	image: File | null;
	lavozmId: number;
	gender: boolean;
	password: string;
	departmentId: number;
}

export function useCreateTeacher() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: CreateTeacherInput) => {
			const imgUrl = input.image
				? await fileService.uploadImage(input.image)
				: "";

			return teacherService.create({
				fullName: input.fullName,
				phoneNumber: input.phoneNumber,
				imgUrl,
				fileUrl: "",
				lavozmId: input.lavozmId,
				gender: input.gender,
				password: input.password,
				departmentId: input.departmentId,
			});
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["teachers"] });
			toast.success("O'qituvchi muvaffaqiyatli qo'shildi", { position: "bottom-right" });
		},

		onError: (error: { message: string }) => {
			toast.error(error.message || "O'qituvchi qo'shishda xatolik", { position: "bottom-right" });
		},
	});
}
