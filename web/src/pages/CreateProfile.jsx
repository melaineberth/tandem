import React from 'react'
import MainBtn from '../components/MainBtn'
import { useAuth } from "../context/AuthContext";

export default function CreateProfile() {    
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }
    return <div>
        <h1>Création de profile</h1>
        <MainBtn label="Logout" type="button" isLoading={false} onClick={handleLogout} />
    </div>
}