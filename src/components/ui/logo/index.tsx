interface LogoProps {
    url?:string;
    isotype?: boolean;
    width: number;
    height?: number;
    altText?: string;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({
    url,
    isotype = false,
    width,
    height,
    altText,
    className
}) => {
    const logoWidth = (!width) ? 276 : width;
    const logoHeight = (!height) ? 80 : height;

    const baseClasses = "mb-2";

    if(!isotype) {
        return (
            <div className={`${baseClasses} `}>
                <a href={url ? url : `# ${width}`}>
                    <img src="/public/images/logo.svg" alt="" width={logoWidth} height={logoHeight} />
                </a>
            </div>
        );
    } else {
        return (
            <div className={`${baseClasses} `}>
                <a href={url ? url : "#"}>
                    <img src="/public/images/isotype.svg" alt="" width={logoWidth} height={logoHeight} />
                </a>
            </div>
        );
    }
}

export default Logo;