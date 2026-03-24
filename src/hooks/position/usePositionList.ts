import { positionService } from "@/features/position/position.service";
import { useQuery } from "@tanstack/react-query";

export function usePositionList() {
	return useQuery({
		queryKey: ["positions"],
		queryFn: () => positionService.getList(),
	});
}
