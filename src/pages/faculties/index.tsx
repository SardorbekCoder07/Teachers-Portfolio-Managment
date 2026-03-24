import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { useCollagesPage } from "@/hooks/collage/useCollagesPage";
import { useCreateCollage } from "@/hooks/collage/useCreateCollage";
import { useUpdateCollage } from "@/hooks/collage/useUpdateCollage";
import { useDeleteCollage } from "@/hooks/collage/useDeleteCollage";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import type { CollagePageParams } from "@/features/collage/collage.types";
import { Controller, useForm } from "react-hook-form";
import type { Collage } from "@/features/collage/collage.types";

type FacultyFormValues = {
	name: string;
	image: File | null;
};

function createColumns(
	onEdit: (row: Collage) => void,
	onDelete: (row: Collage) => void,
	page: number,
): ColumnDef<Collage>[] {
	return [
		{
			accessorKey: "id",
			header: "#",
			cell: ({ row }) => (
				<span className="text-muted-foreground">{page * 10 + row.index + 1}</span>
			),
		},
		{
			accessorKey: "imgUrl",
			header: "Rasm",
			cell: ({ row }) => {
				const imgUrl = row.original.imgUrl;
				return imgUrl ? (
					<img
						src={imgUrl}
						alt={row.original.name}
						className="w-9 h-9 rounded-full object-cover"
					/>
				) : (
					<div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-[13px]">
						{row.original.name.charAt(0).toUpperCase()}
					</div>
				);
			},
		},
		{
			accessorKey: "name",
			header: "Fakultet",
			cell: ({ row }) => (
				<span className="font-medium">{row.getValue("name")}</span>
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
					<ConfirmPopover message="Bu fakultetni o'chirib tashlaysizmi? Bu amalni ortga qaytarib bo'lmaydi." onConfirm={() => onDelete(row.original)}>
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

export default function Faculties() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get("page") ?? 0);
	const search = searchParams.get("name") ?? "";

	const [inputValue, setInputValue] = useState(search);
	const [baseIsEmpty, setBaseIsEmpty] = useState(false);

	useEffect(() => {
		setInputValue(search);
	}, [search]);

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
	const editData = useModalEditData() as Collage | null;
	const { open, close } = useModalActions();
	const isEdit = editData !== null;

	const params: CollagePageParams = { page, size: 10, name: search || undefined };
	const queryEnabled = !search || !baseIsEmpty;
	const { data: collagesResponse, isLoading } = useCollagesPage(params, queryEnabled);

	useEffect(() => {
		if (!search && collagesResponse !== undefined) {
			setBaseIsEmpty((collagesResponse?.data?.totalElements ?? 0) === 0);
		}
	}, [search, collagesResponse]);
	const { mutate: createCollage, isPending: isCreating } = useCreateCollage();
	const { mutate: updateCollage, isPending: isUpdating } = useUpdateCollage();
	const { mutate: deleteCollage } = useDeleteCollage();
	const isPending = isCreating || isUpdating;

	const collages = collagesResponse?.data?.body ?? [];
	const totalElements = collagesResponse?.data?.totalElements ?? 0;
	const totalPage = collagesResponse?.data?.totalPage ?? 1;

	const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FacultyFormValues>({
		defaultValues: { name: "", image: null },
	});

	useEffect(() => {
		if (editData) {
			reset({ name: editData.name, image: null });
		}
	}, [editData, reset]);

	const filtered = useMemo(() => collages, [collages]);

	const columns = useMemo(
		() => createColumns(
			(row) => open(row),
			(row) => deleteCollage(row.id),
			page,
		),
		[open, page],
	);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = (values: FacultyFormValues) => {
		if (isEdit) {
			updateCollage(
				{ id: editData.id, name: values.name, image: values.image },
				{ onSuccess: handleClose },
			);
			return;
		}

		if (!values.image) return;

		createCollage(
			{ name: values.name, image: values.image },
			{ onSuccess: handleClose },
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Fakultetlar soni"
				count={totalElements}
				searchValue={inputValue}
				onSearchChange={setInputValue}
				onAdd={() => open()}
				addLabel="Fakultet qo'shish"
			/>

			<DataTable
				columns={columns}
				data={filtered}
				isLoading={isLoading}
				page={page}
				totalPage={totalPage}
				onPageChange={setPage}
			/>

			<Modal
				open={isOpen}
				onClose={handleClose}
				title={isEdit ? "Fakultet tahrirlash" : "Fakultet qo'shish"}
			>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-2">
					<div className="flex flex-col gap-2">
						<Label>Rasm</Label>
						<Controller
							name="image"
							control={control}
							rules={{ required: isEdit ? false : "Rasm tanlanishi shart" }}
							render={({ field }) => (
								<FileInput type="image" value={field.value} onChange={field.onChange} previewUrl={editData?.imgUrl ?? undefined} />
							)}
						/>
						{errors.image && (
							<span className="text-[12px] text-red-500">{errors.image.message}</span>
						)}
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="faculty-name">Fakultet nomi</Label>
						<Input
							id="faculty-name"
							placeholder="Masalan: Davolash fakulteti"
							{...register("name", { required: "Fakultet nomi kiritilishi shart" })}
						/>
						{errors.name && (
							<span className="text-[12px] text-red-500">{errors.name.message}</span>
						)}
					</div>

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
							Bekor qilish
						</Button>
						<Button type="submit" disabled={isPending}>
							{isPending ? "Yuklanmoqda..." : isEdit ? "Saqlash" : "Qo'shish"}
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
}
