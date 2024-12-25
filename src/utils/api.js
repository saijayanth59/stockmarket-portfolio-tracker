import axios from "axios";

export const signIn = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (err) {
    throw Error(err);
  }
};

export const signUp = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/register/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error during signUp:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Sign up failed");
  }
};

export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem("token");

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/order/`;

    const response = await axios.post(apiUrl, orderData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.message);
    throw new Error(error.response?.data?.message || "Order creation failed");
  }
};

export const getOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/order/user?status=active`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
};

export const getAllOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/order/user/`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
};

export async function updateOrder(orderId, updatedData) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}/`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Order updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating order:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export const getWatchlist = async () => {
  try {
    const token = localStorage.getItem("token");

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/watchlist/user/`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist:", error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch watchlist"
    );
  }
};

export const addToWatchlist = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/watchlist/`;

    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error add to watchlist:", error.message);
    throw new Error(
      error.response?.data?.message || "adding to watchlist failed"
    );
  }
};

export const removeFromWatchlist = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/watchlist/${id}/`;

    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error removing from watchlist:", error.message);
    throw new Error(
      error.response?.data?.message || "removing from watchlist failed"
    );
  }
};

export const getHistory = async (symbol) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HISTORY_API_KEY}/?q=${symbol}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch history");
  }
};
