export type TimelineType = "research" | "publication" | "award" | "activity";
export type StatusType = "Faol" | "Senior" | "PhD";

export type TeacherDetail = {
	degree: string;
	bio: string;
	status: StatusType;
	researchScore: number;
	stats: {
		researches: number;
		publications: number;
		students: number;
		activities: number;
		awards: number;
	};
	subStats: {
		articles: number;
		books: number;
		conferences: number;
		supervised: number;
		international: number;
	};
	timeline: { date: string; text: string; type: TimelineType }[];
};

export const STATUS_STYLES: Record<StatusType, string> = {
	Faol: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800",
	Senior: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
	PhD: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-400 dark:border-violet-800",
};
