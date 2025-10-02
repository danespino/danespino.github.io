import { useTheme } from '../../../../context/UIProvider';
import Switch from '../../switch';

export default function ThemePanel() {
    const { theme, resolvedTheme, toggleTheme } = useTheme();

    const isDarkMode = theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark');

    return (
        <div className="space-y-1">
            <hr className="w-full border-t border-[#DBDBDB] dark:border-[#343434]" />
            <div className="flex justify-around rounded-2xl px-3 py-3">
                <Switch label='Dark Mode' checked={isDarkMode} color="gray-900" aspect="small" 
                className='justify-around' onChange={()=> toggleTheme()} />
            </div>
        </div>
    );
}