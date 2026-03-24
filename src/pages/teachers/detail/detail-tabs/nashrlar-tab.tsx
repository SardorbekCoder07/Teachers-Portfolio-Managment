import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { TruncatedText } from "@/components/tooltip/truncated-text";
import { useModalActions } from "@/store/modalStore";
import { Badge } from "@/ui/badge";
import { Eye, Pencil, Trash2 } from "lucide-react";

export type Nashr = {
	id: number;
	name: string;
	description: string;
	year: string;
	organization: string;
	type: "MAQOLA" | "KITOB" | "TADQIQOT" | "BOSHQA";
	authorship: "HAMMUALLIF" | "MUALLIF" | "BOSHQA";
	level: "XALQARO" | "MAHALLIY";
	volume: string;
	popularity: "ODDIY" | "POPULAR";
	pdfName: string | null;
};

type Props = { data: Nashr[] };

const TYPE_STYLES: Record<Nashr["type"], string> = {
	MAQOLA: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
	KITOB: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
	TADQIQOT: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-50",
	BOSHQA: "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-50",
};

export function NashrlarTab({ data }: Props) {
	const { open } = useModalActions();

	const columns: ColumnDef<Nashr>[] = [
		{
			accessorKey: "name",
			header: "Nashr nomi",
			cell: ({ row }) => <span className="font-medium text-[13px]">{row.getValue("name")}</span>,
		},
		{
			accessorKey: "description",
			header: "Tavsif",
			cell: ({ row }) => <TruncatedText text={row.getValue("description")} />,
		},
		{
			accessorKey: "year",
			header: "Yil",
			cell: ({ row }) => <span className="text-[13px] text-muted-foreground">{row.getValue("year")}</span>,
		},
		{
			accessorKey: "type",
			header: "Nashr turi",
			cell: ({ row }) => {
				const type = row.getValue("type") as Nashr["type"];
				return (
					<Badge className={TYPE_STYLES[type]} variant="outline">
						{type}
					</Badge>
				);
			},
		},
		{
			accessorKey: "level",
			header: "Daraja",
			cell: ({ row }) => {
				const level = row.getValue("level") as Nashr["level"];
				return (
					<Badge
						className={
							level === "XALQARO"
								? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50"
								: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50"
						}
						variant="outline"
					>
						{level}
					</Badge>
				);
			},
		},
		{
			accessorKey: "popularity",
			header: "Popularlik",
			cell: ({ row }) => {
				const pop = row.getValue("popularity") as Nashr["popularity"];
				return (
					<Badge
						className={
							pop === "POPULAR"
								? "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-50"
								: "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-50"
						}
						variant="outline"
					>
						{pop}
					</Badge>
				);
			},
		},
		{
			accessorKey: "pdfName",
			header: "PDF",
			cell: ({ row }) => {
				const pdfName = row.getValue("pdfName") as string | null;
				if (!pdfName) return <span className="text-[12px] text-muted-foreground">—</span>;
				return (
					<button
						type="button"
						className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
					>
						<Eye className="size-3" /> Ko'rish
					</button>
				);
			},
		},
		{
			id: "actions",
			header: () => <div className="text-center">Amallar</div>,
			cell: ({ row }) => (
				<div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
					<button
						type="button"
						onClick={() => open({ _type: "nashr", ...row.original })}
						className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
					>
						<Pencil className="size-3" /> Tahrirlash
					</button>
					<ConfirmPopover message="Bu nashr yozuvini o'chirib tashlaysizmi? Bu amalni ortga qaytarib bo'lmaydi." onConfirm={() => console.log("delete", row.original.id)}>
						<button
							type="button"
							className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
						>
							<Trash2 className="size-3" /> O'chirish
						</button>
					</ConfirmPopover>
				</div>
			),
		},
	];

	return <DataTable columns={columns} data={data} />;
}
