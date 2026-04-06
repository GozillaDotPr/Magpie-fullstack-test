import {randomMath} from "@/helper/utils"

function addVariant(order: any) {
    const statusMark =randomMath(0,3)
    let status = ""
    if (statusMark == 3){
        status = "Shipped"
    }else if (statusMark == 2) {
        status = "Delivered"
    }else{
        status = "Processing"
    }
    const variant = { order_id: randomMath(1, 100), user_id: randomMath(1, 100), items: [ { product_id: randomMath(1, 8), quantity: randomMath(1, 5) }, { product_id: randomMath(1, 5), quantity: randomMath(1, 5) } ], total_price: randomMath(100, 1000), status: "Delivered" }
    order.push(variant)
    return order
}

export const orderVariant = {
    addVariant
}
