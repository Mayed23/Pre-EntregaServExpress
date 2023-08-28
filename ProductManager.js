
const fileSystem = require(`node:fs`)
const fs = fileSystem.promises

class ProductManager {
    constructor(){
        this.path = `./archivos/products.json`
      
    }

    readProducts = async ()=> {
        try{
        const productsJson = await fs.readFile(this.path, `utf-8`)
        return await JSON.parse(productsJson)
        } catch (error) {
        return []  
    }
    
    }   

    getProducts = async() => {
        return await this.readProducts()
    }

    addProducts = async ({nombre, modelo, precio, img, codigo, stock}) => {
        
        if (!nombre || !modelo || !precio || !img || !codigo || !stock) return `Ingrese todos los Campos`

        const product=  await this.readProducts()

        const productExiste = product.findIndex(products => products.codigo === codigo)
        
        if (productExiste != -1) return `el código ${codigo} ya existe`

        let newProduct = {
            nombre,
            modelo,
            precio,
            img,
            codigo,
            stock,
            id:product.length+1
        }

        product.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(product, null, 2), `utf-8`)
        return `Ingreso Exitoso`
        
     }   

     getProductsById = async (id) => {
        const productId = await this.readProducts()
        //if(productId.length === 0) return `Producto no Existe`
        let product = productId.find(product => product.id === id)
        if(!product) return `Prducto no encontrado`

        return(product)
        
      
     }

     deleteProductsById = async (id) => {
        let productDelete = await this.readProducts()
        let productElim = productDelete.filter ((product) => product.id != id)
        await fs.writeFile(this.path, JSON.stringify(productElim))
        console.log(`Producto Eliminado`)
     }
     
     updateProducts = async ({id,...product}) => {
        await this.deleteProductsById(id)
        let productDelete = await this.readProducts()
        let productMod = [{...product, id}, ...productDelete]
        await fs.writeFile(this.path, JSON.stringify(productMod))
        console.log(productMod)
        

     }


}

const productos = new ProductManager()

//devuelve el array vacío, antes de agregar productos o los existentes
productos.getProducts()
.then(res => console.log(res))
.catch(err => console.log(err))



const respto = {
    nombre: `respto4`,
    modelo: `modelo4`,
    precio: 14,
    img: `img4`,
    codigo:`1234`,
    stock: 15
}

 productos.addProducts(respto)
.then(res => console.log(res))
.catch(err => console.log(err))

productos.getProductsById(5)
.then(res => console.log(res))
.catch(err => console.log(err))

 productos.deleteProductsById(2)

productos.updateProducts({
    nombre: 'respto2',
    modelo: 'modelo2',
    precio: 20,
    img: 'img2',
    codigo: '1237',
    stock: 18,
    id: 2    
})










































