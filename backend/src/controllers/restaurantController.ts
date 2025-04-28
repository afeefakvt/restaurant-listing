import { Request,response,Response } from "express";
import models,{sequelize} from "../../models"
import { HTTP_STATUS } from "../constants/httpStatusCode";
import { RESPONSE_MESSAGES } from "../constants/messages";

export const getAllRestaurants = async(req:Request,res:Response):Promise<void>=>{
    try {
        const restaurants = await models.Restaurant.findAll()
        res.status(HTTP_STATUS.OK).json(restaurants)
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.FETCH_RESTAURANTS_FAILED, error });

    }
}
export const getRestaurantById = async(req:Request,res:Response):Promise<void>=>{
    try {
        const restaurant = await models.Restaurant.findByPk(req.params.id)
        if(restaurant){
            res.status(HTTP_STATUS.OK).json(restaurant)
        }else{
            res.status(HTTP_STATUS.NOT_FOUND).json({message:RESPONSE_MESSAGES.RESTAURANT_NOT_FOUND})
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.FETCH_RESTAURANT_FAILED, error });

    }
}

export const addRestaurant = async(req:Request,res:Response):Promise<void>=>{
    try {

        const {address,contact} = req.body
        const existingAddress = await models.Restaurant.findOne({where:{address}})
        if(existingAddress){
            res.status(HTTP_STATUS.BAD_REQUEST).json({message:RESPONSE_MESSAGES.ADDRESS_ALREADY_EXISTS});
            return
        }
        const existingContact = await models.Restaurant.findOne({where:{contact}})
        if(existingContact){
            res.status(HTTP_STATUS.BAD_REQUEST).json({message:RESPONSE_MESSAGES.CONTACT_ALREADY_EXISTS})
            return;
        }

        const restaurant = await models.Restaurant.create(req.body)
        res.status(HTTP_STATUS.CREATED).json(restaurant)
    } catch (error:any) {
        console.error("Error adding restaurant:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR, error: error.message });
        
    }
}

export const updateRestaurant = async(req:Request,res:Response):Promise<void>=>{
    try {
        const { address, contact } = req.body;
        const { id } = req.params;

        const restaurant = await models.Restaurant.findByPk(id)
        if (!restaurant) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.RESTAURANT_NOT_FOUND });
            return;
        }
        if (address) {
            const addressExists = await models.Restaurant.findOne({ where: { address } });
            if (addressExists && addressExists.id !== restaurant.id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: RESPONSE_MESSAGES.ADDRESS_ALREADY_EXISTS });
                return;
            }
        }

        if (contact) {
            const contactExists = await models.Restaurant.findOne({ where: { contact } });
            if (contactExists && contactExists.id !== restaurant.id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: RESPONSE_MESSAGES.CONTACT_ALREADY_EXISTS });
                return;
            }
        }
        
            await restaurant.update(req.body)
            res.status(HTTP_STATUS.OK).json(restaurant)
    
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.UPDATE_FAILED, error });
        
    }
}

export const deleteRestaurant = async(req:Request,res:Response):Promise<void>=>{
    try {
        const restaurant = await models.Restaurant.findByPk(req.params.id)
        if(restaurant){
            await restaurant.destroy()
            res.status(204).send()
        }else{
            res.status(HTTP_STATUS.NOT_FOUND).json({message:RESPONSE_MESSAGES.RESTAURANT_NOT_FOUND})
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:RESPONSE_MESSAGES.DELETE_FAILED,error})
        
    }
}