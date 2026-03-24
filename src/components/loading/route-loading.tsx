import { Progress } from "@/ui/progress";
import { useIsFetching } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function RouteLoadingProgress() {
	const [progress, setProgress] = useState(0);
	const isFetching = useIsFetching();

	useEffect(() => {
		let interval: NodeJS.Timeout;
		let timer: NodeJS.Timeout;

		if (isFetching > 0) {
			setProgress(0);
			let currentProgress = 0;

			interval = setInterval(() => {
				currentProgress += 2;
				if (currentProgress < 90) {
					setProgress(currentProgress);
				}
			}, 20);
		} else {
			setProgress(100);
			timer = setTimeout(() => setProgress(0), 300);
		}

		return () => {
			clearInterval(interval);
			clearTimeout(timer);
		};
	}, [isFetching]);

	return progress > 0 ? (
		<div className="fixed top-0 left-0 right-0 z-tooltip w-screen">
			<Progress value={progress} className="h-[3px] shadow-2xl" />
		</div>
	) : null;
}
