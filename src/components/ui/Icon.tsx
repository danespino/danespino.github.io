import * as HeroIconsOutline from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';
import * as BsIcons from 'react-icons/bs';
import { lazy, Suspense } from 'react';

type IconLibrary = 'hero' | 'bootstrap' | 'custom';
type HeroVariant = 'outline' | 'solid';

interface IconProps {
  /** kebab-case for both hero and bootstrap e.g. "academic-cap", "alarm-fill" */
  name?: string;
  /** which icon library to use */
  library?: IconLibrary;
  /** hero variant */
  variant?: HeroVariant;
  /** pixel number (24) or css size string ("1.5rem", "24px") */
  size?: number | string;
  className?: string;
  onClick?: () => void;
  /** for library="custom": relative path under ../assets/icons/ without extension is fine */
  path?: string;
  /** optional title/label for a11y tooltips */
  title?: string;
}

/** "academic-cap" -> "AcademicCap"  | "alarm-fill" -> "AlarmFill" */
const toPascal = (kebab = '') =>
  kebab
    .split(/[-_\s]+/g)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');

/** hero needs "AcademicCapIcon" */
const heroExportName = (name: string) => `${toPascal(name)}Icon`;
/** react-icons/bs needs "BsAlarmFill" */
const bsExportName = (name: string) => `Bs${toPascal(name)}`;

/** Normalize size for both libraries */
const sizeStyle = (size?: number | string) => {
  if (size === undefined) return undefined;
  if (typeof size === 'number') return { width: size, height: size };
  // if string, let className control dimensions; heroicons will respect inline style if you still pass it
  return { width: size, height: size };
};

const Icon: React.FC<IconProps> = ({
  name = 'custom_icon',
  library = 'hero',
  variant = 'outline',
  path = '',
  size = 24,
  className = '',
  onClick,
  title,
}) => {
  const style = sizeStyle(size);

  if (library === 'hero') {
    const exportName = heroExportName(name);
    const pack = variant === 'solid' ? HeroIconsSolid : HeroIconsOutline;
    const IconComponent =
      pack[exportName as keyof typeof pack] as
        | React.ComponentType<React.SVGProps<SVGSVGElement>>
        | undefined;

    if (IconComponent) {
        const isClickable = typeof onClick === 'function';

        return (
            <span
                onClick={onClick}
                title={title}
                role={isClickable ? 'button' : 'img'}
                aria-label={title}
                tabIndex={isClickable ? 0 : -1}
                style={
                    typeof size === 'number' || typeof size === 'string' ? { width: size, height: size, display: 'inline-flex'} : undefined
                }
            >
                <IconComponent
                    className={className}
                    style={size ? ((typeof size === 'number') ? { width: size, height: size} : { width: size, height: size}): undefined}
                >
                    {title ? <title>{title}</title> : null}
                </IconComponent>
            </span>
        );
    }
  }

  if (library === 'bootstrap') {
    const exportName = bsExportName(name);
    const BsComponent =
      BsIcons[exportName as keyof typeof BsIcons] as
        | React.ComponentType<{ className?: string; size?: string | number; title?: string }>
        | undefined;

    if (BsComponent) {
        const isClickable = typeof onClick === 'function';

        return (
            <span
                onClick={onClick}
                title={title}
                role={isClickable ? 'button' : 'img'}
                aria-label={title}
                tabIndex={isClickable ? 0 : -1}
                className={className}
                style={typeof size === 'number' ? { width: size, height: size, display: 'inline-flex'} : undefined}
            >
                <BsComponent size={size} title={title} />
            </span>
        );
    }
  }

  if (library === 'custom' || name === 'custom_icon') {
    if (path) {
      let normalized = path.replace(/\.svg$/i, '');
      const SvgIcon = lazy(() => import(`../assets/icons/${normalized}.svg?react`));
      return (
        <Suspense fallback={<div className={className} style={style} />}>
          <SvgIcon className={className} style={style} onClick={onClick} />
        </Suspense>
      );
    }
  }

  return <div className={className} style={style} onClick={onClick} aria-label={title} title={title} />;
};

export default Icon;
