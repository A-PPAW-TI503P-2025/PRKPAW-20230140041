import React, { useState, useEffect } from 'react'; // <-- Tambahkan useState
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function DashboardPage() {
    const navigate = useNavigate(); 
    const token = localStorage.getItem('token');
    
    // Gunakan State untuk menyimpan data pengguna
    const [userData, setUserData] = useState({ name: 'Pengguna', role: 'N/A' });
    const [isLoading, setIsLoading] = useState(true); // State untuk loading

    // Lakukan pengecekan dan parsing token di useEffect
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setUserData({
                name: decoded.name || decoded.email || 'Pengguna',
                role: decoded.role || 'N/A',
            });
            setIsLoading(false); // Data berhasil dimuat
        } catch (error) {
            console.error("Token tidak valid:", error);
            localStorage.removeItem('token'); 
            navigate('/login');
        }
    }, [token, navigate]);

    // Tampilkan loading screen/redirect placeholder
    if (isLoading || !token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl">Memverifikasi sesi...</p>
            </div>
        );
    }

    // Fungsi Logout
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login'); 
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
            <div className="bg-white p-10 rounded-xl shadow-2xl text-center w-full max-w-xl">
                <h1 className="text-4xl font-extrabold text-green-700 mb-2">
                    ✅ Login Sukses!
                </h1>
                <p className="text-xl text-gray-800 mb-2">
                    Selamat Datang, **{userData.name}**!
                </p>
                
                <p className="text-sm text-gray-500 mb-8">
                    Role Anda saat ini: **{userData.role.toUpperCase()}**
                </p>
                
                <button
                    onClick={handleLogout}
                    className="mt-4 py-3 px-8 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition duration-150 transform hover:scale-105"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;