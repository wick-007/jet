import React, { useEffect } from "react";

// Define the type of the callback function
type _TCallback = (event: MouseEvent | TouchEvent) => void;
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: _TCallback
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
