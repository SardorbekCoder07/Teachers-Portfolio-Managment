import { FileInput } from "@/components/file-input/file-input";
import { SearchableSelect } from "@/components/searchable-select/searchable-select";
import { useCreateTeacher } from "@/hooks/teacher/useCreateTeacher";
import { useUpdateTeacher } from "@/hooks/teacher/useUpdateTeacher";
import { useCollages } from "@/hooks/collage/useCollages";
import { useDepartmentList } from "@/hooks/department/useDepartmentList";
import { usePositionList } from "@/hooks/position/usePositionList";
import {
	useTeacherSheetActions,
	useTeacherSheetEditData,
	useTeacherSheetIsOpen,
} from "@/store/teacherSheetStore";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { ScrollArea } from "@/ui/scroll-area";
import { Separator } from "@/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/ui/sheet";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { extractPhoneDigits, formatPhone } from "@/utils/phone";
import type { TeacherFormValues } from "./data";

// ─── Component ────────────────────────────────────────────────────────────────

const GENDER_OPTIONS = [
	{ value: "true", label: "Erkak" },
	{ value: "false", label: "Ayol" },
];

export function TeacherSheet() {
	const isOpen = useTeacherSheetIsOpen();
	const editData = useTeacherSheetEditData();
	const { close } = useTeacherSheetActions();
	const isEdit = editData !== null;

	const { mutate: createTeacher, isPending: isCreating } = useCreateTeacher();
	const { mutate: updateTeacher, isPending: isUpdating } = useUpdateTeacher();
	const isPending = isCreating || isUpdating;

	const { data: collagesData } = useCollages();
	const { data: departmentListData } = useDepartmentList();
	const { data: positionListData } = usePositionList();

	const FACULTIES = useMemo(
		() =>
			(collagesData?.data ?? []).map((c) => ({
				value: String(c.id),
				label: c.name,
			})),
		[collagesData],
	);

	const DEPARTMENTS = useMemo(
		() =>
			(departmentListData?.data ?? []).map((d) => ({
				value: String(d.id),
				label: d.name,
				facultyId: String(d.collegeId),
			})),
		[departmentListData],
	);

	const POSITIONS = useMemo(
		() =>
			(positionListData?.data ?? []).map((p) => ({
				value: String(p.id),
				label: p.name,
			})),
		[positionListData],
	);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		control,
		watch,
		setValue,
		formState: { errors },
	} = useForm<TeacherFormValues>({
		defaultValues: {
			fullName: "",
			phone: "+998",
			facultyId: "",
			departmentId: "",
			positionId: "",
			gender: "true",
			image: null,
			password: "",
			confirmPassword: "",
		},
	});

	const watchedFacultyId = watch("facultyId");
	const watchedPassword = watch("password");

	useEffect(() => {
		if (!isOpen) return;

		if (!editData) {
			reset({
				fullName: "",
				phone: "+998",
				facultyId: "",
				departmentId: "",
				positionId: "",
				gender: "true",
				image: null,
				password: "",
				confirmPassword: "",
			});
			return;
		}

		// departmentName bo'yicha departmentni topamiz → collegeId ni olamiz
		const matchedDept = (departmentListData?.data ?? []).find(
			(d) => d.name.trim() === editData.departmentName.trim(),
		);
		const facultyId = matchedDept ? String(matchedDept.collegeId) : "";
		const departmentId = matchedDept ? String(matchedDept.id) : "";

		// lavozim nomi bo'yicha positionni topamiz
		const matchedPos = (positionListData?.data ?? []).find(
			(p) => p.name === editData.lavozim,
		);
		const positionId = matchedPos ? String(matchedPos.id) : "";

		// Telefon raqamni formatlash
		const digits = editData.phoneNumber.replace(/\D/g, "").replace(/^998/, "");
		const phone = digits.length > 0 ? formatPhone(digits) : "+998";

		reset({
			fullName: editData.fullName,
			phone,
			facultyId,
			departmentId,
			positionId,
			gender: editData.gender ? "true" : "false",
			image: null,
			password: "",
			confirmPassword: "",
		});
	}, [isOpen, editData, departmentListData, positionListData, reset]);

	const availableDepartments = useMemo(
		() =>
			watchedFacultyId
				? DEPARTMENTS.filter((d) => d.facultyId === watchedFacultyId)
				: [],
		[watchedFacultyId, DEPARTMENTS],
	);

	const handleFacultyChange = (value: string) => {
		setValue("facultyId", value);
		setValue("departmentId", "");
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const digits = extractPhoneDigits(e.target.value);
		setValue("phone", formatPhone(digits), { shouldValidate: true });
	};

	const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, currentValue: string) => {
		if (e.key === "Backspace") {
			e.preventDefault();
			const digits = extractPhoneDigits(currentValue);
			setValue(
				"phone",
				digits.length > 0 ? formatPhone(digits.slice(0, -1)) : "+998",
				{ shouldValidate: true },
			);
		}
	};

	const handleClose = () => {
		reset();
		setShowPassword(false);
		setShowConfirm(false);
		close();
	};

	const onSubmit = (values: TeacherFormValues) => {
		const phoneNumber = values.phone.replace(/\D/g, "");
		const lavozmId = Number(values.positionId);
		const departmentId = Number(values.departmentId);
		const gender = values.gender === "true";

		if (isEdit && editData) {
			updateTeacher(
				{
					existingTeacher: editData,
					fullName: values.fullName,
					phoneNumber,
					lavozmId,
					departmentId,
					gender,
					image: values.image,
				},
				{ onSuccess: handleClose },
			);
			return;
		}

		createTeacher(
			{
				fullName: values.fullName,
				phoneNumber,
				image: values.image,
				lavozmId,
				gender,
				password: values.password,
				departmentId,
			},
			{ onSuccess: handleClose },
		);
	};

	return (
		<Sheet open={isOpen} onOpenChange={(v) => !v && handleClose()}>
			<SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col gap-0">
				<SheetHeader className="px-6 py-4 border-b">
					<SheetTitle className="text-[16px]">
						{isEdit ? "O'qituvchini tahrirlash" : "O'qituvchi qo'shish"}
					</SheetTitle>
				</SheetHeader>

				<ScrollArea className="flex-1">
					<form
						id="teacher-form"
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-5 px-6 py-5"
					>
						{/* Rasm */}
						<div className="flex flex-col gap-2">
							<Label>
								Rasm{" "}
								<span className="text-muted-foreground font-normal">(ixtiyoriy)</span>
							</Label>
							<Controller
								name="image"
								control={control}
								render={({ field }) => (
									<FileInput type="image" value={field.value} onChange={field.onChange} />
								)}
							/>
						</div>

						<Separator />

						{/* To'liq F.I.Sh. */}
						<div className="flex flex-col gap-2">
							<Label htmlFor="fullName">To'liq F.I.Sh.</Label>
							<Input
								id="fullName"
								placeholder="Masalan: Aliyev Bobur Hamidovich"
								{...register("fullName", {
									required: "To'liq ism kiritilishi shart",
									minLength: { value: 5, message: "Kamida 5 ta belgi kiriting" },
								})}
							/>
							{errors.fullName && (
								<span className="text-[12px] text-red-500">{errors.fullName.message}</span>
							)}
						</div>

						{/* Telefon */}
						<div className="flex flex-col gap-2">
							<Label htmlFor="phone">Telefon raqam</Label>
							<Controller
								name="phone"
								control={control}
								rules={{
									validate: (val) =>
										val.replace(/\D/g, "").length === 12 || "To'liq telefon raqam kiriting",
								}}
								render={({ field }) => (
									<Input
										id="phone"
										inputMode="numeric"
										placeholder="+998 (90) 000-00-00"
										value={field.value}
										onChange={handlePhoneChange}
										onKeyDown={(e) => handlePhoneKeyDown(e, field.value)}
									/>
								)}
							/>
							{errors.phone && (
								<span className="text-[12px] text-red-500">{errors.phone.message}</span>
							)}
						</div>

						<Separator />

						{/* Fakultet */}
						<div className="flex flex-col gap-2">
							<Label>Fakultet</Label>
							<Controller
								name="facultyId"
								control={control}
								rules={{ required: "Fakultet tanlanishi shart" }}
								render={({ field }) => (
									<SearchableSelect
										options={FACULTIES}
										value={field.value}
										onChange={handleFacultyChange}
										placeholder="Fakultetni tanlang"
										searchPlaceholder="Fakultet qidirish..."
									/>
								)}
							/>
							{errors.facultyId && (
								<span className="text-[12px] text-red-500">{errors.facultyId.message}</span>
							)}
						</div>

						{/* Kafedra */}
						<div className="flex flex-col gap-2">
							<Label>Kafedra</Label>
							<Controller
								name="departmentId"
								control={control}
								rules={{ required: "Kafedra tanlanishi shart" }}
								render={({ field }) => (
									<SearchableSelect
										options={availableDepartments}
										value={field.value}
										onChange={field.onChange}
										placeholder={watchedFacultyId ? "Kafedrаni tanlang" : "Avval fakultetni tanlang"}
										searchPlaceholder="Kafedra qidirish..."
										disabled={!watchedFacultyId}
									/>
								)}
							/>
							{errors.departmentId && (
								<span className="text-[12px] text-red-500">{errors.departmentId.message}</span>
							)}
						</div>

						{/* Lavozim */}
						<div className="flex flex-col gap-2">
							<Label>Lavozim</Label>
							<Controller
								name="positionId"
								control={control}
								rules={{ required: "Lavozim tanlanishi shart" }}
								render={({ field }) => (
									<SearchableSelect
										options={POSITIONS}
										value={field.value}
										onChange={field.onChange}
										placeholder="Lavozimni tanlang"
										searchPlaceholder="Lavozim qidirish..."
									/>
								)}
							/>
							{errors.positionId && (
								<span className="text-[12px] text-red-500">{errors.positionId.message}</span>
							)}
						</div>

						{/* Jinsi */}
						<div className="flex flex-col gap-2">
							<Label>Jinsi</Label>
							<Controller
								name="gender"
								control={control}
								rules={{ required: "Jinsi tanlanishi shart" }}
								render={({ field }) => (
									<SearchableSelect
										options={GENDER_OPTIONS}
										value={field.value}
										onChange={field.onChange}
										placeholder="Jinsini tanlang"
										searchPlaceholder="Qidirish..."
									/>
								)}
							/>
							{errors.gender && (
								<span className="text-[12px] text-red-500">{errors.gender.message}</span>
							)}
						</div>

						{!isEdit && (
						<>
							<Separator />
						<div className="flex flex-col gap-2">
							<Label htmlFor="password">Parol</Label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Kamida 8 ta belgi"
									className="pr-10"
									{...register("password", {
										required: "Parol kiritilishi shart",
										minLength: {
											value: 8,
											message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
										},
									})}
								/>
								<button
									type="button"
									onClick={() => setShowPassword((v) => !v)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
								>
									{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
								</button>
							</div>
							{errors.password && (
								<span className="text-[12px] text-red-500">{errors.password.message}</span>
							)}
						</div>

						{/* Parolni tasdiqlash */}
						<div className="flex flex-col gap-2">
							<Label htmlFor="confirmPassword">Parolni tasdiqlash</Label>
							<div className="relative">
								<Input
									id="confirmPassword"
									type={showConfirm ? "text" : "password"}
									placeholder="Parolni qayta kiriting"
									className="pr-10"
									{...register("confirmPassword", {
										required: "Parolni tasdiqlash shart",
										validate: (val) => val === watchedPassword || "Parollar mos kelmadi",
									})}
								/>
								<button
									type="button"
									onClick={() => setShowConfirm((v) => !v)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
								>
									{showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
								</button>
							</div>
							{errors.confirmPassword && (
								<span className="text-[12px] text-red-500">{errors.confirmPassword.message}</span>
							)}
						</div>
						</>
					)}
					</form>
				</ScrollArea>

				<div className="border-t px-6 py-4 flex items-center justify-end gap-2 shrink-0">
					<Button type="button" variant="outline" onClick={handleClose}>
						Bekor qilish
					</Button>
					<Button type="submit" form="teacher-form" disabled={isPending}>
						{isPending ? "Saqlanmoqda..." : "Saqlash"}
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
