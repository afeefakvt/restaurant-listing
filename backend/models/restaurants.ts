import { Model,DataTypes } from "sequelize";
import sequelize from "../config/db";

export class Restaurant extends Model{
  public id!:number;
  public name!:string;
  public address!:string;
  public contact!: string;
}

Restaurant.init(
  {
    name:DataTypes.STRING,
    address:DataTypes.STRING,
    contact:DataTypes.STRING
  },
  {
    sequelize,
    modelName:'Restaurant',
    tableName:'Restaurants'
  }
)

export default Restaurant