import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { generatePagination, getDropdownStyles } from "@/utils/root.utils";

import useIsMobile from "@/utils/hooks/useMobileView";
import { NavLink } from "react-router-dom";
import { useSearch } from "@/utils";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, Typography } from "..";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const [params, pathname] = useSearch();
  const currentPage = Number(params?.get("page")) || 1;
  const pageSize =
    typeof params?.get("size") === "string"
      ? Number(params?.get("size"))
      : "select size";

  const createPageURL = (pageNumber: number | string) => {
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const createSizeURL = (size: number | string) => {
    params.set("size", size.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="w-full flex justify-center gap-8 items-center">
      <div className="flex justify-around items-center gap-8">
        <NavLink
          to={createPageURL(currentPage - 1)}
          className="aria-disabled:pointer-events-none hidden md:block"
          aria-label="Previous Link"
          aria-disabled={currentPage <= 1}
        >
          <Button
            variant="default"
            size="default"
            aria-label="Previous Page"
            aria-disabled={currentPage <= 1}
          >
            Prev
          </Button>
        </NavLink>

        {/* Prevent elements from overflowing */}
        <div className="inline-flex whitespace-nowrap">
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />

          <div className="flex -space-x-px">
            {allPages.map((page, index) => {
              let position: "first" | "last" | "single" | "middle" | undefined;
              if (index === 0) position = "first";
              if (index === allPages.length - 1) position = "last";
              if (allPages.length === 1) position = "single";
              if (page === "...") position = "middle";

              return (
                <PaginationNumber
                  key={`${page}-_${index}`}
                  href={createPageURL(page)}
                  page={page}
                  position={position}
                  isActive={currentPage === page}
                />
              );
            })}
          </div>

          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
          />
        </div>

        <NavLink
          to={createPageURL(currentPage + 1)}
          className="aria-disabled:pointer-events-none hidden md:block"
          aria-label="Next Link"
          aria-disabled={currentPage >= totalPages}
        >
          <Button
            variant="default"
            size="default"
            aria-label="Next Page"
            aria-disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </NavLink>
      </div>
      <PaginationPageSize createSizeFn={createSizeURL} pageSize={pageSize} />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-9 w-9 items-center justify-center text-sm border border-zinc-300 dark:border-zinc-700",
    {
      "rounded-l-lg": position === "first" || position === "single",
      "rounded-r-lg": position === "last" || position === "single",
      "z-10 bg-blue-600 dark:bg-neutral-600  text-white": isActive,
      "hover:bg-gray-100 dark:hover:bg-zinc-800":
        !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <NavLink aria-label={page.toString()} to={href} className={className}>
      {page}
    </NavLink>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100 dark:hover:bg-zinc-800": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <NavLink aria-label={direction} className={className} to={href}>
      {icon}
    </NavLink>
  );
}

function PaginationPageSize({
  createSizeFn,
  pageSize,
}: {
  createSizeFn: (size: number) => string;
  pageSize: number | "select size";
}) {
  const sizeArray = [5, 10, 15, 20, 25];
  const isMobile = useIsMobile();
  const filterStyles = getDropdownStyles(
    "-10rem",
    "100%",
    "0rem",
    "2rem",
    isMobile
  );
  return (
    <DropdownMenu
      trigger={
        <div className="border rounded-md border-neutral-400 dark:border-neutral-600 flex items-center gap-4 px-4 py-1 cursor-pointer">
          <p>{pageSize}</p>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      }
      style={filterStyles}
      className={`dark:bg-neutral-800 bg-white ${
        typeof pageSize === "string" ? "w-36" : ""
      } ring-1 ring-black rounded-md px-1`}
    >
      {(onClose) => (
        <DropdownMenuContent>
          {sizeArray.map((size, idx) => (
            <NavLink to={createSizeFn(size)} key={`${size}-${idx}`}>
              <DropdownMenuItem
                onClick={() => {
                  onClose();
                }}
              >
                <Typography variant="span">{size}</Typography>
              </DropdownMenuItem>
            </NavLink>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
