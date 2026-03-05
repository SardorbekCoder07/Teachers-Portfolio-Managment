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
	image: File | null;
	password: string;
	confirmPassword: string;
};

export const FACULTIES = [
	{ value: "1", label: "Davolash fakulteti" },
	{ value: "2", label: "Pediatriya fakulteti" },
	{ value: "3", label: "Stomatologiya va Farmatsiya fakulteti" },
	{ value: "4", label: "Tibbiy profilaktika fakulteti" },
	{ value: "5", label: "Tibbiy biologiya fakulteti" },
	{ value: "6", label: "Oliy hamshiralik ishi fakulteti" },
	{ value: "7", label: "Magistratura va doktorantura" },
];

export const DEPARTMENTS = [
	{ value: "1", label: "Farmatsiya va kimyo kafedrasi", facultyId: "3" },
	{ value: "2", label: "Ichki kasalliklar kafedrasi", facultyId: "1" },
	{ value: "3", label: "Jarrohlik kafedrasi", facultyId: "1" },
	{ value: "4", label: "Bolalar kasalliklari kafedrasi", facultyId: "2" },
	{ value: "5", label: "Stomatologiya kafedrasi", facultyId: "3" },
	{ value: "6", label: "Akusherlik va ginekologiya", facultyId: "4" },
	{ value: "7", label: "Nevrologiya kafedrasi", facultyId: "1" },
	{ value: "8", label: "Biokimyo kafedrasi", facultyId: "5" },
	{ value: "9", label: "Fiziologiya kafedrasi", facultyId: "5" },
	{ value: "10", label: "Hamshiralik ishi kafedrasi", facultyId: "6" },
	{ value: "11", label: "Umumiy gigiyena kafedrasi", facultyId: "4" },
	{ value: "12", label: "Tibbiy biologiya kafedrasi", facultyId: "7" },
];

export const POSITIONS = [
	{ value: "1", label: "Professor" },
	{ value: "2", label: "Dotsent" },
	{ value: "3", label: "Katta o'qituvchi" },
	{ value: "4", label: "Assistent" },
	{ value: "5", label: "O'qituvchi" },
];

export const TEACHERS: Teacher[] = [
	{
		id: 1,
		name: "Aliyev Bobur Hamidovich",
		phone: "+998 (90) 123-45-67",
		faculty: "Davolash fakulteti",
		department: "Ichki kasalliklar kafedrasi",
		position: "Professor",
		email: "aliyev@ttu.uz",
	},
	{
		id: 2,
		name: "Karimova Dilnoza Yusupovna",
		phone: "+998 (91) 234-56-78",
		faculty: "Davolash fakulteti",
		department: "Jarrohlik kafedrasi",
		position: "Dotsent",
		email: "karimova@ttu.uz",
	},
	{
		id: 3,
		name: "Toshmatov Nodir Baxtiyorovich",
		phone: "+998 (93) 345-67-89",
		faculty: "Davolash fakulteti",
		department: "Nevrologiya kafedrasi",
		position: "Katta o'qituvchi",
		email: "toshmatov@ttu.uz",
	},
	{
		id: 4,
		name: "Xasanova Maftuna Ilyosovna",
		phone: "+998 (94) 456-78-90",
		faculty: "Pediatriya fakulteti",
		department: "Bolalar kasalliklari kafedrasi",
		position: "Professor",
		email: "xasanova@ttu.uz",
	},
	{
		id: 5,
		name: "Mirzayev Jasur Ortiqovich",
		phone: "+998 (95) 567-89-01",
		faculty: "Pediatriya fakulteti",
		department: "Bolalar kasalliklari kafedrasi",
		position: "Dotsent",
		email: "mirzayev@ttu.uz",
	},
	{
		id: 6,
		name: "Rahimova Sarvinoz Akramovna",
		phone: "+998 (97) 678-90-12",
		faculty: "Stomatologiya va Farmatsiya fakulteti",
		department: "Stomatologiya kafedrasi",
		position: "Dotsent",
		email: "rahimova@ttu.uz",
	},
	{
		id: 7,
		name: "Yunusov Eldor Sobirovich",
		phone: "+998 (98) 789-01-23",
		faculty: "Stomatologiya va Farmatsiya fakulteti",
		department: "Farmatsiya va kimyo kafedrasi",
		position: "Katta o'qituvchi",
		email: "yunusov@ttu.uz",
	},
	{
		id: 8,
		name: "Nazarova Hulkar Bahodirovna",
		phone: "+998 (99) 890-12-34",
		faculty: "Tibbiy profilaktika fakulteti",
		department: "Akusherlik va ginekologiya",
		position: "Professor",
		email: "nazarova@ttu.uz",
	},
	{
		id: 9,
		name: "Qodirov Sherzod Abdullayevich",
		phone: "+998 (90) 901-23-45",
		faculty: "Tibbiy profilaktika fakulteti",
		department: "Umumiy gigiyena kafedrasi",
		position: "Dotsent",
		email: "qodirov@ttu.uz",
	},
	{
		id: 10,
		name: "Ergasheva Nodira Fayzullayevna",
		phone: "+998 (91) 012-34-56",
		faculty: "Tibbiy biologiya fakulteti",
		department: "Biokimyo kafedrasi",
		position: "Dotsent",
		email: "ergasheva@ttu.uz",
	},
	{
		id: 11,
		name: "Holmatov Firdavs Muxtorovich",
		phone: "+998 (93) 112-23-34",
		faculty: "Tibbiy biologiya fakulteti",
		department: "Fiziologiya kafedrasi",
		position: "Katta o'qituvchi",
		email: "holmatov@ttu.uz",
	},
	{
		id: 12,
		name: "Tursunova Zulfiya Ravshanova",
		phone: "+998 (94) 223-34-45",
		faculty: "Oliy hamshiralik ishi fakulteti",
		department: "Hamshiralik ishi kafedrasi",
		position: "O'qituvchi",
		email: "tursunova@ttu.uz",
	},
	{
		id: 13,
		name: "Askarov Ulugbek Hamroyevich",
		phone: "+998 (95) 334-45-56",
		faculty: "Magistratura va doktorantura",
		department: "Tibbiy biologiya kafedrasi",
		position: "Professor",
		email: "askarov@ttu.uz",
	},
	{
		id: 14,
		name: "Sobirov Kamol Lutfullayevich",
		phone: "+998 (97) 445-56-67",
		faculty: "Davolash fakulteti",
		department: "Ichki kasalliklar kafedrasi",
		position: "Dotsent",
		email: "sobirov@ttu.uz",
	},
	{
		id: 15,
		name: "Maxmudova Barno Toshpulatovna",
		phone: "+998 (98) 556-67-78",
		faculty: "Stomatologiya va Farmatsiya fakulteti",
		department: "Farmatsiya va kimyo kafedrasi",
		position: "O'qituvchi",
		email: "maxmudova@ttu.uz",
	},
];
