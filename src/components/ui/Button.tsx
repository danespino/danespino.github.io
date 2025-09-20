import { type ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    variant?: 'primary' | 'secondary' | 'danger' | 'alert' | 'success' | 'primaryOutline' | 'secondaryOutline' | 'dangerOutline' | 'alertOutline' | 'successOutline' | 'dark' | 'outlineDark';
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    size = 'medium',
    variant = 'custom',
    onClick,
    className = 'rounded',
    disabled = false,
}) => {
    const sizeClasses = {
        small: 'text-sm px-3 py-1.5',
        medium: 'text-base px-4 py-2',
        large: 'text-lg px-6 py-3',
        xlarge: 'text-xl px-8 py-4',
    }[size];

    const variantClasses = {
        primary: 'bg-primary text-white',
        secondary: 'bg-gray-500 text-white',
        danger: 'bg-red-500 text-white',
        alert: 'bg-yellow-500 text-white',
        success: 'bg-green-500 text-white',
        primaryOutline: 'border border-blue-500 text-blue-500',
        secondaryOutline: 'border border-gray-500 text-gray-500',
        dangerOutline: 'border border-red-500 text-red-500',
        alertOutline: 'border border-yellow-500 text-yellow-500',
        successOutline: 'border border-green-500 text-green-500',
        dark: 'border border-gray-700 text-white bg-dark hover:bg-gray-700',
        outlineDark: 'border border-gray-700 text-gray-700 bg-white',
        custom: ''
    }[variant];

    const styleClasses = disabled ? 
        `${sizeClasses} ${variantClasses} ${className} cursor-not-allowed opacity-50` : 
        `${sizeClasses} ${variantClasses} ${className} cursor-pointer`;

    return (
        <button className={`${styleClasses} mx-2 my-1`}
         onClick={onClick}
         disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;