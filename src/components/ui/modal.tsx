import { cn } from "@/utils";
import { ModalContext } from "@/utils/contexts/modal.context";
import { useOutsideClick } from "@/utils/hooks/useOutsideClick";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode, useEffect, useRef, useCallback, use } from "react";
import { useNavigate } from "react-router-dom";

const ModalTrigger = ({
  children,
  modalKey,
  className,
}: {
    children: ReactNode;
    modalKey: string;
  className?: string;
}) => {
  const { setOpen } = use(ModalContext);

  const openModal = useCallback(() => {
    setOpen(modalKey, true); // Open the modal with the given key
  }, [setOpen, modalKey]);

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden",
        className
      )}
      onClick={openModal}
    >
      {children}
    </button>
  );
};

const ModalBody = ({
  children,
  modalKey,
  className,
  intercepted = false,
  closeModal: parentCloseModal
}: {
    children: ReactNode;
    modalKey: string;
    className?: string;
    intercepted?: boolean;
  closeModal?: () => void,
}) => {
  const { isOpen, setOpen } = use(ModalContext);
  const modalRef = useRef(null);
  const router = useNavigate();

  const internalCloseModal = useCallback(() => {
      const goBack = () => router(-1);
    setOpen(modalKey, false);
    if (intercepted) {
      goBack();
    }
  }, [intercepted, modalKey, router, setOpen]);

  // Use parent's closeModal if provided, otherwise fallback to internalCloseModal
  const closeModal = parentCloseModal || internalCloseModal;

  useOutsideClick(modalRef, closeModal);

  useEffect(() => {
    document.body.style.overflow = isOpen(modalKey) ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [isOpen, modalKey]);

  return isOpen(modalKey) ? (
    <div className="">
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Overlay />
        <div
          ref={modalRef}
          className={cn(
            "min-h-[60%] max-h-[90%] max-w-[90%] md:min-h-[40%] md:max-w-[70%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 rounded-lg md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-auto transition-all duration-300 ease-in-out transform",
            "opacity-100 scale-100 hide-horizontal-scrollbar",
            className
          )}
        >
          <XMarkIcon
            onClick={closeModal}
            className="absolute top-4 right-4 cursor-pointer w-6 h-6 rounded-full hover:bg-neutral-00 dark:hover:bg-neutral-800"
          />
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col flex-1 py-8 px-6 md:p-10", className)}>
    {children}
  </div>
);

const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex justify-end p-4 bg-gray-100 dark:bg-neutral-900",
      className
    )}
  >
    {children}
  </div>
);

const Overlay = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "fixed inset-0 h-full w-full bg-black bg-opacity-70 dark:bg-opacity-60 z-50",
      className
    )}
  />
);

export { 
  ModalBody, ModalContent, ModalFooter, ModalTrigger
}
