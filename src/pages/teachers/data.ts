export type Teacher = {
	id: number;
	name: string;
	phone: string;
	faculty: string;
	department: string;
	position: string;
	email: string;
};

export type TeacherFormValues = {
	fullName: string;
	phone: string;
	facultyId: string;
	departmentId: string;
	positionId: string;
	gender: "true" | "false";
	image: File | null;
	password: string;
	confirmPassword: string;
};

// TODO: Replace with useQuery hooks
export const FACULTIES: { value: string; label: string }[] = [];
export const DEPARTMENTS: { value: string; label: string; facultyId: string }[] = [];
export const POSITIONS: { value: string; label: string }[] = [];
