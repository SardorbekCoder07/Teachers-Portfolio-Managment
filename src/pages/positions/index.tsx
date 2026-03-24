import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { Modal } from "@/components/modal/modal";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useCreatePosition } from "@/hooks/position/useCreatePosition";
import { useDeletePosition } from "@/hooks/position/useDeletePosition";
import { usePositionList } from "@/hooks/position/usePositionList";
import { usePositionStats } from "@/hooks/position/usePositionStats";
import { useUpdatePosition } from "@/hooks/position/useUpdatePosition";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { BriefcaseBusiness, Pencil, Trash2, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { Position } from "@/features/position/position.types";

type PositionFormValues = {
	name: string;
};

export default function Positions() {
	const [search, setSearch] = useState("");
	const isOpen = useModalIsOpen();
	const editData = useModalEditData() as Position | null;
	const { open, close } = useModalActions();
	const isEdit = editData !== null;

	const { data: positionsData } = usePositionList();
	const { data: statsData } = usePositionStats();

	const positions = positionsData?.data ?? [];

	const statsMap = useMemo(() => {
		const map: Record<string, number> = {};
		for (const s of statsData?.data?.data ?? []) {
			map[s.name] = s.totalEmployees;
		}
		return map;
	}, [statsData]);

	const createPosition = useCreatePosition();
	const updatePosition = useUpdatePosition();
	const deletePosition = useDeletePosition();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PositionFormValues>({
		defaultValues: { name: "" },
	});

	useEffect(() => {
		if (editData) {
			reset({ name: editData.name });
		}
	}, [editData, reset]);

	const filtered = useMemo(
		() => positions.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
		[positions, search],
	);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = (values: PositionFormValues) => {
		if (isEdit) {
			updatePosition.mutate({ id: editData.id, name: values.name }, { onSuccess: handleClose });
		} else {
			createPosition.mutate({ name: values.name }, { onSuccess: handleClose });
		}
	};

	const isPending = createPosition.isPending || updatePosition.isPending;

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Lavozimlar soni"
				count={statsData?.data?.total ?? positions.length}
				searchValue={search}
				onSearchChange={setSearch}
				onAdd={() => open()}
				addLabel="Lavozim qo'shish"
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{filtered.length ? (
					filtered.map((position) => {
						const count = statsMap[position.name] ?? 0;
						return (
							<div key={position.id} className="group rounded-xl border bg-card overflow-hidden flex flex-col transition-shadow hover:shadow-md">
								{/* Top accent bar */}
								<div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />

								<div className="p-5 flex flex-col gap-4">
									{/* Icon + name */}
									<div className="flex items-start justify-between gap-3">
										<div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0">
											<BriefcaseBusiness className="size-5 text-blue-600 dark:text-blue-400" />
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-[14px] font-semibold leading-snug truncate">{position.name}</p>
										</div>
									</div>

									{/* Employee count */}
									<div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
										<Users className="size-3.5 text-muted-foreground shrink-0" />
										<span className="text-[12px] text-muted-foreground">Xodimlar:</span>
										<span className="text-[13px] font-semibold ml-auto">{count}</span>
									</div>

									{/* Actions */}
									<div className="flex items-center gap-2">
										<button
											type="button"
											onClick={() => open(position)}
											className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-950/60 text-[12px] font-semibold px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
										>
											<Pencil className="size-3" />
											Tahrirlash
										</button>
										<ConfirmPopover message="Bu lavozimni o'chirib tashlaysizmi? Bu amalni ortga qaytarib bo'lmaydi." onConfirm={() => deletePosition.mutate(position.id)}>
											<button
												type="button"
												className="flex-1 inline-flex items-center justify-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/60 text-[12px] font-semibold px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
											>
												<Trash2 className="size-3" />
												O'chirish
											</button>
										</ConfirmPopover>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<p className="col-span-full text-center text-muted-foreground py-10 text-[14px]">Ma'lumot topilmadi.</p>
				)}
			</div>

			<Modal open={isOpen} onClose={handleClose} title={isEdit ? "Lavozim tahrirlash" : "Lavozim qo'shish"}>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-2">
					<div className="flex flex-col gap-2">
						<Label htmlFor="position-name">Lavozim nomi</Label>
						<Input
							id="position-name"
							placeholder="Masalan: Professor"
							{...register("name", { required: "Lavozim nomi kiritilishi shart" })}
						/>
						{errors.name && <span className="text-[12px] text-red-500">{errors.name.message}</span>}
					</div>

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={handleClose}>
							Bekor qilish
						</Button>
						<Button type="submit" disabled={isPending}>
							{isEdit ? "Saqlash" : "Qo'shish"}
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
}
