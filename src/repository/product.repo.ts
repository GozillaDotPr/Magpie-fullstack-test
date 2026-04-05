import db from "@database/prisma";

import {ProductType} from "@/schemas/product"
//         name: data.name,
//         description: data.description,
//         price: data.price,
//         unit: data.unit,
//         image: data.image,
//         discount: data.discount,
//         availability: data.availability,
//         brand: data.brand,
//         rating: data.rating,

//         created_at: new Date(), 
//         updated_at: new Date(),

//         product_reviews: {
//           create: data.reviews ? data.reviews.map((rev: any) => ({
//           user_id: rev.user_id,
//           rating: rev.rating,
//           comment: rev.comment,
//         })) : [],
//       },
//     }
//   });
// }

// async function updateDataProduct(data:any){
//   return await db.product.update({
//     where: {
//       product_external_id: data.product_id,
//     },
//     data: {
//       name: data.name,
//       description: data.description,
//       price: data.price,
//       unit: data.unit,
//       image: data.image,
//       discount: data.discount,
//       availability: data.availability,
//       brand: data.brand,
//       rating: data.rating,
//       updated_at: new Date(),
//     },
//   });
// }

// async function checkProductExists(productId: number) {
//   const product = await db.product.findFirst({
//     where:{product_external_id:productId}
//   })

//   if (!product){
//     return false
//   }
//   return true
// }

async function upsertProduct(data:ProductType){ 
  const productID = data.product_id;

    return await db.product.upsert({
      where: {
        product_external_id: productID, 
      },
      create: {
        product_external_id: productID,
        name: data.name,
        description: data.description,
        price: data.price,
        unit: data.unit,
        image: data.image,
        discount: data.discount,
        availability: data.availability,
        brand: data.brand,
        category: data.category,
        rating: data.rating,
        created_at: new Date(),
        updated_at: new Date(),
        product_reviews: {
          create: data.reviews ? data.reviews.map((rev: any) => ({
          user_id: rev.user_id,
          rating: rev.rating,
          comment: rev.comment,
        })) : [],
        },
      },
      update: {
        name: data.name,
        description: data.description,
        price: data.price,
        unit: data.unit,
        image: data.image,
        category: data.category,
        discount: data.discount,
        availability: data.availability,
        brand: data.brand,
        rating: data.rating,
        updated_at: new Date(),
        product_reviews: {
          deleteMany : {},
          create: data.reviews ? data.reviews.map((rev: any) => ({
          user_id: rev.user_id,
          rating: rev.rating,
          comment: rev.comment,
        })) : [],
        },
      },
  });
}

export const productRepo = {

  upsertProduct,
}

