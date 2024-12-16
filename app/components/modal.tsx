import { ReactNode, useRef, useEffect } from "react";

interface ModalProps {
  closeModal: () => void;
  children: ReactNode;
}

export const Modal = ({ children, closeModal }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element;

    if (modalRef.current && modalRef.current === target) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-30">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
        <div
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          ref={modalRef}
        >
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
