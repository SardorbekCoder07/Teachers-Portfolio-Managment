import { useState } from "react";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions } from "@/store/modalStore";
import { PublicationModal } from "@/pages/teachers/detail/detail-modals/publication-modal";
import { NashrModal } from "@/pages/teachers/detail/detail-modals/nashr-modal";
import { PublicationsTab } from "@/pages/teachers/detail/detail-tabs/publications-tab";
import { NashrlarTab } from "@/pages/teachers/detail/detail-tabs/nashrlar-tab";
import type { Publication } from "@/pages/teachers/detail/detail-tabs/publications-tab";
import type { Nashr } from "@/pages/teachers/detail/detail-tabs/nashrlar-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { cn } from "@/utils";
import { BookText, Users } from "lucide-react";

// TODO: Replace with useQuery hooks
const nazoratlar: Publication[] = [];
const nashrlar: Nashr[] = [];

export default function TeacherPublications() {
	const { open } = useModalActions();
	const [activeTab, setActiveTab] = useState("nazoratlar");

	const counts: Record<string, number> = {
		nazoratlar: nazoratlar.length,
		nashrlar: nashrlar.length,
	};

	const addLabels: Record<string, string> = {
		nazoratlar: "Nazorat qo'shish",
		nashrlar: "Nashr qo'shish",
	};

	const modalTypes: Record<string, string> = {
		nazoratlar: "nazorat",
		nashrlar: "nashr",
	};

	const countLabels: Record<string, string> = {
		nazoratlar: "Nazoratlar",
		nashrlar: "Nashrlar",
	};

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel={countLabels[activeTab]}
				count={counts[activeTab]}
				searchValue=""
				onSearchChange={() => {}}
				showSearch={false}
				addLabel={addLabels[activeTab]}
				onAdd={() => open({ _type: modalTypes[activeTab] })}
			/>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="gap-0 w-full rounded-xl border bg-card overflow-hidden"
			>
				<div className="border-b overflow-x-auto">
					<TabsList className="bg-transparent h-auto p-0 rounded-none gap-0 w-max sm:w-full justify-start">
						{[
							{ value: "nazoratlar", label: "Nazoratlar", icon: <BookText className="size-3.5" /> },
							{ value: "nashrlar", label: "Nashrlar", icon: <Users className="size-3.5" /> },
						].map((tab) => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								className={cn(
									"rounded-none border-0 border-b-2 border-transparent px-3 sm:px-4 py-2.5 text-[12px] sm:text-[13px] gap-1.5 h-auto whitespace-nowrap",
									"data-[state=active]:border-primary data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent",
									"data-[state=active]:text-primary data-[state=active]:shadow-none",
								)}
							>
								{tab.icon}
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
				</div>

				<div className="px-3 sm:px-5">
					<TabsContent value="nazoratlar">
						<div className="py-4 overflow-x-auto">
							<PublicationsTab data={nazoratlar} />
						</div>
					</TabsContent>
					<TabsContent value="nashrlar">
						<div className="py-4 overflow-x-auto">
							<NashrlarTab data={nashrlar} />
						</div>
					</TabsContent>
				</div>
			</Tabs>

			<PublicationModal />
			<NashrModal />
		</div>
	);
}
