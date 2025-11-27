import { useBreakpoint } from "../../../context/UIProvider"

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
        </div>
    )
}