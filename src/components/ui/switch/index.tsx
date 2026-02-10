import { useId } from "react";
import { useContrastColor } from "../../../hooks/ui/useContrastColor";

interface SwitchProps {
    label:string;
    checked: boolean;
    aspect?: 'small' | 'medium' | 'large' | 'xlarge';
    color?: string;
    onClick?: () => void;
    onChange?: (val: boolean) => void;
    className?:string;
}

const Switch: React.FC<SwitchProps> = ({
    label,
    checked,
    aspect = 'medium',
    color = 'black',
    onClick,
    onChange,
    className
}) => {
    const aspectBeforeClass = "before:absolute before:rounded-full before:border before:transition-all before:duration-500 peer-checked:before:bg-white";

    const aspectSizeClasses = {
        small:  'w-10 h-6 p-0.5',
        medium: 'w-14 h-8 p-0.25',
        large:  'w-18 h-10 p-1',
        xlarge: 'w-20 h-11 p-1.25',
    }[aspect];

    const aspectSizeBeforeClasses = {
        small:  'before:w-4 before:h-4 before:p-1.75 before:left-0.5 peer-checked:before:left-4.75',
        medium: 'before:w-7 before:h-7 before:p-1 before:left-0.75 peer-checked:before:left-5.5',
        large:  'before:w-7.5 before:h-7.75 before:p-1 before:left-0.75 peer-checked:before:left-9',
        xlarge: 'before:w-8.25 before:h-8.25 before:p-1.5 before:left-0.75 peer-checked:before:left-10',
    }[aspect];

    const aspectBeforeClasses = `${aspectSizeBeforeClasses} ${aspectBeforeClass}`;

    const labelTextSize = {
        small:  'text-xs',
        medium: 'text-sm',
        large:  'text-md',
        xlarge: 'text-lg',
    }[aspect];

    const id = useId();
    const { baseBgClass } = useContrastColor(color);

    return (
        <div className={`flex w-full ${className}`}>
            <label htmlFor={id} className="mr-3 cursor-pointer select-none">
                <span className={`${labelTextSize}`}>{label}</span>
            </label>
            <label htmlFor={id} className="cursor-pointer">
                <input type="checkbox" id={id} className="sr-only peer" checked={checked} onChange={(e) => onChange?.(e.target.checked)} />
                <div onClick={onClick} className={`block relative rounded-full border border-black dark:border-gray-400 ${aspectSizeClasses} ${baseBgClass} ${aspectBeforeClasses}`}></div>
            </label>
        </div>
    )
}

export default Switch;