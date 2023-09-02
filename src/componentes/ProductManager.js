import { promises as fs } from "fs"

// const fileSystem = require(`node: fs`)
// const fs = fileSystem.promises


export default class ProductManager {
    constructor() {
        this.path = `./src/archivos/products.json`

    }

    readProducts = async () => {
        try {
            const productsJson = await fs.readFile(this.path, `utf-8`)
            return await JSON.parse(productsJson)
        } catch (error) {
            return []
        }

    }

    getProducts = async () => {
        return await this.readProducts()
    }

    addProducts = async ({ name, model, price, img, code, idcategory, stock }) => {

        if (!name || !model || !price || !img || !code || !idcategory || !stock) return `Ingrese todos los Campos`

        const product = await this.readProducts()

        const productExiste = product.findIndex(products => products.code === code)

        if (productExiste != -1) return `el código ${code} ya existe`

        let newProduct = {
            name,
            model,
            price,
            img,
            code,
            idcategory,
            stock,
            id: product.length + 1
        }

        product.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(product, null, 2), `utf-8`)
        return `Ingreso Exitoso`

    }

    getProductsById = async (id) => {
        const productId = await this.readProducts()
        //if(productId.length === 0) return `Producto no Existe`
        let product = productId.find(product => product.id === id)
        if (!product) return `Prducto no encontrado`

        return (product)


    }

    deleteProductsById = async (id) => {
        let productDelete = await this.readProducts()
        let productElim = productDelete.filter((product) => product.id != id)
        await fs.writeFile(this.path, JSON.stringify(productElim))
        console.log(`Producto Eliminado`)
    }

    updateProducts = async ({ id, ...product }) => {
        await this.deleteProductsById(id)
        let productDelete = await this.readProducts()
        let productMod = [{ ...product, id }, ...productDelete]
        await fs.writeFile(this.path, JSON.stringify(productMod))
        console.log(productMod)


    }


}

const products = new ProductManager()

//devuelve el array vacío, antes de agregar productos o los existentes
// products.getProducts()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))


 const respto = (
//     //{name: `KIT Bomba de Gasolina`, model: `Aveo`, price: 5, img: `img1`, code: `1230`, idcategory: `1`, stock: `20` }    
//     //{name: `KIT Bomba de Gasolina`, model: `Lumina`, price: 15, img: `img2`, code: `1231`, idcategory: `1`, stock: `20` }    
//     //{name: `KIT Bomba de Gasolina`, model: `Silverado`, price: 30, img: `img3`, code: `1232`, idcategory: `1`, stock: `20`}
//     //{name: `KIT Bomba de Gasolina`, model: `Spark`, price: 15, img: `img4`, code: `1233`, idcategory: `1`, stock: `20`}
//     //{name: `KIT Bomba de Gasolina`, model: `Spark01`, price: 18, img: `img5`, code: `1234`, idcategory: `1`, stock: `20`}
//     //{name: `KIT Bomba de Gasolina`, model: `Swin`, price: 15, img: `img6`, code: `1235`, idcategory: `1`, stock: `20`}
//     //{name: `KIT Bomba de Gasolina`, model: `Spectrum`, price: 20, img: `img7`, code: `1236`, idcategory: `1`, stock: `20`}
//     //{name: `Filtro de Gasolina`, model: `Optra`, price: 8, img: `img8`, code: `1237`, idcategory:`2`, stock: `20`}
//     //{name: `Filtro de Gasolina`, model: `Corsa`, price: 8, img: `img9`, code: `1238`, idcategory:`2`, stock: `20`}     
//     //{name: `Filtro de Gasolina`, model: `Aveo`, price: 5, img: `img10`, code: `1239`, idcategory:`2`, stock: `20`}     
    { name: `Filtro de Gasolina`, model: `LU D-Max`, price: 12, img: `img11`, code: `1240`, idcategory: `2`, stock: `20` }

)


//  products.addProducts(respto)
//      .then(res => console.log(res))
//      .catch(err => console.log(err))

// // products.getProductsById(5)
// // .then(res => console.log(res))
// // .catch(err => console.log(err))

// //  products.deleteProductsById(3)

// products.updateProducts({
//     name: `KIT Bomba de Gasolina`, model: `Aveo`, price: 12, img: `img1`, code: `1230`, idcategory: `1`, stock: `15` 
// })










































