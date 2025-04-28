import { Request,Response } from "express";
import models,{sequelize} from "../../models"
import { HTTP_STATUS } from "../constants/httpStatusCode";

export const getAllRestaurants = async(req:Request,res:Response):Promise<void>=>{
    try {
        const restaurants = await models.Restaurant.findAll()
        res.status(HTTP_STATUS.OK).json(restaurants)
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch restaurants', error });

    }
}
export const getRestaurantById = async(req:Request,res:Response):Promise<void>=>{
    try {
        const restaurant = await models.Restaurant.findByPk(req.params.id)
        if(restaurant){
            res.status(HTTP_STATUS.OK).json(restaurant)
        }else{
            res.status(HTTP_STATUS.NOT_FOUND).json({message:"Restaurant not found"})
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch restaurant', error });

    }
}

export const addRestaurant = async(req:Request,res:Response):Promise<void>=>{
    try {

        const {address,contact} = req.body
        const existingAddress = await models.Restaurant.findOne({where:{address}})
        if(existingAddress){
            res.status(HTTP_STATUS.BAD_REQUEST).json({message:'A restaurant with this address already exists'});
            return
        }
        const existingContact = await models.Restaurant.findOne({where:{contact}})
        if(existingContact){
            res.status(HTTP_STATUS.BAD_REQUEST).json({message:"A restaurant with this contact already exists"})
            return;
        }

        const restaurant = await models.Restaurant.create(req.body)
        res.status(HTTP_STATUS.CREATED).json(restaurant)
    } catch (error:any) {
        console.error("Error adding restaurant:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: error.message });
        
    }
}

export const updateRestaurant = async(req:Request,res:Response):Promise<void>=>{
    try {
        const { address, contact } = req.body;
        const { id } = req.params;

        const restaurant = await models.Restaurant.findByPk(id)
        if (!restaurant) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Restaurant not found' });
            return;
        }
        if (address) {
            const addressExists = await models.Restaurant.findOne({ where: { address } });
            if (addressExists && addressExists.id !== restaurant.id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'A restaurant with this address already exists.' });
                return;
            }
        }

        if (contact) {
            const contactExists = await models.Restaurant.findOne({ where: { contact } });
            if (contactExists && contactExists.id !== restaurant.id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'A restaurant with this contact number already exists.' });
                return;
            }
        }
        
            await restaurant.update(req.body)
            res.status(HTTP_STATUS.OK).json(restaurant)
    
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update restaurant', error });
        
    }
}

export const deleteRestaurant = async(req:Request,res:Response):Promise<void>=>{
    try {
        const restaurant = await models.Restaurant.findByPk(req.params.id)
        if(restaurant){
            await restaurant.destroy()
            res.status(204).send()
        }else{
            res.status(HTTP_STATUS.NOT_FOUND).json({message:"Restaurant not found"})
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:"Failed to delete restaurant",error})
        
    }
}