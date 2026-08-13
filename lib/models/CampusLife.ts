import mongoose, { Schema, Model } from "mongoose";


export interface ICampusLife {
  title: string;

  shortDescription: string;

  image: string;

  buttonText: string;

  buttonLink: string;

  isActive: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}



const CampusLifeSchema =
  new Schema<ICampusLife>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },


      shortDescription: {
        type: String,
        required: true,
        trim: true,
      },


      image: {
        type: String,
        required: true,
      },


      buttonText: {
        type: String,
        required: true,
        default: "Learn More",
      },


      buttonLink: {
        type: String,
        required: true,
        default: "#",
      },


      isActive: {
        type: Boolean,
        default: true,
      },
    },

    {
      timestamps: true,
    }
  );



const CampusLife: Model<ICampusLife> =
  mongoose.models.CampusLife ||
  mongoose.model<ICampusLife>(
    "CampusLife",
    CampusLifeSchema
  );


export default CampusLife;