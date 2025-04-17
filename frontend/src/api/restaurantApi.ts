import axios from "axios";
import { Restaurant } from "../types/Restaurant";

const API = axios.create({
    baseURL:import.meta.env.BASE_URL
})

export const getRestaurants = async():Promise<Restaurant[]>=>{
    const response = await API.get('/restaurants')
    return response.data
}

