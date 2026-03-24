import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import RoleAuthGuard from "@/routes/components/role-auth-guard";
import { Component } from "./utils";

export function getDashboardRoutes(): RouteObject[] {
	const dashboardRoutes: RouteObject[] = [
		// Admin
		{
			element: <RoleAuthGuard adminOnly />,
			children: [
				{ path: "dashboard", element: Component("/pages/dashboard/workbench") },
				{ path: "analysis", element: Component("/pages/dashboard/analysis") },
				{ path: "faculties", element: Component("/pages/faculties") },
				{ path: "departments", element: Component("/pages/departments") },
				{ path: "teachers", element: Component("/pages/teachers") },
				{ path: "teachers/:id", element: Component("/pages/teachers/detail") },
				{ path: "positions", element: Component("/pages/positions") },
			],
		},
		// Teacher
		{
			element: <RoleAuthGuard teacherOnly />,
			children: [
				{ path: "teacher-dashboard", element: Component("/pages/teacher-dashboard") },
				{ path: "teacher-dashboard/profile", element: Component("/pages/teacher-dashboard/profile") },
				{ path: "teacher-dashboard/researches", element: Component("/pages/teacher-dashboard/researches") },
				{ path: "teacher-dashboard/publications", element: Component("/pages/teacher-dashboard/publications") },
				{ path: "teacher-dashboard/consultations", element: Component("/pages/teacher-dashboard/consultations") },
				{ path: "teacher-dashboard/awards", element: Component("/pages/teacher-dashboard/awards") },
			],
		},
		{
			path: "error",
			children: [
				{ index: true, element: <Navigate to="403" replace /> },
				{ path: "403", element: Component("/pages/sys/error/Page403") },
				{ path: "404", element: Component("/pages/sys/error/Page404") },
				{ path: "500", element: Component("/pages/sys/error/Page500") },
			],
		},
	];
	return dashboardRoutes;
}
