import { Chart } from "@/components/chart/chart";
import { useChart } from "@/components/chart/useChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Title } from "@/ui/typography";

// TODO: Replace with useQuery hooks
const lavozimData = {
	categories: [] as string[],
	series: [{ name: "Soni", data: [] as number[] }],
};

const jinsData = {
	labels: [] as string[],
	series: [] as number[],
	colors: ["#2563eb", "#ec4899"],
};

const yoshData = {
	categories: [] as string[],
	series: [{ name: "O'qituvchilar", data: [] as number[] }],
};

const ilmiyData = {
	labels: [] as string[],
	series: [] as number[],
	colors: ["#f59e0b", "#6366f1", "#10b981"],
};

export default function Analysis() {
	const lavozimChart = useChart({
		xaxis: { categories: lavozimData.categories },
		yaxis: { tickAmount: 4 },
		colors: ["#6366f1"],
	});

	const jinsChart = useChart({
		labels: jinsData.labels,
		colors: jinsData.colors,
		stroke: { show: false },
		legend: { show: false },
		tooltip: { fillSeriesColor: false },
		plotOptions: { pie: { donut: { size: "65%" } } },
	});

	const yoshChart = useChart({
		xaxis: { categories: yoshData.categories },
		yaxis: { tickAmount: 4 },
		colors: ["#10b981"],
	});

	const ilmiyChart = useChart({
		labels: ilmiyData.labels,
		colors: ilmiyData.colors,
		stroke: { show: false },
		legend: { show: false },
		tooltip: { fillSeriesColor: false },
		plotOptions: { pie: { donut: { size: "65%" } } },
	});

	return (
		<div className="flex flex-col gap-4">
			{/* Header */}
			<div>
				<Title as="h4" className="text-xl mb-1">
					O'qituvchilar Analitikasi
				</Title>
				<span className="text-[13px] text-muted-foreground">
					Lavozim, jins, yosh va ilmiy darajalar bo'yicha taqsimot
				</span>
			</div>

			{/* Row 1: Lavozim taqsimoti + Jins taqsimoti */}
			<div className="grid grid-cols-12 gap-4">
				<Card className="col-span-12 lg:col-span-7">
					<CardHeader>
						<CardTitle>
							<span className="text-[14px] font-semibold">Lavozim taqsimoti</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Chart
							type="bar"
							height={280}
							options={lavozimChart}
							series={lavozimData.series}
						/>
					</CardContent>
				</Card>

				<Card className="col-span-12 lg:col-span-5">
					<CardHeader>
						<CardTitle>
							<span className="text-[14px] font-semibold">Jins taqsimoti</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col items-center gap-4">
						<Chart
							type="donut"
							height={220}
							options={jinsChart}
							series={jinsData.series}
						/>
						<div className="flex gap-6">
							{jinsData.labels.map((label, i) => (
								<div key={label} className="flex items-center gap-2">
									<span
										className="w-3 h-3 rounded-full inline-block"
										style={{ backgroundColor: jinsData.colors[i] }}
									/>
									<span className="text-[12px] text-muted-foreground">{label}</span>
									<span className="text-[13px] font-bold">{jinsData.series[i]}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Row 2: Yosh taqsimoti + Ilmiy darajalar */}
			<div className="grid grid-cols-12 gap-4">
				<Card className="col-span-12 lg:col-span-7">
					<CardHeader>
						<CardTitle>
							<span className="text-[14px] font-semibold">Yosh taqsimoti</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Chart
							type="bar"
							height={280}
							options={yoshChart}
							series={yoshData.series}
						/>
					</CardContent>
				</Card>

				<Card className="col-span-12 lg:col-span-5">
					<CardHeader>
						<CardTitle>
							<span className="text-[14px] font-semibold">Ilmiy darajalar</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col items-center gap-4">
						<Chart
							type="donut"
							height={220}
							options={ilmiyChart}
							series={ilmiyData.series}
						/>
						<div className="flex flex-col gap-2 w-full px-2">
							{ilmiyData.labels.map((label, i) => (
								<div key={label} className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span
											className="w-3 h-3 rounded-full inline-block"
											style={{ backgroundColor: ilmiyData.colors[i] }}
										/>
										<span className="text-[12px] text-muted-foreground">{label}</span>
									</div>
									<span className="text-[13px] font-bold">{ilmiyData.series[i]}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
