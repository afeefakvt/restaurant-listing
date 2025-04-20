import { Model,DataTypes,Optional } from "sequelize";
import sequelize from "../config/db";

interface RestaurantAttributes {
  id: number;
  name: string;
  address: string;
  contact: string;
  createdAt?: Date;
  updatedAt?: Date;
}
// Define optional fields during creation (id, timestamps auto-generated)
interface RestaurantCreationAttributes extends Optional<RestaurantAttributes, 'id' | 'createdAt' | 'updatedAt'> {}



export class Restaurant extends Model<RestaurantAttributes,RestaurantCreationAttributes> implements RestaurantAttributes{

  public id!: number;
  public name!:string;
  public address!:string;
  public contact!: string;

  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Restaurant',
    tableName: 'Restaurants',
    timestamps: true 
  }
);


export default Restaurant