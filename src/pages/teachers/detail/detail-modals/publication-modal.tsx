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

type PublicationFormData = {
	name: string;
	description: string;
	researcher: string;
	university: string;
	year: string;
	level: "YUQORI" | "O'RTA" | "BOSHLANG'ICH" | "";
	status: "JARAYONDA" | "TUGALLANGAN" | "";
	pdf: File | null;
};

export function PublicationModal() {
	const isOpen = useModalIsOpen();
	const editData = useModalEditData();
	const { close } = useModalActions();

	const visible = isOpen && editData?._type === "nazorat";
	const isEdit = visible && !!editData?.id;

	const { register, handleSubmit, control, reset } = useForm<PublicationFormData>({
		defaultValues: {
			name: "",
			description: "",
			researcher: "",
			university: "",
			year: "",
			level: "",
			status: "",
			pdf: null,
		},
	});

	useEffect(() => {
		if (visible && isEdit) {
			reset({
				name: editData.name ?? "",
				description: editData.description ?? "",
				researcher: editData.researcher ?? "",
				university: editData.university ?? "",
				year: editData.year ?? "",
				level: editData.level ?? "",
				status: editData.status ?? "",
				pdf: null,
			});
		} else if (visible && !isEdit) {
			reset({ name: "", description: "", researcher: "", university: "", year: "", level: "", status: "", pdf: null });
		}
	}, [visible, isEdit, editData, reset]);

	const handleClose = () => {
		reset();
		close();
	};
	const onSubmit = (_data: PublicationFormData) => {
		handleClose();
	};

	return (
		<Modal open={visible} onClose={handleClose} title={isEdit ? "Nazoratni tahrirlash" : "Nazorat qo'shish"}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="n-name">Nazorat nomi</Label>
					<Input id="n-name" placeholder="Nazorat nomini kiriting..." {...register("name")} />
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="n-desc">Tavsif</Label>
					<Textarea
						id="n-desc"
						placeholder="Nazorat haqida qisqacha..."
						className="min-h-[80px] resize-none"
						{...register("description")}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="n-researcher">Tadqiqotchi</Label>
						<Input id="n-researcher" placeholder="F.I.Sh..." {...register("researcher")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="n-university">Universitet</Label>
						<Input id="n-university" placeholder="Tashkilot nomi..." {...register("university")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="n-year">Yil</Label>
						<Input id="n-year" type="number" placeholder="2024" {...register("year")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label>Daraja</Label>
						<Controller
							name="level"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="YUQORI">YUQORI</SelectItem>
										<SelectItem value="O'RTA">O'RTA</SelectItem>
										<SelectItem value="BOSHLANG'ICH">BOSHLANG'ICH</SelectItem>
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
