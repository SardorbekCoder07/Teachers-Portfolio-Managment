import DashboardLayout from "@/layouts/dashboard";
import LoginAuthGuard from "@/routes/components/login-auth-guard";
import TokenGuard from "@/components/TokenGuard";
import { getDashboardRoutes } from "./routes";
import type { RouteObject } from "react-router";

export const dashboardRoutes: RouteObject[] = [
	{
		element: (
			<LoginAuthGuard>
				<TokenGuard>
					<DashboardLayout />
				</TokenGuard>
			</LoginAuthGuard>
		),
		children: [...getDashboardRoutes()],
	},
];
