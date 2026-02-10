import * as HeroIconsOutline from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';
import * as BsIcons from 'react-icons/bs';
import React, { lazy, Suspense } from 'react';

export type IconLibrary = 'hero' | 'bootstrap' | 'custom';
export type HeroVariant = 'outline' | 'solid';

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

interface IconChildProps {
  size?: number | string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

const toPascal = (kebab = '') =>
  kebab
    .split(/[-_\s]+/g)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');

const heroExportName = (name: string) => `${toPascal(name)}Icon`;
const bsExportName   = (name: string) => `Bs${toPascal(name)}`;

const sizeStyle = (size?: number | string): React.CSSProperties | undefined => {
  if (size === undefined) return undefined;
  return typeof size === 'number'
    ? { width: size, height: size }
    : { width: size, height: size };
};

/**
 * Return a JSX element (not a component type).
 * - For heroicons: use <title> child for a11y.
 * - For react-icons/bs: pass size and title as props (supported).
 */
const generateComponent = (
  library: IconLibrary,
  name: string,
  iconProps: IconChildProps = {},
  variant?: HeroVariant
): React.ReactNode | undefined => {
  if (library === 'hero') {
    const exportName = heroExportName(name);
    const pack = variant === 'solid' ? HeroIconsSolid : HeroIconsOutline;
    const Cmp = pack[exportName as keyof typeof pack] as
      | React.ComponentType<React.SVGProps<SVGSVGElement>>
      | undefined;
    if (!Cmp) return undefined;

    return (
      <Cmp className={iconProps.className} style={iconProps.style} aria-label={iconProps.title}>
        {iconProps.title ? <title>{iconProps.title}</title> : null}
      </Cmp>
    );
  }

  if (library === 'bootstrap') {
    const exportName = bsExportName(name);
    const Cmp = BsIcons[exportName as keyof typeof BsIcons] as
      | React.ComponentType<{ className?: string; size?: string | number; title?: string }>
      | undefined;
    if (!Cmp) return undefined;

    return (
      <Cmp className={iconProps.className} size={iconProps.size} title={iconProps.title} />
    );
  }

  return undefined;
};

const Icon: React.FC<IconProps> = ({
  name = 'custom_icon',
  library,
  variant = 'outline',
  path = '',
  size = 24,
  className = '',
  onClick,
  title,
}) => {
  const style = sizeStyle(size);

  if (path) {
    const normalized = path.replace(/\.svg$/i, '');
    const SvgIcon = lazy(() => import(`../assets/icons/${normalized}.svg?react`));
    return (
      <Suspense fallback={<div className={className} style={style} />}>
        <SvgIcon className={className} style={style} onClick={onClick} />
      </Suspense>
    );
  }

  let element: React.ReactNode | undefined;

  // If library is explicitly declared, build immediately
  if (library) {
    element = generateComponent(
      library,
      name,
      { size, className, title, style },
      variant
    );
  } else if (name) {
    // Support full-qualified "library-variant/icon-name" or "library/icon-name"
    // Examples: "hero-solid/academic-cap", "hero-outline/academic-cap", "bootstrap/alarm-fill"
    if (name.includes('/')) {
      const [libq, iconName] = name.split('/');
      const [libMaybe, varMaybe] = libq.split('-');
      const lib = libMaybe as IconLibrary;
      const varResolved = (varMaybe as HeroVariant) || undefined;

      element = generateComponent(
        lib,
        iconName,
        { size, className, title, style },
        varResolved
      );
    }
  }

  // If we built an icon element, wrap it so we can attach click/aria uniformly
  if (element) {
    const clickable = typeof onClick === 'function';
    return (
      <span
        className='mx-0.5'
        onClick={onClick}
        title={title}
        role={clickable ? 'button' : 'img'}
        aria-label={title}
        tabIndex={clickable ? 0 : -1}
        style={
          typeof size === 'number' || typeof size === 'string'
            ? { width: size, height: size, display: 'inline-flex' }
            : undefined
        }
      >
        {element}
      </span>
    );
  }

  // Fallback: nothing resolved
  return <div className={className} style={style} onClick={onClick} aria-label={title} title={title} />;
};

export default Icon;
