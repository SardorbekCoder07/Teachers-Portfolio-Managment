import { NavVertical } from "@/components/nav";
import type { NavProps } from "@/components/nav/types";
import { GLOBAL_CONFIG } from "@/global-config";
import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { Menu } from "lucide-react";
import qdtuLogo from "@/assets/images/qdtu.png";

export function NavMobileLayout({ data }: NavProps) {
	return (
		<Sheet modal={false}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<Menu className="size-6" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="[&>button]:hidden px-2 w-[280px]">
				<div className="flex gap-2 px-2 h-[var(--layout-header-height)] items-center">
					<img
						src={qdtuLogo}
						alt="QDTU"
						className="shrink-0 rounded"
						style={{ width: 32, height: 32, objectFit: "contain" }}
					/>
					<span className="text-xl font-bold">{GLOBAL_CONFIG.appName}</span>
				</div>
				<ScrollArea className="h-full">
					<NavVertical data={data} />
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
