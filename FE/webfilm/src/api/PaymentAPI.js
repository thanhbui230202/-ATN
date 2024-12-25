import axios from "axios";
const API_URL = "http://localhost:5505/api/payment"; 
export async function createVnPayPaymentApi(amount, bankCode){
    try {
      const response = await axios.get(`${API_URL}/vn-pay`, {
        params: { amount, bankCode },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating VNPay payment:", error);
      throw new Error("VNPay payment creation failed");
    }
};
export async function VnPayPaymentCallBack(){
  try {
    const response = await axios.get(`${API_URL}/vn-pay-callback`);
    return response.data;
  } catch (error) {
    console.error("Error creating VNPay payment:", error);
    throw new Error("VNPay payment creation failed");
  }
};