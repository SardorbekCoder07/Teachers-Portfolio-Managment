import { useState } from "react";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions } from "@/store/modalStore";
import { MaslahatModal } from "@/pages/teachers/detail/detail-modals/maslahat-modal";
import { MaslahatTab } from "@/pages/teachers/detail/detail-tabs/maslahat-tab";
import type { Maslahat } from "@/pages/teachers/detail/detail-tabs/maslahat-tab";

// TODO: Replace with useQuery hook
const data: Maslahat[] = [];

export default function TeacherConsultations() {
	const { open } = useModalActions();
	const [search, setSearch] = useState("");

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Maslahatlar"
				count={data.length}
				searchValue={search}
				onSearchChange={setSearch}
				addLabel="Maslahat qo'shish"
				onAdd={() => open({ _type: "maslahat" })}
			/>
			<div className="rounded-xl border bg-card overflow-x-auto">
				<div className="p-3 sm:p-5">
					<MaslahatTab data={data} />
				</div>
			</div>
			<MaslahatModal />
		</div>
	);
}
