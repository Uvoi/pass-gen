import { useState } from "react";
import { Button } from "../Button/Button";
import { X } from "lucide-react";

type ModalProps = {
    trigger: React.ReactNode;
    children: ((close: () => void) => React.ReactNode) | React.ReactNode;
    onOpen?: () => void;
};

export const Modal = ({ trigger, children, onOpen }: ModalProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        onOpen?.();
        setOpen(true);
    };

    const close = () => setOpen(false);

    return (
        <>
            <div onClick={handleOpen}>{trigger}</div>

            {open && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={close}
                >
                    <div
                        className="bg-[#1a1a1a] rounded-xl p-6 min-w-80 max-w-lg w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end mb-12">
                            <Button onClick={close} className="p-2! text-sm bg-inherit"><X width={30} height={30}/></Button>
                        </div>
                        {typeof children === "function" ? children(close) : children}
                    </div>
                </div>
            )}
        </>
    );
};
