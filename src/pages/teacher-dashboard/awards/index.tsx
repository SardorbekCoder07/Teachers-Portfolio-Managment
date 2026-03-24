import { useState } from "react";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions } from "@/store/modalStore";
import { MukofotModal } from "@/pages/teachers/detail/detail-modals/mukofot-modal";
import { MukofotlarTab } from "@/pages/teachers/detail/detail-tabs/mukofotlar-tab";
import type { Mukofot } from "@/pages/teachers/detail/detail-tabs/mukofotlar-tab";

// TODO: Replace with useQuery hook
const data: Mukofot[] = [];

export default function TeacherAwards() {
	const { open } = useModalActions();
	const [search, setSearch] = useState("");

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Mukofotlar"
				count={data.length}
				searchValue={search}
				onSearchChange={setSearch}
				addLabel="Mukofot qo'shish"
				onAdd={() => open({ _type: "mukofot" })}
			/>
			<div className="rounded-xl border bg-card overflow-x-auto">
				<div className="p-3 sm:p-5">
					<MukofotlarTab data={data} />
				</div>
			</div>
			<MukofotModal />
		</div>
	);
}
