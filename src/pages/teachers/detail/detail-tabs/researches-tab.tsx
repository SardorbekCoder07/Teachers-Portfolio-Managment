import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { TruncatedText } from "@/components/tooltip/truncated-text";
import { useModalActions } from "@/store/modalStore";
import { Badge } from "@/ui/badge";
import { Eye, Pencil, Trash2 } from "lucide-react";

export type Research = {
	id: number;
	name: string;
	description: string;
	year: string;
	organization: string;
	membershipType: "MILLIY" | "XALQARO";
	status: "JARAYONDA" | "TUGALLANGAN";
	pdfName: string | null;
};

type Props = { data: Research[] };

export function ResearchesTab({ data }: Props) {
	const { open } = useModalActions();

	const columns: ColumnDef<Research>[] = [
		{
			accessorKey: "name",
			header: "Tadqiqot nomi",
			cell: ({ row }) => <span className="font-medium text-[13px]">{row.getValue("name")}</span>,
		},
		{
			accessorKey: "description",
			header: "Tavsif",
			cell: ({ row }) => <TruncatedText text={row.getValue("description")} maxLength={50} />,
		},
		{
			accessorKey: "year",
			header: "Yil",
			cell: ({ row }) => <span className="text-[13px] text-muted-foreground">{row.getValue("year")}</span>,
		},
		{
			accessorKey: "status",
			header: "Holati",
			cell: ({ row }) => {
				const status = row.getValue("status") as Research["status"];
				return (
					<Badge
						className={
							status === "TUGALLANGAN"
								? "bg-emerald-50 text-emerald-700 border-emerald-200"
								: "bg-amber-50 text-amber-700 border-amber-200"
						}
						variant="outline"
					>
						{status}
					</Badge>
				);
			},
		},
		{
			accessorKey: "membershipType",
			header: "A'zolik turi",
			cell: ({ row }) => {
				const type = row.getValue("membershipType") as Research["membershipType"];
				return (
					<Badge
						className={
							type === "XALQARO"
								? "bg-blue-50 text-blue-700 border-blue-200"
								: "bg-violet-50 text-violet-700 border-violet-200"
						}
						variant="outline"
					>
						{type}
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
						onClick={() => open({ _type: "research", ...row.original })}
						className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
					>
						<Pencil className="size-3" /> Tahrirlash
					</button>
					<ConfirmPopover message="Bu tadqiqotni o'chirib tashlaysizmi? Bu amalni ortga qaytarib bo'lmaydi." onConfirm={() => console.log("delete", row.original.id)}>
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
