import { Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Modal } from "./Modal";
import { Slider } from "../Slider/Slider";

export type GenerateSettings = {
    iterations: number;
    memorySize: number;
    hashLength: number;
};

export const defaultSettings: GenerateSettings = {
    iterations: 3,
    memorySize: 65536,
    hashLength: 16,
};

type SettingsModalProps = {
    settings: GenerateSettings;
    onChange: (s: GenerateSettings) => void;
};

export const SettingsModal = ({ settings, onChange }: SettingsModalProps) => {
    const [local, setLocal] = useState(settings);

    const update = (key: keyof GenerateSettings, value: number) =>
        setLocal((prev) => ({ ...prev, [key]: value }));

    const handleApply = (close: () => void) => {
        onChange(local);
        close();
    };

    return (
        <Modal
            trigger={
                <Button onClick={() => {}} className="w-fit bg-gray-600">
                    <Settings height={30} width={30} />
                </Button>
            }
            onOpen={() => setLocal(settings)}
        >
            {(close) => (
                <div className="flex flex-col gap-16">
                    <div className="flex flex-col gap-8">
                        <Slider
                            label="Iterations"
                            value={local.iterations}
                            min={3}
                            max={10}
                            onChange={(v) => update("iterations", v)}
                        />
                        <Slider
                            label="Memory"
                            value={local.memorySize}
                            min={65536}
                            max={262144}
                            step={65536}
                            display={(v) => `${v / 1024}MB`}
                            onChange={(v) => update("memorySize", v)}
                        />
                        <Slider
                            label="Password length"
                            value={local.hashLength}
                            min={16}
                            max={32}
                            onChange={(v) => update("hashLength", v)}
                        />
                    </div>
                    <Button onClick={() => handleApply(close)} className="w-full">
                        Apply
                    </Button>
                </div>
            )}
        </Modal>
    );
};
