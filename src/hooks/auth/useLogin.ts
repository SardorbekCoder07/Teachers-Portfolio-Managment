// src/hooks/auth/useLogin.ts

import { authService } from "@/features/auth/api/auth.service";
import type { LoginDTO } from "@/features/auth/api/auth.types";
import type { UserInfo } from "@/types/entity";
import { useUserActions } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useLogin() {
	const navigate = useNavigate();
	const { setUserToken, setUserInfo } = useUserActions();

	return useMutation({
		mutationFn: (data: LoginDTO) => authService.login(data),

		onSuccess: (response) => {
			if (!response.success) {
				toast.error("Raqam yoki parol noto'g'ri", { position: "top-center" });
				return;
			}

			const role = response.message;

			setUserToken({ accessToken: response.data });
			setUserInfo({ roles: [{ code: role }] } as UserInfo);
			toast.success("Tizimga muvaffaqiyatli kirdingiz!");

			if (role === "ROLE_ADMIN") {
				navigate("/dashboard", { replace: true });
			} else if (role === "ROLE_TEACHER") {
				navigate("/teacher-dashboard", { replace: true });
			} else {
				navigate("/dashboard", { replace: true });
			}
		},

		onError: () => {
			toast.error("Raqam yoki parol noto'g'ri", { position: "top-center" });
		},
	});
}
