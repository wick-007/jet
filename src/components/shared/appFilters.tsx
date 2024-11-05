import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, Typography } from "..";
import { cn } from "@/utils";
import { CSSProperties } from "react";


const AppFilters = ({filterStyles, className}: { filterStyles: CSSProperties | undefined, className?: string }) => {
  return (
    <DropdownMenu
      trigger={<AdjustmentsHorizontalIcon className="w-6 h-6 cursor-pointer" />}
      style={filterStyles}
      className={cn(
        "dark:bg-neutral-800 bg-white ring-1 ring-black w-48 rounded-md px-1",
        className
      )}
    >
      {(onClose) => (
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Typography variant="h5">Filter by zones</Typography>
          </DropdownMenuLabel>
          {[{ label: "", value: "" }].map((option) => (
            <DropdownMenuItem key={option.value} onClick={onClose}>
              <Typography variant="span">{option.label}</Typography>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <Typography variant="h5">Filter by sex types</Typography>
          </DropdownMenuLabel>
          {[{ label: "", value: "" }].map((option) => (
            <DropdownMenuItem key={option.value} onClick={onClose}>
              <Typography variant="span">{option.label}</Typography>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default AppFilters;