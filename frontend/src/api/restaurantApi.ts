import axios from "axios";
import { Restaurant } from "../types/Restaurant";

const API = axios.create({
    baseURL:import.meta.env.BASE_URL
})

export const getRestaurants = async():Promise<Restaurant[]>=>{
    const response = await API.get('/restaurants')
    return response.data
}

export const getRestaurantById = async(id:string):Promise<Restaurant>=>{
    const response = await API.get(`/${id}`)
    return response.data
}

export const createRestaurant = async(restaurant:Restaurant):Promise<Restaurant>=>{
    const response = await API.post('/addRestaurant',restaurant);
    return response.data
}

export const updateRestaurant = async(id:string,restaurant:Restaurant):Promise<Restaurant>=>{
    const response = await API.put(`/editRestaurant/${id}`,restaurant)
    return response .data
}
export const deleteRestaurant = async(id:string):Promise<void>=>{
    await API.delete(`/deleteRestaurant/${id}`)
}