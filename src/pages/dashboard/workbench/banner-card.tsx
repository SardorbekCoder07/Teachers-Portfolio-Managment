import bgImg from "@/assets/images/background/banner-1.png";
import { GLOBAL_CONFIG } from "@/global-config";
import { Text, Title } from "@/ui/typography";
import type { CSSProperties } from "react";

export default function BannerCard() {
	const bgStyle: CSSProperties = {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundImage: `url("${bgImg}")`,
		backgroundSize: "100%",
		backgroundPosition: "50%",
		backgroundRepeat: "no-repeat",
		opacity: 0.5,
	};
	return (
		<div className="relative bg-primary/90">
			<div className="p-6 z-2 relative">
				<div className="flex flex-col gap-4 max-w-lg">
					<Title as="h2" className="text-white">
						Welcome to {GLOBAL_CONFIG.appName}
					</Title>
					<Text className="text-white opacity-80">
						Manage your system efficiently. Use the navigation to access users, roles, and permissions.
					</Text>
				</div>
			</div>
			<div style={bgStyle} className="z-1" />
		</div>
	);
}
