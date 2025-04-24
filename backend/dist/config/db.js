"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASS || 'postgres';
const database = process.env.DB_NAME || 'restaurants';
const host = process.env.DB_HOST || 'localhost';
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
exports.default = sequelize;
