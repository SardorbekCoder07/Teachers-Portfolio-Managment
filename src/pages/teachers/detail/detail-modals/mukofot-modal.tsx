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

type MukofotFormData = {
	id?: number;
	name: string;
	organization: string;
	year: string;
	level: "XALQARO" | "RESPUBLIKA" | "MAHALLIY";
	category: "ILMIY" | "PEDAGOGIK" | "IJTIMOIY";
	description: string;
	pdf: File | null;
};

export function MukofotModal() {
	const isOpen = useModalIsOpen();
	const editData = useModalEditData();
	const { close } = useModalActions();

	const visible = isOpen && editData?._type === "mukofot";
	const isEdit = visible && !!editData?.id;

	const { register, handleSubmit, control, reset } = useForm<MukofotFormData>({
		defaultValues: {
			name: "",
			organization: "",
			year: "",
			level: "RESPUBLIKA",
			category: "ILMIY",
			description: "",
			pdf: null,
		},
	});

	useEffect(() => {
		if (visible && isEdit) {
			reset({
				name: editData.name || "",
				organization: editData.organization || "",
				year: editData.year || "",
				level: editData.level || "RESPUBLIKA",
				category: editData.category || "ILMIY",
				description: editData.description || "",
				pdf: null,
			});
		} else if (visible && !isEdit) {
			reset({
				name: "",
				organization: "",
				year: "",
				level: "RESPUBLIKA",
				category: "ILMIY",
				description: "",
				pdf: null,
			});
		}
	}, [visible, isEdit, editData, reset]);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = (data: MukofotFormData) => {
		console.log("Form Data:", data);
		handleClose();
	};

	return (
		<Modal open={visible} onClose={handleClose} title={isEdit ? "Mukofotni tahrirlash" : "Mukofot qo'shish"}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="mk-name">Mukofot nomi</Label>
					<Input id="mk-name" placeholder="Nomni kiriting..." {...register("name")} />
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="mk-org">Beruvchi tashkilot</Label>
					<Input id="mk-org" placeholder="Tashkilot nomi..." {...register("organization")} />
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="mk-year">Yil</Label>
						<Input id="mk-year" type="number" placeholder="2024" {...register("year")} />
					</div>

					<div className="flex flex-col gap-2">
						<Label>Daraja</Label>
						<Controller
							name="level"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="XALQARO">Xalqaro</SelectItem>
										<SelectItem value="RESPUBLIKA">Respublika</SelectItem>
										<SelectItem value="MAHALLIY">Mahalliy</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>

					<div className="flex flex-col gap-2 col-span-2">
						<Label>Kategoriya</Label>
						<Controller
							name="category"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="ILMIY">Ilmiy</SelectItem>
										<SelectItem value="PEDAGOGIK">Pedagogik</SelectItem>
										<SelectItem value="IJTIMOIY">Ijtimoiy</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="mk-desc">Tavsif</Label>
					<Textarea
						id="mk-desc"
						placeholder="Mukofot haqida qisqacha..."
						className="min-h-[80px] resize-none"
						{...register("description")}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label>Sertifikat (PDF)</Label>
					<Controller
						name="pdf"
						control={control}
						render={({ field }) => (
							<FileInput type="document" accept=".pdf" value={field.value} onChange={field.onChange} />
						)}
					/>
				</div>

				<div className="flex items-center justify-end gap-2 pt-2">
					<Button type="button" variant="outline" onClick={handleClose}>
						Bekor qilish
					</Button>
					<Button type="submit">Saqlash</Button>
				</div>
			</form>
		</Modal>
	);
}
