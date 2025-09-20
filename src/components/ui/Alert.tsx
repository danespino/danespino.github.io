import { useState } from "react";
import Icon from "./Icon";

interface AlertProps {
  variant: "info" | "success" | "error" | "warning" | "undefined";
  title?: string;
  message: string;
  showIcon?: boolean;
  linkHref?: string;
  linkText?: string;  // If linkText set to default, will show Learn More.. If null or not present, will show Href as value
  closable?: boolean
  className?: string;
  children?: React.ReactNode | string;  
}

const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  message,
  linkHref,
  linkText,
  closable = true,
  className = 'mx-2 my-1.5 px-4.5 py-2.5 rounded-lg',
  children
}) => {
  
    const [isVisible, setIsVisible] = useState(true);

    const variantClasses = {
      info: {
        container: "bg-blue-400/50 border border-blue-400 text-blue-900",
        icon: <Icon name="information-circle" className="text-white font-bold" size="1.5rem"></Icon>
      },
      success: {
        container: "bg-green-400/50 border border-green-400 text-white", 
        icon: ''
      },
      error: {
        container: "bg-red-900/50 border border-red-900 text-white",
        icon: '',
      },
      warning: {
        container: "bg-yellow-400/50 border border-yellow-400 text-gray-900",
        icon: <Icon name="exclamation-triangle" size={6} className="text-white font-bold"></Icon>
      },
      undefined: {
        container: "bg-gray-400/50 border border-gray-900 text-gray-900",
        icon: '',
      }
    }

    let alertClasses = `${variantClasses[variant].container} ${className} relative`;
    let iconType = variantClasses[variant].icon;

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (closable) {
        setIsVisible(false);
      }
    };

    return isVisible ? (
      <div className={alertClasses}>
        <div>
          <div className="flex leading-none">{iconType} {title && <span className="text-xl font-bold">{title}</span>}</div>
            { children ? 
                <>
                    <>{children}</>
                </> 
                : 
                <>
                    <p>{message}</p>
                </>
            }
            {linkHref && (
                <a href={linkHref} target='_blank' className="alert-link font-bold">
                    {linkText === "default" ? "Learn More.." : linkText}
                </a>
            )}
        </div>
        
        {closable && (
          <button 
            type="button"
            className="text-gray-900 hover:text-gray-700 absolute -right-2 top-0 cursor-pointer transition-opacity duration-200 hover:opacity"
            onClick={handleClose}
            aria-label="Close alert"
          >
            <Icon name="x-circle" className="" size={6} />
          </button>
        )}
      </div>
    ) : null;           
};

export default Alert;