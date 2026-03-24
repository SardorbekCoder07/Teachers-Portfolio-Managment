import { userService } from "@/features/user/user.service";
import { UserProfile } from "@/features/user/user.types";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
	return useQuery({
		queryKey: ["user", "me"],
		queryFn: async (): Promise<UserProfile> => {
			const response = await userService.getMe();

			// Backend'dan 20 ta field keladi, biz faqat 3 tasini olamiz
			return {
				fullName: response.data.fullName,
				phone: response.data.phone,
				imageUrl: response.data.imageUrl,
			};
		},
	});
}
