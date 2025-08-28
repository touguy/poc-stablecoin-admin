import React from "react";

interface CommonModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

const Modal = ({
  open,
  handleClose,
  title,
  children,
  width = "50%",
}: CommonModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1301] flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-[20px] overflow-y-auto max-h-[80%]"
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center px-5 py-3">
            <h2 className="text-[#191b1c] text-[16px] font-bold leading-6 tracking-[-0.4px]">
              {title}
            </h2>
            <button onClick={handleClose} className="w-6 h-6">
              &#x2715;
            </button>
          </div>
          <div className="border-t border-gray-200" />
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
