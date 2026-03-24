import { positionService } from "@/features/position/position.service";
import { useQuery } from "@tanstack/react-query";

export function usePositionStats() {
	return useQuery({
		queryKey: ["positions", "stats"],
		queryFn: () => positionService.getStats(),
	});
}
