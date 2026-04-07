import { useState } from "react";
import { Eye, EyeOff, Copy } from "lucide-react";
import { Button } from "../Button/Button";

type InputProps = 
{
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    rightAddon?: 'visible' | 'copy';
    type?: 'text' | 'password';
    disabled?: boolean;
    error?: boolean;
}

export const Input = (props: InputProps) =>
{
    const {placeholder, value, onChange, className, rightAddon, type = 'text', disabled, error} = props;

    const [inputType, setInputType] = useState(type);

    const handleVisibleToggle = () =>
    {
        setInputType(prev => prev === 'text' ? 'password' : 'text');
    }

    const handleCopy = () =>
    {
        navigator.clipboard.writeText(value);
    }
    

    return(
        <div className={`flex items-stretch gap-2 border-2 rounded-lg h-fit ${error ? 'border-red-500' : 'border-[#b9a6b3]'}`}>
            <input 
                className={
                    `text-[#ffffff] w-full h-full py-2 px-2 text-2xl focus-visible:outline-none ${className}`
                }
                type={inputType} 
                value={value} 
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                disabled={disabled}
            />      
                
            {rightAddon === 'visible' &&
                <Button onClick={handleVisibleToggle} className="aspect-square hover:opacity-20 p-2! bg-inherit">
                    {inputType === "password" 
                        ? <Eye height={30} width={30}/> 
                        : <EyeOff height={30} width={30}/>
                    }
                </Button>
            }
            {rightAddon === 'copy' &&
                <Button onClick={handleCopy} className="aspect-square hover:opacity-20 p-2! bg-inherit">
                    <Copy/>
                </Button>
            }
        </div>
    )
}