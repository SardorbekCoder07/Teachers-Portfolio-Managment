import { Button } from "@/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { cn } from "@/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";

export type SearchableSelectOption = {
	value: string;
	label: string;
};

type SearchableSelectProps = {
	options: SearchableSelectOption[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	searchPlaceholder?: string;
	emptyText?: string;
	disabled?: boolean;
	clearable?: boolean;
};

export function SearchableSelect({
	options,
	value,
	onChange,
	placeholder = "Tanlang...",
	searchPlaceholder = "Qidirish...",
	emptyText = "Natija topilmadi.",
	disabled = false,
	clearable = false,
}: SearchableSelectProps) {
	const [open, setOpen] = useState(false);

	const selected = options.find((o) => o.value === value);

	return (
		<Popover open={open} onOpenChange={(v) => !disabled && setOpen(v)}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					disabled={disabled}
					className="w-full justify-between font-normal"
				>
					<span className={selected ? "" : "text-muted-foreground"}>
						{selected ? selected.label : placeholder}
					</span>
					{clearable && selected ? (
						<X
							className="size-3.5 shrink-0 opacity-50 hover:opacity-100"
							onClick={(e) => {
								e.stopPropagation();
								onChange("");
							}}
						/>
					) : (
						<ChevronsUpDown className="size-4 shrink-0 opacity-50" />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
				<Command>
					<CommandInput placeholder={searchPlaceholder} />
					<CommandList>
						<CommandEmpty>{emptyText}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.label}
									onSelect={() => {
										onChange(option.value);
										setOpen(false);
									}}
								>
									{option.label}
									<Check
										className={cn(
											"ml-auto size-4",
											value === option.value ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
