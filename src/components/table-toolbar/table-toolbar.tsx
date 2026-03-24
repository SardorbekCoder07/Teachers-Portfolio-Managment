import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Plus, Search } from "lucide-react";

type TableToolbarProps = {
	/** Jami yozuvlar soni — "Fakultetlar soni: 7" */
	count?: number;
	/** "Fakultetlar soni" kabi label */
	countLabel?: string;
	/** Qidiruv input qiymati */
	searchValue: string;
	/** Qidiruv o'zgarganda chaqiriladi */
	onSearchChange: (value: string) => void;
	/** "Qo'shish" tugmasi bosilganda */
	onAdd?: () => void;
	/** Tugma matni, default: "Qo'shish" */
	addLabel?: string;
	/** Qidiruv inputini ko'rsatish, default: true */
	showSearch?: boolean;
};

export function TableToolbar({
	count,
	countLabel,
	searchValue,
	onSearchChange,
	onAdd,
	addLabel = "Qo'shish",
	showSearch = true,
}: TableToolbarProps) {
	return (
		<div className="flex flex-col sm:flex-row  items-start sm:items-center justify-between gap-3">
			{/* Chap: soni */}
			{countLabel !== undefined && (
				<div className="flex items-center gap-2">
					<span className="text-[14px] font-semibold text-foreground">{countLabel}:</span>
					<span className="bg-primary/10 text-primary text-[13px] font-bold px-2.5 py-0.5 rounded-full">
						{count ?? 0}
					</span>
				</div>
			)}

			{/* O'ng: search + add */}
			<div className="flex items-center gap-2 w-full sm:w-auto">
				{showSearch && (
					<div className="relative flex-1 sm:w-64">
						<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
						<Input
							placeholder="Qidirish..."
							value={searchValue}
							onChange={(e) => onSearchChange(e.target.value)}
							className="pl-8 h-9"
						/>
					</div>
				)}

				{onAdd && (
					<Button onClick={onAdd} size="sm" className="h-9 gap-1.5 shrink-0">
						<Plus className="size-4" />
						{addLabel}
					</Button>
				)}
			</div>
		</div>
	);
}
