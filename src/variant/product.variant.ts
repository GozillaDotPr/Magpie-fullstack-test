
import {randomMath} from "@/helper/utils"

function addVariant(product: any) {
    const proVariant = product.map((item:any)=>{
        return {
            ...item,
            price: item.price + randomMath(1, 10) 
        }
    })
    return proVariant
}

export const productVariant = {
    addVariant
}
