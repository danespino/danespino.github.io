import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Button from '../../components/ui/Button';
import LoadingScreen from "./LoadingScreen";

export function LoginPage() {
    const { isAuthenticated, isLoading, loginWithProvider } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            const origin = location.state?.from?.pathname || '/';
            navigate(origin, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    if(isLoading){
        return <LoadingScreen message="Checking your session..." />
    }

    if(isAuthenticated) return null;

    return (
        <div className="min-h-screen">
            <div className="flex flex-col md:h-screen md:-mb-16 md:flex-row">
                <div className="flex flex-col w-full items-center md:flex-row md:justify-center md:w-1/2">
                    <img src="./images/instantfolio_lite.svg" alt="InstantFolio Lite by Dan Espino" title="InstantFolio Lite by Dan Espino" className="w-2/3 md:w-1/3" />
                </div>
                <div className="flex flex-row w-full py-3 md:w-1/2 md:py-0 items-center-safe justify-around">
                    <div className="flex flex-col w-3/4 items-center justify-start *:w-2/3 *:border">
                        <Button size="medium" variant="outlineDark" className="font-bold rounded-lg" onClick={()=> loginWithProvider('Microsoft')}>Login with Microsoft</Button>
                        <Button size="medium" variant="outlineDark" className="font-bold rounded-lg" onClick={()=> loginWithProvider('Google')}>Login with Google</Button>
                        <Button size="medium" variant="outlineDark" className="font-bold rounded-lg">Login with Facebook</Button>
                        <Button size="medium" variant="outlineDark" className="font-bold rounded-lg">Login with Instagram</Button>
                        <Button size="medium" variant="outlineDark" className="font-bold rounded-lg">Login with LinkedIn</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full justify-around md:flex-row md:pt-0">
                <div className="flex flex-col w-full">
                    <div className="grid grid-flow-col-dense grid-cols-4 gap-3 content-center *:text-center">
                        <div className="">About</div>
                        <div className="">About</div>
                        <div className="">Privacy</div>
                        <div className="">Terms</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-col p-1">
                    <select name="lang" id="">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                    </select>
                </div>
                <div className="flex flex-col p-1">&copy; 2025. InstantFolio by Dan Espino</div>
            </div>
        </div>
    )
}