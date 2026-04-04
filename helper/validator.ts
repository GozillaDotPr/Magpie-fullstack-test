

export const priceValidator = (price: number) => {
    if (price < 0) {
        throw new Error("Price cannot be negative");
    }
    return price;
}

export const discountValidator = (discount : number) => {
    if (discount > 99){
        throw new Error("Discount cannot be greater than 99");
    }
    return discount;
}

export const ratingValidator = (rating : number) =>{
    if (rating > 5 || rating < 0){
        throw new Error("Rating must be between 0 and 5");
    }
    return rating
}