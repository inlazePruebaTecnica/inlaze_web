import { useEffect } from "react";
import { useRouter } from "next/router";
import request from "../utils/request"; 

const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const protectRoute = async () => {
      const publicRoutes = ["/login", "/register"];
      const currentPath = router.pathname;

      if (!publicRoutes.includes(currentPath)) {
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const res = await request("auth/verifyToken", null, {
              method: "POST",
              body: JSON.stringify({ token }),
            });

            if (!res.valid) {
              router.replace("/login"); 
            }
            // router.replace("/dashboard"); 
          } catch (error) {
            console.error("Error verifying token:", error);
            router.replace("/login"); 
          }
        } else {
          router.replace("/login"); 
        }
      }
    };

    protectRoute();
  }, [router.pathname]);
};

export default useAuthGuard;
