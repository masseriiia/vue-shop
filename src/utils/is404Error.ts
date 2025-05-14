import axios from "axios";

export function is404Error(error: unknown): boolean {
    if(axios.isAxiosError(error) && error.status === 404 && error.response?.data.message) {
        return true
    }
    return false
}