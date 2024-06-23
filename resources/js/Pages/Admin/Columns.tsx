import { ColumnDef, FilterFn, Row } from "@tanstack/react-table"
import { Reservation } from "@/types"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/Components/ui/button"

type StatusFilterValue = "Upcoming" | "Today" | "Completed";

const statusFilterFn: FilterFn<Reservation> = (
  row: Row<Reservation>,
  columnId: string,
  filterValue: StatusFilterValue
): boolean => {
  const status = new Date(row.original.reservation_date as string);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  status.setHours(0, 0, 0, 0);

  let statusLabel: StatusFilterValue;
  if (status < today) {
    statusLabel = "Completed";
  } else if (status > today) {
    statusLabel = "Upcoming";
  } else {
    statusLabel = "Today";
  }

  return statusLabel === filterValue;
};
export const reservationColumns: ColumnDef<Reservation>[] = [
    {
        header: 'Full Name',
        accessorKey: 'full_name',
    },
    {
        header: 'Phone Number',
        accessorKey: 'phone_number',
    },
    {
        header: 'Branch',
        accessorFn: row => row.branch.branch_name,
        id: 'branch_name',
    },
    {
        header: 'Service',
        accessorKey: 'service.service_name',
    },
    {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        accessorKey: 'reservation_date',
        cell: ({ row }) => {
            const date = new Date(row.original.reservation_date)
            return date.toLocaleString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })
        }
    },
    {
        header: 'Time',
        accessorKey: 'reservation_hour',
        cell: ({ row }) => {
            const time = row.original.reservation_hour.substring(0, 5)
            return time
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = new Date(row.original.reservation_date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            status.setHours(0, 0, 0, 0);

            if (status < today) {
                return (
                    <span className="px-2 py-1 text-xs font-semibold text-white rounded-full bg-green-500">
                        Completed
                    </span>
                );
            } else if (status > today) {
                return (
                    <span className="px-2 py-1 text-xs font-semibold text-white rounded-full bg-gray-500">
                        Upcoming
                    </span>
                );
            } else {
                return (
                    <span className="px-2 py-1 text-xs font-semibold text-white rounded-full bg-pastel">
                        Today
                    </span>
                );
            }
        },
        filterFn: statusFilterFn,
    },
]
