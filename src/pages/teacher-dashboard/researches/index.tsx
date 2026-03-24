import { useState } from "react";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions } from "@/store/modalStore";
import { ResearchModal } from "@/pages/teachers/detail/detail-modals/research-modal";
import { ResearchesTab } from "@/pages/teachers/detail/detail-tabs/researches-tab";
import type { Research } from "@/pages/teachers/detail/detail-tabs/researches-tab";

// TODO: Replace with useQuery hook
const data: Research[] = [];

export default function TeacherResearches() {
	const { open } = useModalActions();
	const [search, setSearch] = useState("");

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Tadqiqotlar"
				count={data.length}
				searchValue={search}
				onSearchChange={setSearch}
				addLabel="Tadqiqot qo'shish"
				onAdd={() => open({ _type: "research" })}
			/>
			<div className="rounded-xl border bg-card overflow-x-auto">
				<div className="p-3 sm:p-5">
					<ResearchesTab data={data} />
				</div>
			</div>
			<ResearchModal />
		</div>
	);
}
