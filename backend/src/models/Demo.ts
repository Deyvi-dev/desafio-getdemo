import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/config/database';


interface DemoAttributes {
  id: string;
  name: string;
}


interface DemoCreationAttributes extends Optional<DemoAttributes, 'id'> {}

export class Demo extends Model<DemoAttributes, DemoCreationAttributes> implements DemoAttributes {
  public id!: string; 
  public name!: string;
}


Demo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Demo',
  }
);
