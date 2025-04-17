import { Request,Response } from "express";
import Restaurant from "../../models/restaurants";

export const getAllRestaurants = async(req:Request,res:Response):Promise<void>=>{
    try {
        const restaurants = await Restaurant.findAll()
        res.status(200).json(restaurants)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch restaurants', error });

    }
}

export const addRestaurant = async(req:Request,res:Response):Promise<void>=>{
    try {
        const restaurant = await Restaurant.create(req.body)
        res.status(201).json(restaurant)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create restaurant', error });

        
    }
}

export const updateRestaurant = async(req:Request,res:Response):Promise<void>=>{
    try {
        const restaurant = await Restaurant.findByPk(req.params.id)
        if(restaurant){
            await restaurant.update(req.body)
            res.status(200).json(restaurant)
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update restaurant', error });
        
    }
}

export const deleteRestaurant = async(req:Request,res:Response):Promise<void>=>{
    try {
        const restaurant = await Restaurant.findByPk(req.params.id)
        if(restaurant){
            await restaurant.destroy()
            res.status(204).send()
        }else{
            res.status(404).json({message:"Restaurant not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Failed to delete restaurant",error})
        
    }
}