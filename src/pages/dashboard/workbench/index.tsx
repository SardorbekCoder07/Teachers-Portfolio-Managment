import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import Icon from "@/components/icon/icon";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/ui/card";

// TODO: Replace with useQuery hooks
const stats: { label: string; value: number; icon: string; color: string; iconColor: string }[] = [];
const kafedraStats: { label: string; value: number; icon: string; bg: string }[] = [];
const lavozimlarStats: { label: string; value: number; icon: string; border: string }[] = [];
const ilmiyFaoliyat: { label: string; value: number; icon: string; iconColor: string }[] = [];
const talimDarajalari: { label: string; value: number; icon: string; color: string; bg: string }[] = [];
const yillikFaoliyat: { label: string; value: number; icon: string; badge: string }[] = [];
const kafedraTable: KafedraRow[] = [];

type KafedraRow = {
	nomi: string;
	fakultet: string;
	taqdimotlar: number;
	xodimlar: number;
	oxirgiKim: string;
	oxirgiVaqt: string;
	oxirgiSana: string;
};

const kafedraColumns: ColumnDef<KafedraRow>[] = [
	{
		accessorKey: "nomi",
		header: "Kafedra Nomi",
		cell: ({ row }) => <span className="font-medium">{row.getValue("nomi")}</span>,
	},
	{
		accessorKey: "fakultet",
		header: "Fakultet",
		cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("fakultet")}</span>,
	},
	{
		accessorKey: "taqdimotlar",
		header: () => <div className="text-right">Jami Taqdimotlar</div>,
		cell: ({ row }) => (
			<div className="text-right font-bold">
				{(row.getValue("taqdimotlar") as number).toLocaleString()}
			</div>
		),
	},
	{
		accessorKey: "xodimlar",
		header: () => <div className="text-right">Kafedra Xodimlari</div>,
		cell: ({ row }) => (
			<div className="text-right">
				<span className="bg-blue-100 text-blue-700 text-[12px] font-semibold px-2 py-0.5 rounded-full">
					{row.getValue("xodimlar") as number}
				</span>
			</div>
		),
	},
	{
		accessorKey: "oxirgiKim",
		header: "Oxirgi Yuborish",
		cell: ({ row }) => (
			<div className="flex flex-col gap-0.5">
				<span className="font-medium">{row.getValue("oxirgiKim")}</span>
				<span className="text-[11px] text-muted-foreground">
					{row.original.oxirgiVaqt} · {row.original.oxirgiSana}
				</span>
			</div>
		),
	},
];

export default function Workbench() {
	return (
		<div className="flex flex-col gap-6 w-full">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat) => (
					<Card key={stat.label}>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle>
								<span className="text-[12px] font-medium text-muted-foreground">{stat.label}</span>
							</CardTitle>
							<CardAction className={`rounded-full ${stat.color} p-2 w-10 h-10 flex items-center justify-center`}>
								<Icon icon={stat.icon} size={20} color={stat.iconColor} />
							</CardAction>
						</CardHeader>
						<CardContent>
							<span className="text-[24px] font-bold">{stat.value.toLocaleString()}</span>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="flex flex-col gap-3">
				<span className="text-[14px] font-semibold">Lavozimlar bo'yicha</span>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
					{lavozimlarStats.map((stat) => (
						<Card key={stat.label} className={`border-l-4 ${stat.border} py-0`}>
							<CardContent className="flex items-center justify-between px-4 py-3">
								<div className="flex flex-col gap-0.5">
									<span className="text-[12px] text-muted-foreground leading-tight">{stat.label}</span>
									<span className="text-[20px] font-bold leading-tight">{stat.value}</span>
								</div>
								<Icon icon={stat.icon} size={28} className="text-muted-foreground opacity-30" />
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<span className="text-[14px] font-semibold">Ilmiy Faoliyat</span>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
					{ilmiyFaoliyat.map((stat) => (
						<Card key={stat.label} className="py-0">
							<CardContent className="flex flex-col items-center justify-center gap-1 px-4 py-4 text-center">
								<Icon icon={stat.icon} size={28} color={stat.iconColor} />
								<span className="text-[22px] font-bold leading-tight">{stat.value.toLocaleString()}</span>
								<span className="text-[11px] text-muted-foreground leading-tight">{stat.label}</span>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<span className="text-[14px] font-semibold">Ta'lim Darajalari</span>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					{talimDarajalari.map((stat) => (
						<Card key={stat.label} className={`${stat.bg} border-0 py-0`}>
							<CardContent className="flex items-center gap-4 px-5 py-4">
								<Icon icon={stat.icon} size={32} className={stat.color} />
								<div className="flex flex-col gap-0.5">
									<span className="text-[12px] text-muted-foreground leading-tight">{stat.label}</span>
									<span className={`text-[22px] font-bold leading-tight ${stat.color}`}>{stat.value}</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<span className="text-[14px] font-semibold">Yillik Faoliyat</span>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
					{yillikFaoliyat.map((stat) => (
						<Card key={stat.label} className="py-0">
							<CardContent className="flex items-center justify-between px-4 py-3">
								<div className="flex items-center gap-3">
									<Icon icon={stat.icon} size={20} className="text-muted-foreground" />
									<span className="text-[12px] text-muted-foreground leading-tight">{stat.label}</span>
								</div>
								<span className={`text-[13px] font-bold px-2 py-0.5 rounded-full ${stat.badge}`}>{stat.value}</span>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<span className="text-[14px] font-semibold">Kafedra Statistikasi</span>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{kafedraStats.map((stat) => (
						<Card key={stat.label}>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle>
									<span className="text-[13px] font-medium text-muted-foreground">{stat.label}</span>
								</CardTitle>
								<CardAction className={`${stat.bg} rounded-xl p-3 w-12 h-12 flex items-center justify-center`}>
									<Icon icon={stat.icon} size={24} color="white" />
								</CardAction>
							</CardHeader>
							<CardContent>
								<span className="text-[28px] font-bold">{stat.value.toLocaleString()}</span>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-0.5">
					<span className="text-[14px] font-semibold">Kafedralar Haqida Umumiy Ma'lumot</span>
					<span className="text-[12px] text-muted-foreground">
						Har bir bo'lim uchun batafsil statistika, shu jumladan taqdimotlar va so'nggi faoliyat
					</span>
				</div>
				<DataTable data={kafedraTable} columns={kafedraColumns} />
			</div>
		</div>
	);
}
