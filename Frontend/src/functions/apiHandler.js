import axios from "axios";
import { getToken } from "../imports/localStorage";
import BACKEND_URL from "../imports/baseUrl";
import { showToast } from "../utils/toast";

export default async function apiHandler(query) {
  const token = getToken();

  const { method = "GET", skipToken, contentType, data, params, url } = query;
  const config = {
    method: method,
    url: `${BACKEND_URL}${encodeURI(url)}`,
    headers: {
      "Content-Type": contentType || "application/json",
      Authorization: skipToken ? "" : `Bearer ${token}`,
    },
    data: data,
    params: params,
  };
  if (!token || skipToken) {
    config.headers.Authorization = "";
  }

  try {
    const response = await axios(config);
    const result = {
      data: response.data,
      status: response.status,
      success: true,
    };
    if (response.data?.message && method != "GET") {
      showToast.success(response.data.message);
    }
    return result;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    const status = error.response?.status || 500;
   

    // Only show toast for non-403 errors

    if (status === 500) {
      showToast.error(errorMessage);
    } else if (
      status === 403 ||
      status === 400 ||
      status === 404 ||
      status === 401 ||
      status === 413
    ) {
      showToast.warn(errorMessage);
    }

    return {
      data: error.response?.data || error.message,
      status: status,
      success: false,
      error: errorMessage,
    };
  }
}
