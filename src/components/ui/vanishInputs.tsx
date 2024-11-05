import { useEffect, useId, useState, useRef } from "react";
import useIsMobile from "@/utils/hooks/useMobileView";
import { cn } from "@/utils";
import { getDropdownStyles } from "@/utils/root.utils";
import { AppFilters } from "..";

interface _IVanishingInput {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
  isPending: boolean;
  disabled?: boolean;
}

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  defaultValue,
  isPending,
  disabled,
}: _IVanishingInput) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState(defaultValue);

  const searchId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const isMobile = useIsMobile();
  const filterStyles = getDropdownStyles(
    "-10rem",
    "100%",
    "-8rem",
    "2rem",
    isMobile
  );

  // Handle placeholder cycling every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [placeholders]);

  // Simple rendering of placeholder
  const renderPlaceholders = () => (
    <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
      {!value && (
        <p
          className={cn(
            "dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate transition-opacity duration-300 ease-linear",
            isPending ? "opacity-0" : "opacity-100" // Placeholder animation
          )}
        >
          {placeholders[currentPlaceholder]}
        </p>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "w-full relative max-w-xl mx-auto bg-white dark:bg-zinc-800 h-12 rounded-full  shadow-md transition duration-200",
        value && "bg-gray-50"
      )}
    >
      <label htmlFor={searchId} className="sr-only">
        Search
      </label>

      <input
        id={searchId}
        ref={inputRef}
        value={value}
        aria-label="search"
        type="text"
        disabled={disabled}
        onChange={(e) => {
          if (!isPending) {
            setValue(e.target.value);
            onChange(e);
          }
        }}
        className={cn(
          "w-full text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-12 pr-20",
          isPending && "text-opacity-30 dark:text-opacity-30"
        )}
      />

      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-transparent dark:transparent transition duration-200 flex items-center justify-center  border-r border-r-neutral-300 dark:border-neutral-600">
        <AppFilters filterStyles={filterStyles}/>
      </div>
      <button
        disabled={isPending || disabled}
        type="submit"
        aria-label="Submit Search Button"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
      >
        {/* Show spinner if isPending, otherwise show the arrow icon */}
        {isPending ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300 h-4 w-4"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12h14" />
            <path d="M13 18l6-6" />
            <path d="M13 6l6 6" />
          </svg>
        )}
      </button>

      {renderPlaceholders()}
    </div>
  );
}
