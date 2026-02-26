import { Chart } from "@/components/chart/chart";
import { useChart } from "@/components/chart/useChart";
import Icon from "@/components/icon/icon";
import { Button } from "@/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Progress } from "@/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Text, Title } from "@/ui/typography";
import { cn } from "@/utils";
import { useState } from "react";

const timeOptions = [
	{ label: "Day", value: "day" },
	{ label: "Week", value: "week" },
	{ label: "Month", value: "month" },
];

// TODO: Replace with real API data
const webAnalytic = {
	pageViews: 0,
	pageViewsChange: 0,
	avgTime: "—",
	avgTimeChange: 0,
	chart: { series: [] as any[], categories: [] as string[] },
};
const visitor = { value: 0, change: 0, tip: "vs last period" };
const conversionRate = { value: 0, change: 0, tip: "vs last period" };
const adCampaign = { value: 0, change: 0, tip: "vs last period" };
const topPages: { url: string; views: number; viewsChange: number; unique: number; uniqueChange: number }[] = [];
const sessionDevices: { label: string; value: number; color: string; icon: string }[] = [];
const topChannels: { name: string; percent: number; total: number; icon: string }[] = [];
const trafficData: { source: string; visits: number; unique: number; bounce: number; duration: string; progress: number }[] = [];

function Trend({ value }: { value: number }) {
	const trendClass = value > 0 ? "text-success" : value < 0 ? "text-error" : "text-muted-foreground";
	return (
		<span className={cn(trendClass, "flex items-center gap-1 font-bold")}>
			{value > 0 ? (
				<Icon icon="mdi:arrow-up" className="inline-block align-middle" size={16} />
			) : value < 0 ? (
				<Icon icon="mdi:arrow-down" className="inline-block align-middle" size={16} />
			) : null}
			{Math.abs(value)}%
		</span>
	);
}

export default function Analysis() {
	const [timeType, setTimeType] = useState<"day" | "week" | "month">("day");

	const chartOptions = useChart({
		xaxis: { categories: webAnalytic.chart.categories },
	});

	const deviceChartOptions = useChart({
		labels: sessionDevices.map((d) => d.label),
		stroke: { show: false },
		legend: { show: false },
		tooltip: { fillSeriesColor: false },
		plotOptions: { pie: { donut: { size: "60%" } } },
	});

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-none shadow-none">
				<div>
					<Title as="h4" className="text-xl mb-1">
						Analysis overview
					</Title>
					<Text variant="body2" className="text-muted-foreground">
						Explore the metrics to understand trends and drive.
					</Text>
				</div>
				<div className="flex items-center gap-2">
					<Text variant="body2" className="text-muted-foreground">
						Show by:
					</Text>
					<Select value={timeType} onValueChange={(v) => setTimeType(v as any)}>
						<SelectTrigger className="w-32 h-9">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{timeOptions.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="flex flex-col xl:grid grid-cols-4 gap-4">
				<Card className="col-span-4 xl:col-span-3">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h3" className="text-lg">
								Web analytic
							</Title>
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-2">
						<div className="flex flex-wrap gap-6 items-center">
							<div>
								<Text variant="subTitle2" className="text-muted-foreground">
									Page views
								</Text>
								<div className="flex items-end gap-2">
									<Title as="h3" className="text-2xl">
										{webAnalytic.pageViews.toLocaleString()}
									</Title>
									<Trend value={webAnalytic.pageViewsChange} />
								</div>
							</div>
							<div>
								<Text variant="subTitle2" className="text-muted-foreground">
									Avg. Time on page
								</Text>
								<div className="flex items-end gap-2">
									<Title as="h3" className="text-2xl">
										{webAnalytic.avgTime}
									</Title>
									<Trend value={webAnalytic.avgTimeChange} />
								</div>
							</div>
						</div>
						<div className="w-full min-h-[200px] mt-2">
							<Chart type="line" height={320} options={chartOptions} series={webAnalytic.chart.series} />
						</div>
					</CardContent>
				</Card>

				<div className="xl:col-span-1 h-full">
					<div className="flex flex-col xl:flex-col md:flex-row gap-4 h-full">
						<Card className="flex-1">
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle>
									<Text variant="subTitle2">Visitor</Text>
								</CardTitle>
								<CardAction className="rounded-full bg-orange-200 p-2 w-10 h-10 flex items-center justify-center">
									<Icon icon="mdi:users" size={20} color="black" />
								</CardAction>
							</CardHeader>
							<CardContent>
								<Title as="h3" className="text-xl">
									{visitor.value.toLocaleString()}
								</Title>
								<div className="flex flex-row gap-2 items-center">
									<Trend value={visitor.change} />
									<Text variant="caption" className="text-muted-foreground flex items-center">
										{visitor.tip}
									</Text>
								</div>
							</CardContent>
						</Card>
						<Card className="flex-1">
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle>
									<Text variant="subTitle2">Conversion rate</Text>
								</CardTitle>
								<CardAction className="rounded-full bg-emerald-200 p-2 w-10 h-10 flex items-center justify-center">
									<Icon icon="ph:seal-percent-fill" size={20} color="black" />
								</CardAction>
							</CardHeader>
							<CardContent>
								<Title as="h3" className="text-xl">
									{conversionRate.value}%
								</Title>
								<div className="flex flex-row gap-2 items-center">
									<Trend value={conversionRate.change} />
									<Text variant="caption" className="text-muted-foreground flex items-center">
										{conversionRate.tip}
									</Text>
								</div>
							</CardContent>
						</Card>
						<Card className="flex-1">
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle>
									<Text variant="subTitle2">Ad campaign clicks</Text>
								</CardTitle>
								<CardAction className="rounded-full bg-purple-200 p-2 w-10 h-10 flex items-center justify-center">
									<Icon icon="heroicons-solid:cursor-click" size={20} color="black" />
								</CardAction>
							</CardHeader>
							<CardContent>
								<Title as="h3" className="text-xl">
									{adCampaign.value.toLocaleString()}
								</Title>
								<div className="flex flex-row gap-2 items-center">
									<Trend value={adCampaign.change} />
									<Text variant="caption" className="text-muted-foreground flex items-center">
										{adCampaign.tip}
									</Text>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-12 gap-4">
				<Card className="col-span-12 md:col-span-6 xl:col-span-4">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h3" className="text-lg">
								Top pages
							</Title>
						</CardTitle>
						<CardAction>
							<Button size="sm" variant="outline">
								<Icon icon="mdi:download" className="mr-1" />
								Export data
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						{topPages.length === 0 ? (
							<div className="flex items-center justify-center h-24">
								<Text variant="body2" className="text-muted-foreground">
									No data available.
								</Text>
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										<tr>
											<th className="text-left py-1">PAGE URL</th>
											<th className="text-right py-1">VIEWS</th>
											<th className="text-right py-1">UNIQUE VISITORS</th>
										</tr>
									</thead>
									<tbody>
										{topPages.map((row) => (
											<tr key={row.url} className="border-t">
												<td className="py-2">{row.url}</td>
												<td className="py-2">
													<div className="flex items-center gap-2 justify-end">
														{row.views.toLocaleString()} <Trend value={row.viewsChange} />
													</div>
												</td>
												<td className="py-2">
													<div className="flex items-center gap-2 justify-end">
														{row.unique.toLocaleString()} <Trend value={row.uniqueChange} />
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</CardContent>
				</Card>

				<Card className="col-span-12 md:col-span-6 xl:col-span-4">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h3" className="text-lg">
								Session devices
							</Title>
						</CardTitle>
					</CardHeader>
					<CardContent>
						{sessionDevices.length === 0 ? (
							<div className="flex items-center justify-center h-24">
								<Text variant="body2" className="text-muted-foreground">
									No data available.
								</Text>
							</div>
						) : (
							<div className="flex flex-col items-center gap-2">
								<div className="w-full max-w-[180px]">
									<Chart
										type="donut"
										height={320}
										options={deviceChartOptions}
										series={sessionDevices.map((d) => d.value)}
									/>
								</div>
								<div className="flex justify-center gap-4 mt-2">
									{sessionDevices.map((d) => (
										<div key={d.label} className="flex flex-col items-center gap-1">
											<Icon icon={d.icon} size={20} color={d.color} />
											<Text variant="body2">{d.label}</Text>
											<Text variant="body2" className="font-bold">
												{d.value}%
											</Text>
										</div>
									))}
								</div>
							</div>
						)}
					</CardContent>
				</Card>

				<Card className="col-span-12 xl:col-span-4">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h3" className="text-lg">
								Top channel
							</Title>
						</CardTitle>
						<CardAction>
							<Button size="sm" variant="outline">
								<Icon icon="mdi:download" className="mr-1" />
								Export data
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						{topChannels.length === 0 ? (
							<div className="flex items-center justify-center h-24">
								<Text variant="body2" className="text-muted-foreground">
									No data available.
								</Text>
							</div>
						) : (
							<table className="w-full text-sm">
								<thead>
									<tr>
										<th className="text-left py-1">CHANNEL</th>
										<th className="text-right py-1">PERCENTAGE</th>
										<th className="text-right py-1">TOTAL</th>
									</tr>
								</thead>
								<tbody>
									{topChannels.map((row) => (
										<tr key={row.name} className="border-t">
											<td className="py-2 flex items-center gap-2">
												<Icon icon={row.icon} size={18} />
												{row.name}
											</td>
											<td className="py-2 text-right">{row.percent}%</td>
											<td className="py-2 text-right">{row.total.toLocaleString()}</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</CardContent>
				</Card>

				<Card className="col-span-12">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>
							<Title as="h3" className="text-lg">
								Traffic data
							</Title>
						</CardTitle>
						<CardAction>
							<Button size="sm" variant="outline">
								<Icon icon="mdi:download" className="mr-1" />
								Export data
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>
						{trafficData.length === 0 ? (
							<div className="flex items-center justify-center h-24">
								<Text variant="body2" className="text-muted-foreground">
									No data available.
								</Text>
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										<tr>
											<th className="text-left p-2">SOURCE</th>
											<th className="text-right p-2">VISITS</th>
											<th className="text-right p-2">UNIQUE VISITORS</th>
											<th className="text-right p-2">BOUNCE RATE</th>
											<th className="text-right p-2">AVG. SESSION DURATION</th>
											<th className="text-left p-2">PROGRESS TO GOAL (%)</th>
										</tr>
									</thead>
									<tbody>
										{trafficData.map((row) => (
											<tr key={row.source} className="border-t">
												<td className="p-2 font-mono">{row.source}</td>
												<td className="p-2 text-right">{row.visits.toLocaleString()}</td>
												<td className="p-2 text-right">{row.unique.toLocaleString()}</td>
												<td className="p-2 text-right">
													<div className="flex items-center gap-2 justify-end">
														<Trend value={row.bounce} />
													</div>
												</td>
												<td className="p-2 text-right">{row.duration}</td>
												<td className="p-2">
													<div className="flex items-center gap-2">
														<Progress value={row.progress} />
														<span className="text-xs ml-2 align-middle">{row.progress}%</span>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
