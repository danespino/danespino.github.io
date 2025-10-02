import { useBreakpoint } from "../../../context/UIProvider"
import Button from "../Button";

export default function Logo(){
    const { xl, hydrated } = useBreakpoint();

    if(!hydrated) return null;

    if(xl) {
        return (
            <div className="flex items-center">
                <img src="/public/images/logo.svg" className="mb-4" />
            </div>
        )
    }
    return (
        <div className="flex justify-around md:justify-center">
            <img src="/public/images/isotype.svg" className="w-24 h-auto md:w-2/3 md:mb-2" />
            <Button size="medium" className="block h-12 mt-3 border-3 border-red-600 rounded-lg bg-red-800 font-extrabold text-white md:hidden hover:bg-red-700">Sign In</Button>
        </div>
    )
}