import { Router } from "express";
import * as restaurantController from '../controllers/restaurantController'

const restaurantRoutes = Router()

restaurantRoutes.get('/restaurants',restaurantController.getAllRestaurants)
restaurantRoutes.get('/:id',restaurantController.getRestaurantById)
restaurantRoutes.post('/addRestaurant',restaurantController.addRestaurant)
restaurantRoutes.put('/editRestaurant/:id',restaurantController.updateRestaurant)
restaurantRoutes.delete('/deleteRestaurant/:id',restaurantController.deleteRestaurant)

export default restaurantRoutes