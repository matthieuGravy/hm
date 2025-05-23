import React, { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modalStore";

interface ModalProps {
  children: ReactNode;
  type: "signup" | "login";
}

export const Modal: React.FC<ModalProps> = ({ children, type }) => {
  const { activeModal, closeModal } = useModalStore();
  const isOpen = activeModal === type;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-background rounded-lg shadow-lg max-w-md w-full mx-auto overflow-hidden">
            <div className="flex justify-end p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="px-6 pb-6">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
