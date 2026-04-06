'use client'

import useSWR from 'swr';
import { TrendingUp, TrendingDown, ShoppingCart, Star, DollarSign, BarChart3, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/component/Card'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/component/Dialog"

import { Button } from '@/component/Button';

import React, { useState, useEffect } from 'react';


import CountUp from 'react-countup';


const COLORS = ['#a78bfa', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

const iconMap: Record<string, React.ElementType> = {
  DollarSign: DollarSign,
  ShoppingCart: ShoppingCart,
  BarChart3: BarChart3,
  Star: Star,
};




function StatCard({ stat }: { stat: any }) {
  const Icon = iconMap[stat.icon]
  return (
    <Card className="relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/80">{stat.title}</CardTitle>
        <Icon className="h-5 w-5 text-primary/60" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="text-2xl font-bold text-foreground">
            <CountUp end={stat.value} duration={2} separator="," prefix={stat.isMoney ? "$" : ""} decimals={stat.desimal} />{stat.rating ? "/5" : ""}
          </div>
          <div className="flex items-center space-x-1 text-sm">
            {stat.isPositive ? (
              <>
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">{stat.change}</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-red-500">{stat.change}</span>
              </>
            )}
            <span className="text-foreground/60 break-words">from last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState<any>(null);

  const { data: orderStatusData, isLoading: isStatusLoading } = useSWR('/api/order/status', fetcher);
  const { data: summaryData, isLoading: isSummaryLoading } = useSWR('/api/summary', fetcher);
  const { data: orderLatestData, isLoading: isLatestLoading } = useSWR('/api/order', fetcher);
  const { data: productCategoryData, isLoading: isCategoryLoading } = useSWR('/api/product/category', fetcher);
  const { data: productTopData, isLoading: isTopLoading } = useSWR('/api/product/top/price', fetcher);
  const { data: productRatingData, isLoading: isRatingLoading } = useSWR('/api/product/rating', fetcher);
  const { data: productTopRevenue, isLoading: isTopRevenueLoading } = useSWR('/api/product/top/revenue', fetcher);
  const { data: order7hRevenue, isLoading: isOrder7hRevenueLoading } = useSWR('/api/order/revenue', fetcher);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const { data: detailData, isLoading: isDetailLoading } = useSWR(
    isOpen && selectedProductId ? `/api/product/item?id=${selectedProductId}` : null,
    fetcher
  );


  if (isStatusLoading || isSummaryLoading || isLatestLoading || isCategoryLoading || isTopLoading || isRatingLoading || isTopRevenueLoading || isOrder7hRevenueLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
        <div className="text-primary animate-pulse font-semibold text-center">
          Memuat Dashboard...
        </div>
      </div>
    );
  }



  const handleOpen = (id: number) => {
    setSelectedProductId(id);
    setIsOpen(true);
  };


  return (
    <div className="flex flex-col flex-1 w-full bg-zinc-50 font-sans dark:bg-black">
      {/* Padding dinamis: p-4 di mobile, p-6 di tablet, p-8 di laptop */}
      <main className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-background dark:bg-gradient-to-br dark:from-background dark:via-background dark:to-primary/5">

        {/* Container utama dengan max-width agar tidak melebar tak terbatas di monitor ultra-wide */}
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Overview Dashboard</h1>
            <p className="text-sm sm:text-base text-foreground/60">Welcome back! Here&apos;s your business metrics.</p>
            <p className="text-sm sm:text-base text-foreground/60">
              Please note that all data shown here is dummy data and may not be entirely consistent.
            </p>
          </div>

          {/* Stat Cards: 1 kolom di HP, 2 di tablet, 4 di laptop */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {summaryData.map((stat: any) => (
              <StatCard key={stat.title} stat={stat} />
            ))}
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Product count by Category */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Product count by Category</CardTitle>
                <CardDescription>Orders grouped by Status</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Menggunakan min-height agar chart tidak terlalu gepeng di mobile */}
                <div className="h-[250px] sm:h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productCategoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      {/* Hide text on very small screens if it overlaps, or keep it responsive */}
                      <XAxis dataKey="name" stroke="#a0aec0" fontSize={12} tickMargin={8} />
                      <YAxis stroke="#a0aec0" fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6', borderRadius: '8px' }}
                        labelStyle={{ color: '#e2e8f0' }}
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} maxBarSize={50} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* order by status */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Orders grouped by Status</CardTitle>
                <CardDescription>Distribution of order statuses</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="h-[250px] sm:h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80} // Diperkecil sedikit agar tidak terpotong di mobile
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {orderStatusData.map((entry: any, index: any) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6', borderRadius: '8px' }}
                        labelStyle={{ color: '#e2e8f0' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>


          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            {/* product top revenue */}



            {/* revenue order */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Product Rating</CardTitle>
                <CardDescription>Distribution of product ratings</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="h-[250px] sm:h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productRatingData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      {/* Hide text on very small screens if it overlaps, or keep it responsive */}
                      <XAxis dataKey="name" stroke="#a0aec0" fontSize={12} tickMargin={8} />
                      <YAxis stroke="#a0aec0" fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6', borderRadius: '8px' }}
                        labelStyle={{ color: '#e2e8f0' }}
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} maxBarSize={50} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Revenue in the last 7 hours. Each unit (1h) represents one hour back and format revenue is in USD</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={order7hRevenue}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="hour" stroke="#a0aec0" />
                    <YAxis stroke="#a0aec0" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#a78bfa" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-1">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Top Products by Price</CardTitle>
                <CardDescription>Most popular products based on price</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
                  <table className="w-full text-sm text-left min-w-[600px]">
                    <thead className="bg-primary/5 text-foreground/80 font-medium border-b border-primary/10">
                      <tr>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">No</th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Name</th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Brand</th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Rating</th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Price</th>


                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Actions</th>


                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10 text-foreground/80">
                      {productTopData.map((product: any) => (
                        <tr key={product.id} className="hover:bg-primary/5 transition-colors">
                          <td className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-foreground whitespace-nowrap">{product.id}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">{product.name}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">{product.brand}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap flex items-center gap-1">
                            {product.rating} <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">{product.price}</td>

                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap flex items-center gap-1">
                            <Button variant="outline" size="sm" onClick={() => handleOpen(product.product_id)} className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                              <Eye className="h-4 w-4 mr-2" /> View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-1">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Recent Orders</CardTitle>
                <CardDescription>Recent orders made by customers</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Scroll horizontal aman di sini */}
                <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
                  <table className="w-full text-sm text-left min-w-[500px]">
                    <thead className="bg-primary/5 text-foreground/80 font-medium border-b border-primary/10">
                      <tr>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">No</th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Date</th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Status</th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-right whitespace-nowrap">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10 text-foreground/80">
                      {orderLatestData.map((order: any) => (
                        <tr key={order.id} className="hover:bg-primary/5 transition-colors">
                          <td className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-foreground whitespace-nowrap">{order.id}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">{order.date}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                              ${order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                  'bg-red-500/10 text-red-500 border border-red-500/20'}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 text-right font-medium whitespace-nowrap">{order.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-1">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Top Products by Revenue</CardTitle>
                <CardDescription>Most popular products based on revenue. revenue data based on the latest item prices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
                  <table className="w-full text-sm text-left min-w-[600px]">
                    <thead className="bg-primary/5 text-foreground/80 font-medium border-b border-primary/10">
                      <tr>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">No</th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Name</th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Sold</th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Revenue</th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10 text-foreground/80">
                      {productTopRevenue.map((product: any) => (
                        <tr key={product.id} className="hover:bg-primary/5 transition-colors">
                          <td className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-foreground whitespace-nowrap">{product.id}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">{product.name}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">{product.sold}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">{product.total_revenue}</td>

                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap flex items-center gap-1">
                            <Button variant="outline" size="sm" onClick={() => handleOpen(product.product_id)} className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                              <Eye className="h-4 w-4 mr-2" /> View
                            </Button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Detail informasi produk.
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-[150px] flex flex-col justify-center">
            {isDetailLoading && (
              <div className="flex flex-col items-center justify-center space-y-3">
                <p className="text-sm text-muted-foreground">Mengambil data...</p>
              </div>
            )}

            {detailData && (
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {detailData.name}</p>
                <p><strong>Brand:</strong> {detailData.brand}</p>
                <p><strong>Price:</strong> {detailData.price}</p>
                <p><strong>Description:</strong> {detailData.description}</p>
              </div>
            )}


          </div>
        </DialogContent>
      </Dialog>
    </div>


  );
}