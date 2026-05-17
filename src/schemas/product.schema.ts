import mongoose, { InferSchemaType } from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  category: { type: String, required: false },
  price: Number,
  quantity: Number
})

export type ProductType = InferSchemaType<typeof productSchema>

const Product = mongoose.model('Product', productSchema)
export default Product