import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../services/api";
import { format } from 'date-fns';

interface UserData {
  name: string;
  email: string;
  create_at: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState<UserData | null>(null);

  const userID = location.state?.userID;

  function handleLogout() {
    setUserData(null);
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  }

  useEffect(() => {
    async function getUserData() {
      try {
        const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');
        if (token && userID) {
          const response = await api.get(`/login?id=${userID}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUserData(response.data);
        }
      } catch (error) {
        alert((error as any).response.data.message);
      }
    }
    getUserData();
  }, [userID]);

  const formatedDate = userData?.create_at ? format(new Date(userData.create_at), 'dd/MM/yyyy HH:mm:ss') : '';

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center px-4">
      <main className="my-10 w-2/4 lg:w-1/4">
        <section className="flex flex-col bg-white p-4 shadow-md rounded-sm">
          <p><span className="font-medium">Nome: </span> {userData?.name}</p>
          <p><span className="font-medium">Email: </span> {userData?.email}</p>
          <p><span className="font-medium">Criado em: </span> {formatedDate}</p>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-md mt-4">Sair</button>
        </section>
      </main>
    </div>
  );
}
