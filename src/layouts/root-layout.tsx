import { FC } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/utils";

const RootLayout: FC = () => {
  return (
    <div
      className={cn(
        "flex flex-col  bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700",
        "h-screen overflow-hidden w-full"
      )}
    >
      {/* Content goes here */}
      <Outlet />
    </div>
  );
};

export default RootLayout;
