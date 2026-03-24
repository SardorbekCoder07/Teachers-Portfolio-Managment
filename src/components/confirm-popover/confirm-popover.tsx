import { Button } from "@/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

type ConfirmPopoverProps = {
	onConfirm: () => void;
	children: ReactNode;
	message?: string;
};

export function ConfirmPopover({
	onConfirm,
	children,
	message = "Bu o'qituvchini o'chirib tashlaysizmi? Bu amalni ortga qaytarib bo'lmaydi.",
}: ConfirmPopoverProps) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent className="w-72 p-0 overflow-hidden shadow-lg" align="end">
				<div className="bg-red-50 dark:bg-red-950/30 px-4 py-3 flex items-center gap-2.5 border-b border-red-100 dark:border-red-900/40">
					<div className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center shrink-0">
						<Trash2 className="size-3.5 text-red-600 dark:text-red-400" />
					</div>
					<span className="text-[13px] font-semibold text-red-700 dark:text-red-400">
						O'chirishni tasdiqlang
					</span>
				</div>
				<div className="px-4 py-3">
					<p className="text-[12.5px] text-muted-foreground leading-relaxed">{message}</p>
				</div>
				<div className="flex items-center gap-2 px-4 pb-3">
					<Button
						size="sm"
						variant="outline"
						className="flex-1 h-8 text-[12px]"
						onClick={() => setOpen(false)}
					>
						Bekor qilish
					</Button>
					<Button
						size="sm"
						className="flex-1 h-8 text-[12px] bg-red-600 hover:bg-red-700 text-white"
						onClick={() => {
							onConfirm();
							setOpen(false);
						}}
					>
						O'chirish
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
