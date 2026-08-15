import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";



// =========================================================
// FACILITY ITEM TYPE
// =========================================================

export interface IFacilityItem {

  name:string;

  title:string;

  description:string;

  detailsText:string;

  detailsLink:string;

  isActive:boolean;

  order:number;

}




// =========================================================
// MAIN INTERFACE
// =========================================================


export interface IFacilities extends Document {


  tagline:string;

  title:string;

  image:string;


  facilities:IFacilityItem[];


  programButtonText:string;


  programButtonLink:string;


  isActive:boolean;


  createdAt:Date;

  updatedAt:Date;


}





// =========================================================
// FACILITY ITEM SCHEMA
// =========================================================


const FacilityItemSchema =
new Schema<IFacilityItem>(


{

name:{
type:String,
default:"",
trim:true,
},



title:{
type:String,
default:"",
trim:true,
},



description:{
type:String,
default:"",
trim:true,
},



detailsText:{
type:String,
default:"View Details",
trim:true,
},



detailsLink:{
type:String,
default:"#",
trim:true,
},



isActive:{
type:Boolean,
default:true,
},



order:{
type:Number,
default:0,
},


},

{
_id:true,
}

);







// =========================================================
// FACILITIES SCHEMA
// =========================================================



const FacilitiesSchema =
new Schema<IFacilities>(


{


tagline:{

type:String,

default:"",

trim:true,

},




title:{

type:String,

default:"",

trim:true,

},




image:{

type:String,

default:"",

trim:true,

},




facilities:{


type:[FacilityItemSchema],


default:[],


},






programButtonText:{


type:String,


default:"View Our Program",


trim:true,


},






programButtonLink:{


type:String,


default:"/programs",


trim:true,


},






isActive:{


type:Boolean,


default:true,


},



},

{

timestamps:true,

}

);








// =========================================================
// MODEL
// =========================================================



export const FacilitiesModel =

(mongoose.models.Facilities as Model<IFacilities>) ||

mongoose.model<IFacilities>(

"Facilities",

FacilitiesSchema

);