import { ChevronRight, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions } from "@/store/modalStore";
import { Button } from "@/ui/button";
import type { TeacherItem } from "@/features/teacher/teacher.types";
import { ActivityTabs } from "./activity-tabs";
import { NashrModal } from "./detail-modals/nashr-modal";
import { PublicationModal } from "./detail-modals/publication-modal";
import { ResearchModal } from "./detail-modals/research-modal";
import { MaslahatModal } from "./detail-modals/maslahat-modal";
import { MukofotModal } from "./detail-modals/mukofot-modal";
import { StatsGrid } from "./stats-grid";
import type { ProfileFormData } from "./detail-profile/profile-edit";
import { ProfileForm } from "./detail-profile/profile-form";
import { ProfileSidebar } from "./detail-profile/profile-sidebar";

const ADD_LABELS: Record<string, string> = {
	researches: "Tadqiqot qo'shish",
	publications: "Nazorat qo'shish",
	supervision: "Nashr qo'shish",
	activities: "Maslahat qo'shish",
	awards: "Mukofot qo'shish",
};

const MODAL_TYPES: Record<string, string> = {
	researches: "research",
	publications: "nazorat",
	supervision: "nashr",
	activities: "maslahat",
	awards: "mukofot",
};

const COUNT_LABELS: Record<string, string> = {
	researches: "Tadqiqotlar",
	publications: "Nazoratlar",
	supervision: "Nashrlar",
	activities: "Maslahatlar",
	awards: "Mukofotlar",
};

export default function TeacherDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { open } = useModalActions();

	const teacher = (location.state as { teacher?: TeacherItem } | null)?.teacher ?? null;

	useEffect(() => {
		document.title = teacher ? `QDTU | ${teacher.fullName}` : "QDTU";
	}, [teacher]);

	const [activeTab, setActiveTab] = useState("researches");

	if (!teacher) {
		return (
			<div className="flex flex-col items-center justify-center h-64 gap-3">
				<GraduationCap className="size-10 text-muted-foreground" />
				<p className="text-muted-foreground text-sm">O'qituvchi topilmadi.</p>
				<Button variant="outline" size="sm" onClick={() => navigate("/teachers")}>
					Ro'yxatga qaytish
				</Button>
			</div>
		);
	}

	const profile: ProfileFormData = {
		fullName: teacher.fullName,
		email: teacher.email ?? "",
		age: teacher.age ? String(teacher.age) : "",
		phone: teacher.phoneNumber,
		department: teacher.departmentName,
		position: teacher.lavozim,
		bio: "",
		additionalInfo: "",
		specialty: teacher.profession ?? "",
		orcId: "",
		scopusId: "",
		scienceId: "",
		researcherId: "",
		image: null,
		resume: null,
	};

	return (
		<div className="flex flex-col gap-4 sm:gap-5">
			{/* Breadcrumb */}
			<div className="flex items-center gap-2 text-[13px] text-muted-foreground">
				<button type="button" onClick={() => navigate("/teachers")} className="hover:text-foreground transition-colors">
					O'qituvchilar
				</button>
				<ChevronRight className="size-3.5" />
				<span className="text-foreground font-medium truncate max-w-[160px] sm:max-w-[300px]">{teacher.fullName}</span>
			</div>

			<div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-start">
				<ProfileSidebar profile={profile} imgUrl={teacher.imgUrl} />
				<div className="w-full lg:flex-1 min-w-0">
					<ProfileForm defaultValues={profile} />
				</div>
			</div>

			<TableToolbar
				countLabel={COUNT_LABELS[activeTab]}
				count={0}
				searchValue=""
				onSearchChange={() => {}}
				showSearch={false}
				addLabel={ADD_LABELS[activeTab]}
				onAdd={MODAL_TYPES[activeTab] ? () => open({ _type: MODAL_TYPES[activeTab] }) : undefined}
			/>

			<ActivityTabs
				activeTab={activeTab}
				onTabChange={setActiveTab}
				researches={[]}
				publications={[]}
				nashrlar={[]}
				maslahatlar={[]}
				mukofotlar={[]}
			/>

			<StatsGrid
				stats={{ researches: 0, publications: 0, students: 0, activities: 0, awards: 0 }}
				subStats={{ articles: 0, books: 0, conferences: 0, supervised: 0, international: 0 }}
			/>

			<ResearchModal />
			<PublicationModal />
			<NashrModal />
			<MaslahatModal />
			<MukofotModal />
		</div>
	);
}
