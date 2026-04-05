import db from "@database/prisma";
import { count } from "console";
import { NextResponse } from "next/server";

export async function GET() {
  const ratingsData = await db.product.findMany({});

  const tmp = {
    "4.7-5":0,
    "4.5-4.7":0,
    "3-4.5":0,
    "0-3":0
  }
  try {
    const ratings = ratingsData.map((item: any) => {
      const nilaiRating = Number(item.rating) || 0; 


      if (nilaiRating >= 4.7) {
        tmp["4.7-5"]++;
      } 
      else if (nilaiRating >= 4.5) { 

        tmp["4.5-4.7"]++;
      } 
      else if (nilaiRating >= 3.0) {

        tmp["3-4.5"]++;
      } 
      else {
        tmp["0-3"]++;
      } 
    });

  }catch(error){
    console.error("Error fetching ratings data:", error);
    return NextResponse.json({ error: "Failed to fetch ratings data" }, { status: 500 });
  }

   const formattedRatings = Object.keys(tmp).map((key) => ({
        name: key,
        value: tmp[key as keyof typeof tmp] 
    }));

    return NextResponse.json(formattedRatings);
  }