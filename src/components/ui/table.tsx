import { cn } from "@/utils";
import { FC, forwardRef } from "react";
import Image from './image'
type TableProps = React.ComponentPropsWithoutRef<"table"> & {
  className?: string;
};
type TableSectionProps = React.ComponentPropsWithoutRef<
  "thead" | "tbody" | "tfoot"
>;
type TableRowProps = React.ComponentPropsWithoutRef<"tr"> & {
  className?: string;
  isHeader?: boolean;
};
type TableCellProps = React.ComponentPropsWithoutRef<"td" | "th"> & {
  isHeader?: boolean;
  className?: string;
};
type TableImageCellProps = { src: string; alt: string; className?: string };

type TableTitleProps = React.ComponentPropsWithoutRef<"div"> & {
  className?: string;
};
type TableDescriptionProps = React.ComponentPropsWithoutRef<"div"> & {
  className?: string;
};
type TableFooterProps = React.ComponentPropsWithoutRef<"div"> & {
  className?: string;
};

// Main table wrapper component
const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <table ref={ref} className={cn("min-w-full mt-4 table-auto", className)} {...props} />
  )
);
Table.displayName = "Table";

const TableHeader = forwardRef<HTMLDivElement, TableTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    />
  )
);
TableHeader.displayName = "TableHeader";

// Checkbox component for individual rows
const TableCheckbox: FC<{
    checked: boolean;
    id: string;
    onChange: () => void;
  }> = (
  ({
    checked,
    id,
    onChange,
  }) => (
    <input
      type="checkbox"
      aria-label={id}
      id={id}
      className="form-checkbox h-4 w-4"
      checked={checked}
      onChange={onChange}
    />
  )
);
TableCheckbox.displayName = "TableCheckbox";

// Table header, body, and footer sections
const TableHead = forwardRef<
  HTMLTableSectionElement,
  TableSectionProps
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("", className)} {...props} />
));
TableHead.displayName = "TableHead";

const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("", className)} {...props} />
  )
);
TableBody.displayName = "TableBody";

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableSectionProps
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("", className)} {...props} />
));
TableFooter.displayName = "TableFooter";

// Table row component
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, isHeader, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        `${
          isHeader
            ? "border-b border-gray-200 dark:border-gray-600"
            : "even:bg-slate-50 dark:even:bg-zinc-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-sm"
        }`,
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

// Table cell component (handles both regular cells and header cells)
const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ isHeader = false, className, ...props }, ref) => {
    const Component = isHeader ? "th" : "td";
    return (
      <Component
        ref={ref}
        className={cn(
          "px-2 sm:px-4 md:px-6 text-sm", // Use smaller padding on small screens
          isHeader
            ? "text-left text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider"
            : "",
          className
        )}
        {...props}
      />
    );
  }
);
TableCell.displayName = "TableCell";

// Specialized table image cell for avatars or images
const TableImageCell = forwardRef<HTMLImageElement, TableImageCellProps>(
  ({ src, alt, className, ...props }, ref) => (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      width={40}
      height={40}
      className={cn("w-9 h-9 rounded-full object-cover", className)} // Ensure object-cover is applied
      {...props}
    />
  )
);

TableImageCell.displayName = "TableImageCell";

// Table title component for a card-like display
const TableTitle = forwardRef<HTMLDivElement, TableTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-lg font-bold text-gray-900", className)}
      {...props}
    />
  )
);
TableTitle.displayName = "TableTitle";

// Table description for subtitles or additional details
const TableDescription = forwardRef<
  HTMLDivElement,
  TableDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableDescription.displayName = "TableDescription";

// Footer for card-like table with buttons or pagination
const TableFooterContent = forwardRef<HTMLDivElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0 border-t border-gray-200",
        className
      )}
      {...props}
    />
  )
);
TableFooterContent.displayName = "TableFooterContent";

// Export all components
export {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableImageCell,
  TableTitle,
  TableDescription,
  TableFooterContent,
  TableCheckbox
};
