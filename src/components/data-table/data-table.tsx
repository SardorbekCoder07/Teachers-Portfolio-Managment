import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/ui/table";

export type { ColumnDef };

const PAGE_SIZE = 10;

type DataTableProps<T> = {
	columns: ColumnDef<T>[];
	data: T[];
	onRowClick?: (row: T) => void;
	isLoading?: boolean;
	// server-side pagination
	page?: number;
	totalPage?: number;
	onPageChange?: (page: number) => void;
};

export function DataTable<T>({ columns, data, onRowClick, isLoading, page, totalPage, onPageChange }: DataTableProps<T>) {
	const [pageIndex, setPageIndex] = useState(0);

	const isServerPagination = page !== undefined && totalPage !== undefined && onPageChange !== undefined;

	const currentPage = isServerPagination ? page : pageIndex;
	const displayTotalPages = isServerPagination ? totalPage : 0;

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: { pagination: { pageIndex: currentPage, pageSize: PAGE_SIZE } },
		onPaginationChange: (updater) => {
			const next = typeof updater === "function"
				? updater({ pageIndex: currentPage, pageSize: PAGE_SIZE })
				: updater;
			if (isServerPagination) {
				onPageChange(next.pageIndex);
			} else {
				setPageIndex(next.pageIndex);
			}
		},
		manualPagination: isServerPagination,
		pageCount: isServerPagination ? totalPage : undefined,
	});

	const clientTotalPages = table.getPageCount();
	const showPagination = isServerPagination ? totalPage > 1 : data.length > PAGE_SIZE;
	const pages = isServerPagination ? displayTotalPages : clientTotalPages;

	return (
		<div className="flex flex-col gap-3">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							Array.from({ length: PAGE_SIZE }).map((_, i) => (
								<TableRow key={i}>
									{columns.map((_, j) => (
										<TableCell key={j}>
											<Skeleton className="h-4 w-full" />
										</TableCell>
									))}
								</TableRow>
							))
						) : table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									onClick={() => onRowClick?.(row.original)}
									className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									Ma'lumot topilmadi.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{showPagination && (
				<div className="flex items-center justify-between px-1">
					<span className="text-[13px] text-muted-foreground">
						{currentPage + 1} / {pages} sahifa
					</span>

					<div className="flex items-center gap-1">
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => table.firstPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<ChevronsLeft className="size-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<ChevronLeft className="size-4" />
						</Button>

						{Array.from({ length: pages }, (_, i) => i).map((i) => (
							<Button
								key={i}
								variant={i === currentPage ? "default" : "outline"}
								size="icon"
								className="h-8 w-8 text-[13px]"
								onClick={() => table.setPageIndex(i)}
							>
								{i + 1}
							</Button>
						))}

						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<ChevronRight className="size-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => table.lastPage()}
							disabled={!table.getCanNextPage()}
						>
							<ChevronsRight className="size-4" />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
