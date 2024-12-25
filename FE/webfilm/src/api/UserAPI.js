import axios from "axios";
const API_URL = "http://localhost:5505/api/users";

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};
export async function login(username, password) {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  const { token, role } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
  return { token, role }
}

export const logout = async (token) => {
  try {
    await axios.get(`${API_URL}/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });   
  } catch (error) {
    console.error("Error logging out from backend:", error);
  }
};
export async function register(username,email,password) {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
   
     
}
export async function getAllUsers() {
  try {
    const response = await axios.get(`${API_URL}/list`)
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}
export async function lockUser(userId) {
  return axios.put(`${API_URL}/${userId}/lock`);
}
export async function unlockUser(userId) {
  return axios.put(`${API_URL}/${userId}/unlock`);
}

