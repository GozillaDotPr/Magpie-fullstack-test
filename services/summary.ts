import { orderRepo } from "@/repository/order.repo";
import { productRepo } from "@/repository/product.repo";

async function getSummaryData() {

  
  const totalOrders = await orderRepo.totalOrder()
  const totalRevenue = await orderRepo.getTotalRevenue()
  let avgRevenue = 0

  try { 
    avgRevenue = totalRevenue / totalOrders
  } catch{
    console.log("avg error")
  }


  const averageRatingProduct = await productRepo.getAverageRating()

  
  const dashboardStats = [
    {
      title: 'Total Revenue',
      value: totalRevenue,
      change: '+20.1%',
      isPositive: true,
      icon: "DollarSign",
      isMoney:true,
      desimal:2,
      rating:false
    },
    {
      title: 'Total Order Count',
      value: totalOrders,
      change: '+12.5%',
      isPositive: true,
      icon: "ShoppingCart",
      isMoney:false,
      desimal:0,
      rating:false

    },
    {
      title: 'Average Order Value',
      value: avgRevenue,
      change: '-4.3%',
      isPositive: false,
      icon: "BarChart3",
      isMoney:true,
      desimal:2,
      rating:false

    },
    {
      title: 'Average Product Rating',
      value: averageRatingProduct,
      change: '+2.1%',
      isPositive: true,
      icon: "Star",
      isMoney:false,
      desimal:1,
      rating:true
    },
  ]
  return dashboardStats
    
}


export const summaryService = {
    getSummaryData
}
