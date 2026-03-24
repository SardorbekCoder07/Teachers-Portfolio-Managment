import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { SearchableSelect } from "@/components/searchable-select/searchable-select";
import type { TeacherItem } from "@/features/teacher/teacher.types";
import { useDepartmentList } from "@/hooks/department/useDepartmentList";
import { usePositionList } from "@/hooks/position/usePositionList";
import { useDeleteTeacher } from "@/hooks/teacher/useDeleteTeacher";
import { useTeachersSearch } from "@/hooks/teacher/useTeachersSearch";
import { useTeacherSheetActions } from "@/store/teacherSheetStore";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { TeacherSheet } from "./teacher-sheet";

function createColumns(
	onEdit: (row: TeacherItem) => void,
	onDelete: (row: TeacherItem) => void,
	page: number,
): ColumnDef<TeacherItem>[] {
	return [
		{
			id: "index",
			header: "#",
			cell: ({ row }) => (
				<span className="text-muted-foreground">{page * 10 + row.index + 1}</span>
			),
		},
		{
			accessorKey: "fullName",
			header: "F.I.Sh.",
			cell: ({ row }) => {
				const name = row.getValue("fullName") as string;
				const imgUrl = row.original.imgUrl;
				return (
					<div className="flex items-center gap-2.5">
						{imgUrl ? (
							<img
								src={imgUrl}
								alt={name}
								className="w-8 h-8 rounded-full object-cover shrink-0"
							/>
						) : (
							<div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-[13px] shrink-0">
								{name.charAt(0).toUpperCase()}
							</div>
						)}
						<span className="font-medium text-[13px]">{name}</span>
					</div>
				);
			},
		},
		{
			accessorKey: "phoneNumber",
			header: "Telefon",
			cell: ({ row }) => {
				const phone = row.getValue("phoneNumber") as string;
				const formatted = phone?.startsWith("+") ? phone : `+${phone}`;
				return <span className="text-muted-foreground text-[13px]">{formatted}</span>;
			},
		},
		{
			accessorKey: "departmentName",
			header: "Kafedra",
			cell: ({ row }) => (
				<span className="text-[13px]">{row.getValue("departmentName")}</span>
			),
		},
		{
			accessorKey: "lavozim",
			header: "Lavozim",
			cell: ({ row }) => (
				<span className="inline-flex items-center bg-blue-50 text-blue-700 text-[12px] font-medium px-2 py-0.5 rounded-full">
					{row.getValue("lavozim")}
				</span>
			),
		},
		{
			id: "actions",
			header: () => <div className="text-center">Amallar</div>,
			cell: ({ row }) => (
				<div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
					<button
						type="button"
						onClick={() => onEdit(row.original)}
						className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
					>
						<Pencil className="size-3" />
						Tahrirlash
					</button>
					<ConfirmPopover onConfirm={() => onDelete(row.original)}>
						<button
							type="button"
							className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
						>
							<Trash2 className="size-3" />
							O'chirish
						</button>
					</ConfirmPopover>
				</div>
			),
		},
	];
}

export default function Teachers() {
	const { open } = useTeacherSheetActions();
	const navigate = useNavigate();
	const { mutate: deleteTeacher } = useDeleteTeacher();
	const [searchParams, setSearchParams] = useSearchParams();

	// URL dan boshlang'ich qiymatlarni o'qish
	const [nameInput, setNameInput] = useState(searchParams.get("name") ?? "");

	const department = searchParams.get("department") ?? "";
	const lavozim = searchParams.get("lavozim") ?? "";
	const page = Number(searchParams.get("page") ?? "0");

	// Name uchun debounce — 400ms kutadi
	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchParams((prev) => {
				const next = new URLSearchParams(prev);
				if (nameInput) {
					next.set("name", nameInput);
				} else {
					next.delete("name");
				}
				next.set("page", "0");
				return next;
			});
		}, 400);
		return () => clearTimeout(timer);
	}, [nameInput]);

	const { data: departmentListData } = useDepartmentList();
	const { data: positionListData } = usePositionList();

	const departmentOptions = useMemo(
		() =>
			(departmentListData?.data ?? []).map((d) => ({
				value: d.name,
				label: d.name,
			})),
		[departmentListData],
	);

	const lavozimOptions = useMemo(
		() =>
			(positionListData?.data ?? []).map((p) => ({
				value: p.name,
				label: p.name,
			})),
		[positionListData],
	);

	const { data, isLoading } = useTeachersSearch({
		name: searchParams.get("name") ?? undefined,
		department: department || undefined,
		lavozim: lavozim || undefined,
		page,
		size: 10,
	});

	const teachers = data?.data?.body ?? [];
	const totalElements = data?.data?.totalElements ?? 0;

	const hasActiveFilters = !!(searchParams.get("name") || department || lavozim);

	const handleDepartmentChange = (value: string) => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (value) next.set("department", value);
			else next.delete("department");
			next.set("page", "0");
			return next;
		});
	};

	const handleLavozimChange = (value: string) => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (value) next.set("lavozim", value);
			else next.delete("lavozim");
			next.set("page", "0");
			return next;
		});
	};

	const handleClearFilters = () => {
		setNameInput("");
		setSearchParams({});
	};

	const columns = useMemo(
		() =>
			createColumns(
				(row) => open(row),
				(row) => deleteTeacher(row.id),
				page,
			),
		[open, deleteTeacher, page],
	);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-[14px] font-semibold text-foreground">O'qituvchilar soni:</span>
					<span className="bg-primary/10 text-primary text-[13px] font-bold px-2.5 py-0.5 rounded-full">
						{totalElements}
					</span>
				</div>
				<Button size="sm" className="h-9 gap-1.5" onClick={() => open()}>
					<Plus className="size-4" />
					O'qituvchi qo'shish
				</Button>
			</div>

			{/* Filterlar */}
			<div className="flex items-center gap-3 flex-wrap">
				<div className="relative flex-1 min-w-[200px]">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
					<Input
						placeholder="Ism bo'yicha qidirish..."
						value={nameInput}
						onChange={(e) => setNameInput(e.target.value)}
						className="pl-8 h-9 text-[13px]"
					/>
				</div>

				<div className="w-56">
					<SearchableSelect
						options={departmentOptions}
						value={department}
						onChange={handleDepartmentChange}
						placeholder="Kafedra bo'yicha"
						searchPlaceholder="Kafedra qidirish..."
						clearable
					/>
				</div>

				<div className="w-48">
					<SearchableSelect
						options={lavozimOptions}
						value={lavozim}
						onChange={handleLavozimChange}
						placeholder="Lavozim bo'yicha"
						searchPlaceholder="Lavozim qidirish..."
						clearable
					/>
				</div>

				{hasActiveFilters && (
					<Button
						variant="ghost"
						size="sm"
						className="h-9 gap-1.5 text-muted-foreground hover:text-foreground"
						onClick={handleClearFilters}
					>
						<X className="size-3.5" />
						Tozalash
					</Button>
				)}
			</div>

			<DataTable
				columns={columns}
				data={teachers}
				isLoading={isLoading}
				page={page}
				totalPage={data?.data?.totalPage}
				onPageChange={(p) =>
					setSearchParams((prev) => {
						const next = new URLSearchParams(prev);
						next.set("page", String(p));
						return next;
					})
				}
				onRowClick={(row) => navigate(`/teachers/${row.id}`, { state: { teacher: row } })}
			/>

			<TeacherSheet />
		</div>
	);
}
