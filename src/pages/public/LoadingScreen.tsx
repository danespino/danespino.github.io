import PreloaderLogo from "../../components/ui/logo/preloader";

export default function LoadingScreen({ message = 'Loading...'}){
    return (
        <div className="flex w-full h-full relative items-center justify-center">
            <PreloaderLogo width={1843} height={533} />
            <div className="fixed flex bottom-10 w-full inset-x-1/2 font-bold text-2xl text-black dark:text-white">
                {message}
            </div>            
        </div>
    )
}