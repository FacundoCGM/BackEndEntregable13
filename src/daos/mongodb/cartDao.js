import { CartModel } from "./models/cartModel.js"

export default class CartMongo {

    async newCart(obj) {
        try {
            const newCart = await CartModel.create(obj)
            return newCart
        } catch (error) {
            console.error(error)
        }
    }

    async findById(id) {
        try {
            const cart = await CartModel.findById(id)
            return cart
        } catch (error) {
            console.error(error)
        }
    }

    async saveToCart(cid, pid) {
        try {
            const cart = await CartModel.findById(cid)
            if (cart.products.some((elemento) => elemento._id == pid)) {
                const indexProducto = cart.products.findIndex(
                  (elemento) => elemento._id == pid
                );
                cart.products[indexProducto].quantity += 1
              } else {
                cart.products.push(pid)
              }
              cart.save()
              return cart
        } catch (error) {
            console.error(error)
        }
    }

    async cleanCart(cid) {
        try {
            const cart = await CartModel.findById(cid)
            cart.products = []
            cart.save()
            return cart
        } catch (error) {
            console.error(error)
        }
    } 

    async deleteOneProduct(cid, pid) {
        try {
            const cart = await CartModel.findById(cid)
            for(let i = 0; i < cart.products.length; i++) {
                const productToDelete = cart.products[i]
                if(productToDelete._id.valueOf() == pid) {
                    cart.products.splice(i, 1)
                    cart.save()
                    return cart
                } else return false
            }
        } catch (error) {
            console.error(error)
        }
    }

    async updateQuantity(cid, pid, quantity) {
        try {
            const cart = await CartModel.findById(cid)
            for(let i = 0; i < cart.products.length; i++) {
                const productToUpdate = cart.products[i]
                if(productToUpdate._id.valueOf() == pid) {
                    cart.products[i].quantity = quantity
                    cart.save()
                    return cart
                } else return false
            } 
        } catch (error) {
            console.error(error)
        }
    }

    async newProductsArrangement(cid, productsArrangement) {
        try {
            const cart = await CartModel.findById(cid)
            if(Array.isArray(productsArrangement)) {
                cart.products = productsArrangement.map(item => ({
                    product: item.productId,
                    quantity: item.quantity
                }))

                await cart.save()
                return cart
            } else {
                throw new Error('Invalid productsArrangement')
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getCarts() {
        try {
            const carts = await CartModel.find({})
            return carts
        } catch (error) {
            console.error(error)
        }
    }

    async findOne(id) {
        try {
            const cart = await CartModel.findOne({id})
            return cart
        } catch (error) {
            console.error(error)
        }
    }
}

