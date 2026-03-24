const API_ENDPOINTS = {
	LOGIN: "/auth/login",
	USER: {
		USER_ME: "/user",
	},
	FILE: {
		IMAGE: "/api/v1/files",
		PDF: "/api/v1/files/pdf",
	},
	COLLAGE: "/college",
	COLLAGE_PAGE: "/college/page",
	DEPARTMENT: "/department",
	DEPARTMENT_PAGE: "/department/page",
	DEPARTMENT_LIST: "/department/list",
	POSITION: "/lavozim",
	POSITION_STATS: "/lavozim/get-lavozim-statistiks",
	TEACHER: {
		SAVE: "/teacher/saveUser",
		SEARCH: "/teacher/search",
		UPDATE: "/teacher/update",
		DELETE: "/teacher",
	},
};

export const { LOGIN, USER, FILE, COLLAGE, COLLAGE_PAGE, DEPARTMENT, DEPARTMENT_PAGE, DEPARTMENT_LIST, POSITION, POSITION_STATS, TEACHER } = API_ENDPOINTS;
