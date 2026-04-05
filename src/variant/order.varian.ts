import {randomMath} from "@/helper/utils"

function addVariant(order: any) {
    const variant = { order_id: randomMath(1, 100), user_id: randomMath(1, 100), items: [ { product_id: randomMath(1, 8), quantity: randomMath(1, 5) }, { product_id: randomMath(1, 5), quantity: randomMath(1, 5) } ], total_price: randomMath(100, 1000), status: "Processing" }
    order.push(variant)
    return order
}

export const orderVariant = {
    addVariant
}
