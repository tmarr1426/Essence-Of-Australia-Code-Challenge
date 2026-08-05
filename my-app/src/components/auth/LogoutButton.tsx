import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


export default function LogoutButton() {

    const { logout } = useAuth();

    const navigate = useNavigate();


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (

        <button 
        className="rounded-xl
    bg-white
    shadow-md
    p-6
    border
    border-gray-200
    flex
    justify-center"
        onClick={handleLogout}>
            Logout
        </button>

    );

}