import { cn } from "@/utils";
import { Award, ChevronRight, FileText, FlaskConical, TrendingUp, Users } from "lucide-react";
import type { TeacherDetail } from "./types";

// ─── StatsCard ─────────────────────────────────────────────────────────────────
type StatsCardProps = {
	icon: React.ReactNode;
	label: string;
	value: number;
	sub: string;
	accent: string;
};

function StatsCard({ icon, label, value, sub, accent }: StatsCardProps) {
	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-xl border bg-card p-4 flex flex-col gap-3",
				"hover:shadow-md transition-shadow duration-200",
			)}
		>
			<div className={cn("absolute top-0 left-0 right-0 h-0.5", accent)} />
			<div className="flex items-center justify-between">
				<div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-muted flex items-center justify-center">
					<div className="text-muted-foreground">{icon}</div>
				</div>
				<ChevronRight className="size-4 text-muted-foreground opacity-40" />
			</div>
			<div>
				<p className="text-xl sm:text-2xl font-bold tracking-tight">{value}</p>
				<p className="text-[11px] sm:text-[12px] text-muted-foreground font-medium">{label}</p>
			</div>
			<p className="text-[11px] text-muted-foreground border-t pt-2 truncate">{sub}</p>
		</div>
	);
}

// ─── StatsGrid ─────────────────────────────────────────────────────────────────
type StatsGridProps = {
	stats: TeacherDetail["stats"];
	subStats: TeacherDetail["subStats"];
};

export function StatsGrid({ stats, subStats }: StatsGridProps) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
			<StatsCard
				icon={<FlaskConical className="size-4" />}
				label="Tadqiqotlar"
				value={stats.researches}
				sub={`${subStats.international} xalqaro loyiha`}
				accent="bg-blue-500"
			/>
			<StatsCard
				icon={<FileText className="size-4" />}
				label="Nashrlar"
				value={stats.publications}
				sub={`${subStats.articles} maqola · ${subStats.books} kitob`}
				accent="bg-emerald-500"
			/>
			<StatsCard
				icon={<Users className="size-4" />}
				label="Talabalar"
				value={stats.students}
				sub={`${subStats.supervised} magistrant rahbarlik`}
				accent="bg-violet-500"
			/>
			<StatsCard
				icon={<TrendingUp className="size-4" />}
				label="Faoliyat"
				value={stats.activities}
				sub={`${subStats.conferences} konferensiya`}
				accent="bg-amber-500"
			/>
			<StatsCard
				icon={<Award className="size-4" />}
				label="Mukofotlar"
				value={stats.awards}
				sub="Respublika va xalqaro"
				accent="bg-rose-500"
			/>
		</div>
	);
}
