"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.updateRestaurant = exports.addRestaurant = exports.getRestaurantById = exports.getAllRestaurants = void 0;
const models_1 = __importDefault(require("../../models"));
const getAllRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield models_1.default.Restaurant.findAll();
        res.status(200).json(restaurants);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch restaurants', error });
    }
});
exports.getAllRestaurants = getAllRestaurants;
const getRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield models_1.default.Restaurant.findByPk(req.params.id);
        if (restaurant) {
            res.status(200).json(restaurant);
        }
        else {
            res.status(404).json({ message: "Restaurant not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch restaurant', error });
    }
});
exports.getRestaurantById = getRestaurantById;
const addRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield models_1.default.Restaurant.create(req.body);
        res.status(201).json(restaurant);
    }
    catch (error) {
        console.error("Error adding restaurant:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
exports.addRestaurant = addRestaurant;
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield models_1.default.Restaurant.findByPk(req.params.id);
        if (restaurant) {
            yield restaurant.update(req.body);
            res.status(200).json(restaurant);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update restaurant', error });
    }
});
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield models_1.default.Restaurant.findByPk(req.params.id);
        if (restaurant) {
            yield restaurant.destroy();
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Restaurant not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete restaurant", error });
    }
});
exports.deleteRestaurant = deleteRestaurant;
