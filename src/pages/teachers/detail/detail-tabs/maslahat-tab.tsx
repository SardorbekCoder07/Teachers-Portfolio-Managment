import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { TruncatedText } from "@/components/tooltip/truncated-text";
import { useModalActions } from "@/store/modalStore";
import { Badge } from "@/ui/badge";
import { Eye, Pencil, Trash2 } from "lucide-react";

export type Maslahat = {
	id: number;
	name: string;
	description: string;
	year: string;
	head: string;
	subscribe: "HA" | "YO'Q";
	level: "XALQARO" | "MAHALLIY";
	status: "JARAYONDA" | "TUGALLANGAN";
	pdfName: string | null;
};

type Props = { data: Maslahat[] };

const STYLE_MAP: Record<string, string> = {
	HA: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
	"YO'Q": "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50",
	XALQARO: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
	MAHALLIY: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
	JARAYONDA: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-50",
	TUGALLANGAN: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-50",
};

export function MaslahatTab({ data }: Props) {
	const { open } = useModalActions();

	const columns: ColumnDef<Maslahat>[] = [
		{
			accessorKey: "name",
			header: "Maslahat nomi",
			cell: ({ row }) => <span className="font-medium text-[13px]">{row.original.name}</span>,
		},
		{
			accessorKey: "description",
			header: "Tavsif",
			cell: ({ row }) => <TruncatedText text={row.original.description} />,
		},
		{
			accessorKey: "year",
			header: "Yil",
			cell: ({ row }) => <span className="text-[13px] text-muted-foreground">{row.original.year}</span>,
		},
		{
			accessorKey: "head",
			header: "Rahbar",
			cell: ({ row }) => <span className="text-[13px] text-muted-foreground">{row.original.head}</span>,
		},
		{
			accessorKey: "subscribe",
			header: "A'zoligi",
			cell: ({ row }) => {
				const val = row.original.subscribe;
				return <Badge className={STYLE_MAP[val]} variant="outline">{val}</Badge>;
			},
		},
		{
			accessorKey: "status",
			header: "Holati",
			cell: ({ row }) => {
				const val = row.original.status;
				return <Badge className={STYLE_MAP[val]} variant="outline">{val}</Badge>;
			},
		},
		{
			accessorKey: "pdfName",
			header: "PDF",
			cell: ({ row }) => {
				const pdfName = row.original.pdfName;
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
						onClick={() => open({ _type: "maslahat", ...row.original })}
						className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
					>
						<Pencil className="size-3" /> Tahrirlash
					</button>
					<ConfirmPopover message="Bu maslahatni o'chirib tashlaysizmi? Bu amalni ortga qaytarib bo'lmaydi." onConfirm={() => console.log("delete", row.original.id)}>
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
