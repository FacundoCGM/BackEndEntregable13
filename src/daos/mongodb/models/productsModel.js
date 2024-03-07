import mongoose from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2"

const ProductsSchema = new mongoose.Schema ({
    status: { type: Boolean, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnails: { type: String, required: true },
    code: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
})

ProductsSchema.plugin(mongoosePaginate)

export const ProductsModel = mongoose.model(
    'products',
    ProductsSchema
)