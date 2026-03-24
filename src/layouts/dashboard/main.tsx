import { LineLoading } from "@/components/loading";
import { useSettings } from "@/store/settingStore";
import { cn } from "@/utils";
import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router";

const Main = () => {
	const { themeStretch } = useSettings();

	return (
		<main
			data-slot="slash-layout-main"
			className={cn(
				"flex-auto w-full flex flex-col",
				"transition-[max-width] duration-300 ease-in-out",
				"px-4 sm:px-6 py-4 sm:py-6 md:px-8 mx-auto",
				{
					"max-w-full": themeStretch,
					"xl:max-w-screen-xl": !themeStretch,
				},
			)}
			style={{
				willChange: "max-width",
			}}
		>
			<Suspense fallback={<LineLoading />}>
				<Outlet />
				<ScrollRestoration />
			</Suspense>
		</main>
	);
};

export default Main;
