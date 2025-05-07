import { useEffect, useState } from "react";
import apiHandler from "../functions/apiHandler";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/features/user/userSlice";

export default function useQuery(url, skip) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiHandler({ url });
      if (response.status === 403) {
         handleLogout();
      }
      setData(response);
    } catch (error) {
      console.error("API fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (skip || !url) return;


    fetchData();
  }, [url, skip]);

  return { data, loading ,refetch:fetchData};
}
