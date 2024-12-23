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
