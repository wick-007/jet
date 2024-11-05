import React, { useState, forwardRef, ReactNode, useRef } from "react";
import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/solid"; // Heroicons for icons
import { _TButtonVariants, Button } from "./button";
import { cn, useOutsideClick } from "@/utils";

// Types for the component props
interface _IDropdownMenuProps {
  trigger: ReactNode;
  children: (onClose: () => void) => ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface _IDropdownItemProps {
  className?: string;
  inset?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

interface _IDropdownSubMenuProps extends _IDropdownItemProps {
  trigger: ReactNode;
  position: "left" | "right";
  style?: React.CSSProperties;
}

interface _IDropDownTriggerProps extends _IDropdownItemProps {
  variant: _TButtonVariants;
  size: _TSizes;
}

interface _IDropdownCheckboxItemProps extends _IDropdownItemProps {
  checked: boolean;
  checkboxClassName?: string;
}

interface _IDropdownRadioItemProps extends _IDropdownItemProps {
  radioClassName?: string;
}

type _TDropdownMenuLabelProps = _IDropdownItemProps;

interface _IDropdownMenuSubContentProps {
  className?: string;
  children: ReactNode;
  position: "left" | "right";
  style?: React.CSSProperties;
}

// Base Dropdown Menu component with Tailwind animations
const DropdownMenu: React.FC<_IDropdownMenuProps> = ({
  trigger,
  style = {},
  children,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to detect clicks outside the dropdown menu
  useOutsideClick(dropdownMenuRef, closeMenu);

  return (
    <div ref={dropdownMenuRef} className="relative inline-block text-left">
      <div
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {trigger}
      </div>

      {open && (
        <div
          className={cn(
            "absolute z-50 mt-2 shadow-lg ring-opacity-5 bg-white rounded-lg transform transition-all duration-200 ease-in-out",
            open ? "opacity-100 scale-100" : "opacity-0 scale-95",
            className
          )}
          style={style}
        >
          {children(closeMenu)}
        </div>
      )}
    </div>
  );
};

// Dropdown Menu Trigger component
const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  _IDropDownTriggerProps
>(({ className, size, variant, children, ...props }, ref) => (
  <Button
    variant={variant}
    size={size}
    ref={ref}
    className={cn("", className)}
    {...props}
  >
    {children}
  </Button>
));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// Dropdown Menu Content component
const DropdownMenuContent: React.FC<{
  className?: string;
  children: ReactNode;
}> = ({ className, children }) => (
  <div className={cn("py-1", className)}>{children}</div>
);

// Dropdown Menu Item component with Tailwind hover and tap animations
const DropdownMenuItem = forwardRef<HTMLDivElement, _IDropdownItemProps>(
  ({ className, inset, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex cursor-pointer items-center rounded-md px-4 py-2 text-sm transition-transform duration-150 hover:bg-gray-100 dark:hover:bg-zinc-900 active:scale-95",
        inset && "pl-8",
        className
      )}
      onClick={props.onClick}
      {...props}
    >
      {children}
    </div>
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

// Dropdown Menu Checkbox Item
const DropdownMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  _IDropdownCheckboxItemProps
>(({ className, children, checkboxClassName, checked, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-pointer items-center rounded-md px-4 py-2 text-sm hover:bg-gray-100 transition-transform duration-150 active:scale-95",
      className
    )}
    {...props}
  >
    <span
      className={cn(
        "absolute rounded-sm border flex h-3.5 w-3.5 items-center justify-center",
        checkboxClassName
      )}
    >
      {checked && <CheckIcon className={cn("h-4 w-4")} />}
    </span>
    {children}
  </div>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

// Dropdown Menu Radio Item
const DropdownMenuRadioItem = forwardRef<
  HTMLDivElement,
  _IDropdownRadioItemProps
>(({ className, radioClassName, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-pointer items-center rounded-md px-4 py-2 text-sm hover:bg-gray-100 transition-transform duration-150 active:scale-95",
      className
    )}
    {...props}
  >
    <span
      className={cn(
        "absolute border border-neutral-500 rounded-full flex h-3.5 w-3.5 items-center justify-center"
      )}
    >
      <div className={cn("rounded-full", radioClassName)} />
    </span>
    {children}
  </div>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

// Dropdown Menu Sub Trigger
const DropdownMenuSubTrigger = forwardRef<
  HTMLDivElement,
  _IDropdownSubMenuProps
>(
  (
    { className, trigger, position, style = {}, inset, children, ...props },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-pointer items-center rounded-md px-4 py-2 text-sm hover:bg-gray-100 transition-transform duration-150 active:scale-95",
          inset && "pl-8",
          className
        )}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {trigger}
        <ChevronRightIcon className="ml-auto h-4 w-4" />
        {open && (
          <DropdownMenuSubContent position={position} style={style}>
            {children}
          </DropdownMenuSubContent>
        )}
      </div>
    );
  }
);
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

// Dropdown Menu Sub Content
const DropdownMenuSubContent: React.FC<
  _IDropdownMenuSubContentProps
> = ({ style, position, className, children }) => (
  <div
    className={cn(
      "absolute top-0 w-48 mt-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200",
      position === "right" ? "left-full" : "right-full",
      className
    )}
    style={style}
  >
    {children}
  </div>
);

// Dropdown Menu Separator
const DropdownMenuSeparator: React.FC = () => (
  <div className="border-t border-gray-200 my-1"></div>
);

// Dropdown Menu Label
const DropdownMenuLabel: React.FC<_TDropdownMenuLabelProps> = ({
  className,
  inset,
  children,
}) => (
  <div
    className={cn(
      "px-4 py-2 text-sm font-semibold text-gray-700",
      inset && "pl-8",
      className
    )}
  >
    {children}
  </div>
);

// Shortcut key helper
const DropdownMenuShortcut: React.FC<_IDropdownItemProps> = ({
  className,
  children,
}) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)}>
    {children}
  </span>
);

export { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuShortcut, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, DropdownMenuSeparator}
