import axios from "axios";
const API_URL = "http://localhost:5505/api/category";
export async function getAllCategories() {
    try {
      const response = await axios.get(`${API_URL}/list`)
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error)
    }
}
export async function createCategory(categoryName, description) {
    try {
    const response = await axios.post(`${API_URL}/save`,{
        categoryName,
        description,
    });
      console.log(response.data);
      return response.data;
    } catch (error) {
        console.log(error);
    }
}
export async function updateCategory(id,categoryName, description) {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, {
      categoryName,
      description
  }); 
    return response.data;
  }catch (error) {
    console.log(error);
    
  }
}
export async function deleteCategory(id) {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
      id,
  }); 
    return response.data;
  }catch (error) {
    console.log(error);
    
  }
}