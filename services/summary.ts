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
      value: "$" + totalRevenue.toFixed(2),
      change: '+20.1%',
      isPositive: true,
      icon: "DollarSign",
    },
    {
      title: 'Total Order Count',
      value: totalOrders,
      change: '+12.5%',
      isPositive: true,
      icon: "ShoppingCart",
    },
    {
      title: 'Average Order Value',
      value: "$" + avgRevenue.toFixed(2),
      change: '-4.3%',
      isPositive: false,
      icon: "BarChart3",
    },
    {
      title: 'Average Product Rating',
      value: averageRatingProduct.toFixed(1) + '/5',
      change: '+2.1%',
      isPositive: true,
      icon: "Star",
    },
  ]
  return dashboardStats
    
}


export const summaryService = {
    getSummaryData
}
