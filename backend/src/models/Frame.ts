import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/config/database';


interface FrameAttributes {
  id: string;
  html: string;
  order: number;
  demoId: string;
}

interface FrameCreationAttributes extends Optional<FrameAttributes, 'id'> {}

export class Frame extends Model<FrameAttributes, FrameCreationAttributes> implements FrameAttributes {
  public id!: string;
  public html!: string;
  public order!: number;
  public demoId!: string;
}

Frame.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    demoId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Frame',
  }
);
