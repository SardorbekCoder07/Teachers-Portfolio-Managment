import { collageService } from "@/features/collage/collage.service";
import type { CollagePageParams } from "@/features/collage/collage.types";
import { useQuery } from "@tanstack/react-query";

export function useCollagesPage(params: CollagePageParams, enabled = true) {
	return useQuery({
		queryKey: ["collages", "page", params],
		queryFn: () => collageService.getPage(params),
		enabled,
	});
}
