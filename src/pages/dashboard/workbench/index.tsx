import { Card, CardContent } from "@/ui/card";
import { Text } from "@/ui/typography";
import BannerCard from "./banner-card";

// TODO: Replace placeholder cards with real API data

export default function Workbench() {
	return (
		<div className="flex flex-col gap-4 w-full">
			<BannerCard />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{[
					{ label: "Total Users" },
					{ label: "Active Sessions" },
					{ label: "Total Roles" },
					{ label: "Permissions" },
				].map((stat) => (
					<Card key={stat.label}>
						<CardContent className="flex flex-col gap-2 p-6">
							<Text variant="body2" className="font-semibold text-muted-foreground">
								{stat.label}
							</Text>
							<span className="text-2xl font-bold">—</span>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<Card>
					<CardContent className="p-6">
						<Text variant="body2" className="font-semibold mb-4">
							Recent Activity
						</Text>
						<div className="flex items-center justify-center h-32">
							<Text variant="body2" className="text-muted-foreground">
								No activity yet.
							</Text>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-6">
						<Text variant="body2" className="font-semibold mb-4">
							System Status
						</Text>
						<div className="flex items-center justify-center h-32">
							<Text variant="body2" className="text-muted-foreground">
								No data available.
							</Text>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
