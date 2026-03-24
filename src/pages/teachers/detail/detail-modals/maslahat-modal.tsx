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

type MaslahatFormData = {
	id?: number;
	name: string;
	description: string;
	year: string;
	head: string;
	subscribe: "HA" | "YO'Q";
	level: "XALQARO" | "MAHALLIY";
	status: "JARAYONDA" | "TUGALLANGAN";
	pdf: File | null;
};

export function MaslahatModal() {
	const isOpen = useModalIsOpen();
	const editData = useModalEditData();
	const { close } = useModalActions();

	const visible = isOpen && editData?._type === "maslahat";
	const isEdit = visible && !!editData?.id;

	const { register, handleSubmit, control, reset } = useForm<MaslahatFormData>({
		defaultValues: {
			name: "",
			description: "",
			year: "",
			head: "",
			level: "MAHALLIY",
			status: "JARAYONDA",
			subscribe: "HA",
			pdf: null,
		},
	});

	useEffect(() => {
		if (visible && isEdit) {
			reset({
				name: editData.name || "",
				description: editData.description || "",
				year: editData.year || "",
				head: editData.head || "",
				level: editData.level || "MAHALLIY",
				status: editData.status || "JARAYONDA",
				subscribe: editData.subscribe || "HA",
				pdf: null,
			});
		} else if (visible && !isEdit) {
			reset({
				name: "",
				description: "",
				year: "",
				head: "",
				level: "MAHALLIY",
				status: "JARAYONDA",
				subscribe: "HA",
				pdf: null,
			});
		}
	}, [visible, isEdit, editData, reset]);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = (data: MaslahatFormData) => {
		console.log("Form Data:", data);
		handleClose();
	};

	return (
		<Modal open={visible} onClose={handleClose} title={isEdit ? "Maslahatni tahrirlash" : "Maslahat qo'shish"}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="m-name">Maslahat nomi</Label>
					<Input id="m-name" placeholder="Nomni kiriting..." {...register("name")} />
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="m-desc">Qisqa tavsif</Label>
					<Textarea
						id="m-desc"
						placeholder="Tavsif..."
						className="min-h-[80px] resize-none"
						{...register("description")}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="m-year">Yil</Label>
						<Input id="m-year" type="number" placeholder="2024" {...register("year")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="m-head">Rahbar</Label>
						<Input id="m-head" placeholder="Rahbar ismi..." {...register("head")} />
					</div>

					<div className="flex flex-col gap-2">
						<Label>A'zolik</Label>
						<Controller
							name="subscribe"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="HA">Ha</SelectItem>
										<SelectItem value="YO'Q">Yo'q</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Holat</Label>
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Tanlang" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="JARAYONDA">Jarayonda</SelectItem>
										<SelectItem value="TUGALLANGAN">Tugallangan</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
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
									<SelectItem value="MAHALLIY">Mahalliy</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<Label>PDF yuklash</Label>
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
