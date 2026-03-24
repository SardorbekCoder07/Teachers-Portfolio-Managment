import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { SearchableSelect } from "@/components/searchable-select/searchable-select";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
// QOSHILDI: useDepartmentsPage hook — API dan kafedralar ro'yxatini oladi
import { useDepartmentsPage } from "@/hooks/department/useDepartmentsPage";
// QOSHILDI: useCreateDepartment — yangi kafedra yaratish uchun
import { useCreateDepartment } from "@/hooks/department/useCreateDepartment";
// QOSHILDI: useUpdateDepartment — kafedrani tahrirlash uchun
import { useUpdateDepartment } from "@/hooks/department/useUpdateDepartment";
// QOSHILDI: useDeleteDepartment — kafedrani o'chirish uchun
import { useDeleteDepartment } from "@/hooks/department/useDeleteDepartment";
// QOSHILDI: useCollages — fakultetlar ro'yxatini select uchun oladi
import { useCollages } from "@/hooks/collage/useCollages";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
// QOSHILDI: useSearchParams — search va page ni URL da saqlash uchun
import { useSearchParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
// YANGILANDI: lokal Department tipi o'chirildi, department.types.ts dan import qilindi
import type { Department, DepartmentPageParams } from "@/features/department/department.types";

type DepartmentFormValues = {
	name: string;
	// YANGILANDI: facultyId → collegeId (backend nomi shu)
	collegeId: string;
	image: File | null;
};


function createColumns(
	onEdit: (row: Department) => void,
	onDelete: (row: Department) => void,
	// QOSHILDI: page parametri — to'g'ri tartib raqami hisoblash uchun
	page: number,
): ColumnDef<Department>[] {
	return [
		{
			accessorKey: "id",
			header: "#",
			// YANGILANDI: page * 10 + row.index + 1 — sahifaga qarab to'g'ri raqam
			cell: ({ row }) => (
				<span className="text-muted-foreground">{page * 10 + row.index + 1}</span>
			),
		},
		{
			accessorKey: "imgUrl",
			header: "Rasm",
			// YANGILANDI: rasm bor bo'lsa ko'rsatadi, yo'q bo'lsa birinchi harf
			cell: ({ row }) => {
				const imgUrl = row.original.imgUrl;
				return imgUrl ? (
					<img
						src={imgUrl}
						alt={row.original.name}
						className="w-9 h-9 rounded-full object-cover"
					/>
				) : (
					<div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-[13px]">
						{row.original.name.charAt(0).toUpperCase()}
					</div>
				);
			},
		},
		{
			accessorKey: "name",
			header: "Kafedra",
			cell: ({ row }) => (
				<span className="font-medium">{row.getValue("name")}</span>
			),
		},
		{
			// YANGILANDI: faculty → collegeName (backend dan keladi)
			accessorKey: "collegeName",
			header: "Fakulteti",
			cell: ({ row }) => (
				<span className="text-muted-foreground text-[13px]">{row.getValue("collegeName")}</span>
			),
		},
		{
			id: "actions",
			header: () => <div className="text-center">Amallar</div>,
			cell: ({ row }) => (
				<div className="flex items-center justify-center gap-2">
					<button
						type="button"
						onClick={() => onEdit(row.original)}
						className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
					>
						<Pencil className="size-3" />
						Tahrirlash
					</button>
					<ConfirmPopover message="Bu kafedrаni o'chirib tashlaysizmi? Bu amalni ortga qaytarib bo'lmaydi." onConfirm={() => onDelete(row.original)}>
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

export default function Departments() {
	// YANGILANDI: lokal search state o'chirildi → URL dan olinadi
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get("page") ?? 0);
	const search = searchParams.get("name") ?? "";

	// QOSHILDI: inputValue — foydalanuvchi kiritayotgan qiymat (UI uchun)
	const [inputValue, setInputValue] = useState(search);
	// QOSHILDI: baseIsEmpty — bo'sh bo'lsa search paytida API ga so'rov ketmaydi
	const [baseIsEmpty, setBaseIsEmpty] = useState(false);

	// QOSHILDI: URL dagi search o'zgarganda input ham yangilanadi (back button uchun)
	useEffect(() => {
		setInputValue(search);
	}, [search]);

	// QOSHILDI: 400ms debounce — har harfda API ga so'rov ketmaydi
	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchParams((prev) => {
				const next = new URLSearchParams(prev);
				if (inputValue) {
					next.set("name", inputValue);
				} else {
					next.delete("name");
				}
				next.set("page", "0");
				return next;
			}, { replace: true });
		}, 400);
		return () => clearTimeout(timer);
	}, [inputValue]);

	const setPage = (newPage: number) => {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			next.set("page", String(newPage));
			return next;
		});
	};

	const isOpen = useModalIsOpen();
	const editData = useModalEditData() as Department | null;
	const { open, close } = useModalActions();
	const isEdit = editData !== null;

	// YANGILANDI: statik DEPARTMENTS o'chirildi → hook orqali API dan olinadi
		const params: DepartmentPageParams = { page, size: 10, name: search || undefined };
		const queryEnabled = !search || !baseIsEmpty;
		const { data: departmentsResponse, isLoading } = useDepartmentsPage(params, queryEnabled);
	// QOSHILDI: useCreateDepartment va useCollages
	const { mutate: createDepartment, isPending: isCreating } = useCreateDepartment();
	const { mutate: updateDepartment, isPending: isUpdating } = useUpdateDepartment();
	const { mutate: deleteDepartment } = useDeleteDepartment();
	const isPending = isCreating || isUpdating;
	const { data: collagesResponse } = useCollages();
	const collegeOptions = (collagesResponse?.data ?? []).map((c) => ({
		value: String(c.id),
		label: c.name,
	}));

	// QOSHILDI: base so'rov bo'sh qaytsa, keyingi searchlarda API ga so'rov ketmaydi
	useEffect(() => {
		if (!search && departmentsResponse !== undefined) {
			setBaseIsEmpty((departmentsResponse?.data?.totalElements ?? 0) === 0);
		}
	}, [search, departmentsResponse]);

	const departments = departmentsResponse?.data?.body ?? [];
	const totalElements = departmentsResponse?.data?.totalElements ?? 0;
	const totalPage = departmentsResponse?.data?.totalPage ?? 1;

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<DepartmentFormValues>({
		// YANGILANDI: facultyId → collegeId
		defaultValues: { name: "", collegeId: "", image: null },
	});

	useEffect(() => {
		if (editData) {
			// YANGILANDI: collegeId ni String ga o'giradi (select string qiymat kutadi)
			reset({ name: editData.name, collegeId: String(editData.collegeId), image: null });
		}
	}, [editData, reset]);

	const columns = useMemo(
		() => createColumns(
			(row) => open(row),
			// YANGILANDI: console.log o'chirildi → haqiqiy API call
			(row) => deleteDepartment(row.id),
			// QOSHILDI: page uzatildi — to'g'ri raqamlash uchun
			page,
		),
		[open, page],
	);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = (values: DepartmentFormValues) => {
		if (isEdit) {
			// YANGILANDI: console.log o'chirildi → haqiqiy API call
			updateDepartment(
				{ id: editData.id, name: values.name, image: values.image, collegeId: Number(values.collegeId) },
				{ onSuccess: handleClose },
			);
			return;
		}

		// YANGILANDI: console.log o'chirildi → haqiqiy API call
		if (!values.image) return;
		createDepartment(
			{ name: values.name, image: values.image, collegeId: Number(values.collegeId) },
			{ onSuccess: handleClose },
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Kafedralar soni"
				// YANGILANDI: DEPARTMENTS.length → totalElements (API dan keladi)
				count={totalElements}
				// YANGILANDI: search → inputValue (debounce uchun)
				searchValue={inputValue}
				onSearchChange={setInputValue}
				onAdd={() => open()}
				addLabel="Kafedra qo'shish"
			/>

			<DataTable
				columns={columns}
				// YANGILANDI: filtered → departments (API dan keladi)
				data={departments}
				// QOSHILDI: isLoading, page, totalPage, onPageChange
				isLoading={isLoading}
				page={page}
				totalPage={totalPage}
				onPageChange={setPage}
			/>

			<Modal open={isOpen} onClose={handleClose} title={isEdit ? "Kafedra tahrirlash" : "Kafedra qo'shish"}>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-2">
					<div className="flex flex-col gap-2">
						<Label>Rasm</Label>
						<Controller
							name="image"
							control={control}
							render={({ field }) => (
								<FileInput
									type="image"
									value={field.value}
									onChange={field.onChange}
									// QOSHILDI: previewUrl — edit paytida mavjud rasm ko'rinadi
									previewUrl={editData?.imgUrl ?? undefined}
								/>
							)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Fakultet</Label>
						<Controller
							// YANGILANDI: facultyId → collegeId
							name="collegeId"
							control={control}
							rules={{ required: "Fakultet tanlanishi shart" }}
							render={({ field }) => (
								<SearchableSelect
									// YANGILANDI: COLLEGES → collegeOptions (API dan keladi)
									options={collegeOptions}
									value={field.value}
									onChange={field.onChange}
									placeholder="Fakultetni tanlang"
									searchPlaceholder="Fakultet qidirish..."
								/>
							)}
						/>
						{errors.collegeId && (
							<span className="text-[12px] text-red-500">{errors.collegeId.message}</span>
						)}
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="dept-name">Kafedra nomi</Label>
						<Input
							id="dept-name"
							placeholder="Masalan: Jarrohlik kafedrasi"
							{...register("name", { required: "Kafedra nomi kiritilishi shart" })}
						/>
						{errors.name && (
							<span className="text-[12px] text-red-500">{errors.name.message}</span>
						)}
					</div>

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>Bekor qilish</Button>
						{/* YANGILANDI: isPending holati qo'shildi */}
						<Button type="submit" disabled={isPending}>
							{isPending ? "Yuklanmoqda..." : isEdit ? "Saqlash" : "Qo'shish"}
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
}
