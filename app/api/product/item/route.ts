// app/api/product/item/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { productService } from "@/services/product.service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { message: 'Product ID is required in URL (e.g., ?id=150)' },
      { status: 400 } 
    );
  }

  const productId = Number(id);
  if (isNaN(productId)) {
    return NextResponse.json(
      { message: 'Invalid product ID format' },
      { status: 400 }
    );
  }

  try {
    const product = await productService.getOneProductByID(productId);

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 } 
      );
    }

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.error("Error fetching product detail:", error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}