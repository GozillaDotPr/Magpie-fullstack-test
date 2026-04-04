

export interface Product {
  id: number;
  product_external_id: number;
  name: string;
  description: string;
  price: number;
  Unit: string;
  Image: string;
  discount: number;
  availbility: boolean;
  brand: string;
  rating: number;
  created_at: Date;
  updated_at: Date;

  product_reviews?: ProductReview[];
}

export interface ProductReview {
  id: number;
  product_id: number;
  rating: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
}