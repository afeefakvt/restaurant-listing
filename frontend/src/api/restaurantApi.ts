import axios from "axios";
import { Restaurant } from "../types/Restaurant";

const API = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL
})

export const getRestaurants = async():Promise<Restaurant[]>=>{
    const response = await API.get('/restaurants')
    console.log(response.data,"rrrrrrrrr");
    
    return response.data
}

export const getRestaurantById = async(id:number):Promise<Restaurant>=>{
    const response = await API.get(`/${id}`)
    return response.data
}

export const createRestaurant = async(restaurant:Omit<Restaurant,"id">):Promise<Restaurant>=>{
    const response = await API.post('/addRestaurant',restaurant);
    return response.data
}

export const updateRestaurant = async(id:number,restaurant:Omit<Restaurant,"id">):Promise<Restaurant>=>{
    const response = await API.put(`/editRestaurant/${id}`,restaurant)
    return response .data
}
export const deleteRestaurant = async(id:number):Promise<void>=>{
    await API.delete(`/deleteRestaurant/${id}`)
}

