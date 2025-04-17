import { Router } from "express";
import * as restaurantController from '../controllers/restaurantController'

const restaurantRoutes = Router()

restaurantRoutes.get('/resturants',restaurantController.getAllRestaurants)
restaurantRoutes.post('/addRestaurant',restaurantController.addRestaurant)
restaurantRoutes.put('/editRestaurant/:id',restaurantController.updateRestaurant)
restaurantRoutes.delete('/deleteRestaurant/:id',restaurantController.deleteRestaurant)

export default restaurantRoutes