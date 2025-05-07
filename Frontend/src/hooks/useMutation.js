import { useState } from "react";
import apiHandler from "../functions/apiHandler";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/features/user/userSlice";

const useMutation = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const mutate = async (query) => {
    setLoading(true);
    try {
      const response = await apiHandler(query);
      console.log(response, "response from useMutation");
      if (response.status === 403) {
        handleLogout();
      }
      setData(response);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, mutate };
};

export default useMutation;
