import { Product } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import CustomActions from "../ui/custom-action";

interface ProductColumnProps {
  onEdit: (Product: Product) => void;
  onDelete: (Product: Product) => void;
}
export const getProductColumns = ({
  onEdit,
  onDelete,
}: ProductColumnProps): ColumnDef<Product>[] => [
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
    accessorKey: "images",
    header: "Product Image",
    cell: ({ row }) => {
      const product = row.original.images?.[0];
      return (
        <img
          src={product}
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
        <div className="text-left font-medium">
          {description.substring(0, 50).concat("...")}
        </div>
      );
    },
  },

  {
    accessorKey: "price",
    header: "$Price",
    cell: ({ row }) => {
      const price = row.original.price;
      return <div className="text-left font-medium">${price}</div>;
    },
    enableSorting: true,
  },

  {
    accessorKey: "product.category",
    header: "Category",
    cell: ({ row }) => {
      const location = row.original.category.name;
      return <div className="text-left font-medium">{location}</div>;
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
