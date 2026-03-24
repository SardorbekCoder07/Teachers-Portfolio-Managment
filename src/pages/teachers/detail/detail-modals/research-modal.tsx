import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type ResearchFormData = {
	name: string;
	description: string;
	year: string;
	organization: string;
	membershipType: "MILLIY" | "XALQARO" | "";
	status: "JARAYONDA" | "TUGALLANGAN" | "";
	pdf: File | null;
};

export function ResearchModal() {
	const isOpen = useModalIsOpen();
	const editData = useModalEditData();
	const { close } = useModalActions();

	const visible = isOpen && editData?._type === "research";
	const isEdit = visible && !!editData?.id;

	const { register, handleSubmit, control, reset } = useForm<ResearchFormData>({
		defaultValues: { name: "", description: "", year: "", organization: "", membershipType: "", status: "", pdf: null },
	});

	useEffect(() => {
		if (visible && isEdit) {
			reset({
				name: editData.name ?? "",
				description: editData.description ?? "",
				year: editData.year ?? "",
				organization: editData.organization ?? "",
				membershipType: editData.membershipType ?? "",
				status: editData.status ?? "",
				pdf: null,
			});
		} else if (visible && !isEdit) {
			reset({ name: "", description: "", year: "", organization: "", membershipType: "", status: "", pdf: null });
		}
	}, [visible, isEdit, editData, reset]);

	const handleClose = () => {
		reset();
		close();
	};
	const onSubmit = (_data: ResearchFormData) => {
		handleClose();
	};

	return (
		<Modal open={visible} onClose={handleClose} title={isEdit ? "Tadqiqotni tahrirlash" : "Tadqiqot qo'shish"}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="r-name">Tadqiqot nomi</Label>
					<Input id="r-name" placeholder="Tadqiqot nomini kiriting..." {...register("name")} />
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="r-desc">Qisqa tavsif</Label>
					<Textarea
						id="r-desc"
						placeholder="Tadqiqot haqida qisqacha..."
						className="min-h-[80px] resize-none"
						{...register("description")}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="r-year">Yil</Label>
						<Input id="r-year" type="number" placeholder="2024" {...register("year")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="r-org">Universitet / Tashkilot</Label>
						<Input id="r-org" placeholder="Tashkilot nomi..." {...register("organization")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label>A'zolik turi</Label>
						<Controller
							name="membershipType"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="MILLIY">MILLIY</SelectItem>
										<SelectItem value="XALQARO">XALQARO</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>Holati</Label>
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="JARAYONDA">JARAYONDA</SelectItem>
										<SelectItem value="TUGALLANGAN">TUGALLANGAN</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<Label>
						PDF yuklash <span className="text-muted-foreground font-normal">(ixtiyoriy)</span>
					</Label>
					<Controller
						name="pdf"
						control={control}
						render={({ field }) => (
							<FileInput type="document" accept=".pdf" value={field.value} onChange={field.onChange} />
						)}
					/>
				</div>
				<div className="flex items-center justify-end gap-2 pt-1">
					<Button type="button" variant="outline" onClick={handleClose}>
						Bekor qilish
					</Button>
					<Button type="submit">Saqlash</Button>
				</div>
			</form>
		</Modal>
	);
}
