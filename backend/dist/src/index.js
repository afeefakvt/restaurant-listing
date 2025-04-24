"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const restaurantRoutes_1 = __importDefault(require("./routes/restaurantRoutes"));
const db_1 = __importDefault(require("../config/db"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', restaurantRoutes_1.default);
db_1.default.authenticate()
    .then(() => {
    console.log("Database connected");
})
    .catch(err => {
    console.error("Unable to connect database", err);
});
app.get('/', (req, res) => {
    res.send('hello');
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
