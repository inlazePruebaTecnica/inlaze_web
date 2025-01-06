import "@/styles/globals.css";
import "primeicons/primeicons.css";
import Image from "next/image";
import logo from "../../public/img/logo.png";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import useAuthGuard from "@/hooks/useAuthGuard";
import useToken from "@/hooks/useToken";
import request from "@/utils/request";

export default function Layout({ children }) {
  useAuthGuard();
  const { removeToken, token } = useToken();
  const [showNav, setShowNav] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  const logout = () => {
    removeToken();
    router.push("/login");
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  useEffect(() => {
    if (router.pathname == "/login" || router.pathname == "/register") {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [router]);

  useEffect(() => {
    (async () => {
      if (token) {
        const id = localStorage.getItem("userId");
        const res = await request("tasks/comments/" + id, token);
        if (res.length > 0)
          setNotifications(
            res.map((comment) => ({ id: comment.id, message: comment.title }))
          );
      }
    })();
  }, [token]);

  return (
    <div className="w-[100%] h-auto bg-[--background]">
      {showNav && (
        <div className="py-3 w-full flex justify-around">
          <Image
            onClick={() => router.push("/dashboard")}
            className="hover:cursor-pointer  w-[15rem] mb-10"
            src={logo}
          />
          <div className="flex gap-6 relative">
            <i
              className="hover:cursor-pointer  pi pi-bell "
              style={{ fontSize: "2rem", color: "#fff" }}
              onClick={toggleNotifications}
            >
              {" "}
              {notifications.length > 0 && (
                <div className="relative top-[-30] bg-red-500 h-[10px] w-[10px] rounded-full"></div>
              )}
            </i>

            {showNotifications && (
              <div className="absolute top-12 right-0 w-[250px] bg-white p-4 rounded-lg shadow-md z-10">
                <h3 className="font-semibold text-lg mb-2">Notificaciones</h3>
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-2 rounded-lg ${
                        notification.read ? "bg-gray-100" : "bg-blue-100"
                      }`}
                    >
                      <span className="text-gray-500">
                        {notification.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <i
              className="hover:cursor-pointer  pi pi-sign-out"
              style={{ fontSize: "2rem", color: "#fff" }}
              onClick={logout}
            ></i>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
