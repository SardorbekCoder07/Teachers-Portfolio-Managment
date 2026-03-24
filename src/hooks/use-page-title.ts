import { useEffect } from "react";
import { useLocation } from "react-router";

const pageTitles: Record<string, string> = {
	"/dashboard": "QDTU | Boshqaruv Paneli",
	"/analysis": "QDTU | Analitika",
	"/faculties": "QDTU | Fakultetlar",
	"/departments": "QDTU | Kafedralar",
	"/teachers": "QDTU | O'qituvchilar",
	"/positions": "QDTU | Lavozimlar",
	"/error/403": "QDTU | 403",
	"/error/404": "QDTU | 404",
	"/error/500": "QDTU | 500",
	"/teacher-dashboard": "QDTU | Bosh Sahifa",
	"/teacher-dashboard/profile": "QDTU | Profilim",
	"/teacher-dashboard/researches": "QDTU | Tadqiqotlarim",
	"/teacher-dashboard/publications": "QDTU | Nashrlarim",
	"/teacher-dashboard/consultations": "QDTU | Maslahatlarim",
	"/teacher-dashboard/awards": "QDTU | Mukofotlarim",
};

export function usePageTitle() {
	const { pathname } = useLocation();

	useEffect(() => {
		if (pageTitles[pathname]) {
			document.title = pageTitles[pathname];
		}
	}, [pathname]);
}
