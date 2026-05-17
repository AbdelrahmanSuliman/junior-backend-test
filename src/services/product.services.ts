import Product, { ProductType } from "../schemas/product.schema"

export const addProductService = async (product: ProductType) => {
    Product.create(product)
}

export const getAllProductsService = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit
    const [products, total] = await Promise.all([
        Product.find().skip(skip).limit(limit).lean(),
        Product.countDocuments()
    ]);

    return { products, total, page, totalPages: Math.ceil(total / limit)}
}

export const getProductByIdService = async (id: string) => {
    return await Product.findById(id)
}

export const updateProductByIdService = async (id: string, productDetails: ProductType) => {
    return await Product.findByIdAndUpdate(id, productDetails)
}

export const deleteProductByIdService = async (id: string) => {
    return await Product.findByIdAndDelete(id)
}