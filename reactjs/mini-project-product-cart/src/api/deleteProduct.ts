import axios from "axios";
import { showToast } from "../utils/toast";

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await axios.delete(`http://localhost:3000/admin/products/${id}`)
    } catch (error) {
        const err = error as Error;
        showToast(err.message, "error")
    }
} 