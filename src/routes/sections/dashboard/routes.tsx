import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import { Component } from "./utils";

export function getDashboardRoutes(): RouteObject[] {
	const dashboardRoutes: RouteObject[] = [
		{ path: "dashboard", element: Component("/pages/dashboard/workbench") },
		{ path: "analysis", element: Component("/pages/dashboard/analysis") },
		{
			path: "faculties",
			element: Component("/pages/faculties"),
		},
		{
			path: "departments",
			element: Component("/pages/departments"),
		},
		{
			path: "teachers",
			element: Component("/pages/teachers"),
		},
		{
			path: "positions",
			element: Component("/pages/positions"),
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
