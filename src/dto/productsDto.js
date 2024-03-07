export default class ProductsDTO {
    constructor(product) {
      this.itemTitle = product.title
      this.itemPrice = product.price
      this.itemStock= product.stock
  }
}