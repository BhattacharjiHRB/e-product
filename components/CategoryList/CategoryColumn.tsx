import { Category } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import CustomActions from "../ui/custom-action";

interface CategoryColumnProps {
  onEdit: (Category: Category) => void;
  onDelete: (Category: Category) => void;
}
export const getCategoryColumns = ({
  onEdit,
  onDelete,
}: CategoryColumnProps): ColumnDef<Category>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Category Image",
    cell: ({ row }) => {
      const Category = row.original.image;
      return (
        <img
          src={Category}
          alt={row.original.name.substring(0, 10).concat("...")}
          loading="lazy"
          className="object-cover w-20 h-10 aspect-square rounded"
        />
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className="text-left font-medium overflow-hidden">{name}</div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.original.description;
      return (
        <div
          className={`text-left font-medium ${
            description ? "text-black" : "text-red-500"
          }`}
        >
          {description
            ? description.substring(0, 50).concat("...")
            : "No Description Available"}
        </div>
      );
    },
  },
  {
    id: "createdAt",
    header: "Date & Time",
    cell: ({ row }) => {
      const created = row.original.createdAt;
      const d = new Date(created!);
      const date = `${d.getDay()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      return (
        <div className="text-left font-medium">
          {date} - {time}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <CustomActions row={row} onEdit={onEdit} onDelete={onDelete} />;
    },
  },
];
