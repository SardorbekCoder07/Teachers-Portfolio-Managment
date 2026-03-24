import { collageService } from "@/features/collage/collage.service";
import { useQuery } from "@tanstack/react-query";

export function useCollages() {
	return useQuery({
		queryKey: ["collages"],
		queryFn: () => collageService.getAll(),
	});
}
