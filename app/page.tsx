'use client'


import useSWR from 'swr';

import { TrendingUp, TrendingDown, ShoppingCart, Star, DollarSign, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/component/Card'


import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'


const COLORS = ['#a78bfa', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

const iconMap: Record<string, React.ElementType> = {
    DollarSign: DollarSign,
    ShoppingCart: ShoppingCart,
    BarChart3: BarChart3,
    Star: Star,
  };

function StatCard({ stat }: { stat:any }) {
  const Icon = iconMap[stat.icon]
  return (
    <Card className="relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/80">{stat.title}</CardTitle>
        <Icon className="h-5 w-5 text-primary/60" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
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
            <span className="text-foreground/60">from last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: orderStatusData, isLoading: isStatusLoading } = useSWR('/api/order/status', fetcher);
  const { data: summaryData, isLoading: isSummaryLoading } = useSWR('/api/summary', fetcher);
  const { data: orderLatestData, isLoading: isLatestLoading } = useSWR('/api/order', fetcher);
  const { data: productCategoryData, isLoading: isCategoryLoading } = useSWR('/api/product/category', fetcher);
  const { data: productTopData, isLoading: isTopLoading } = useSWR('/api/product/top', fetcher);
  const { data: productRatingData, isLoading: isRatingLoading } = useSWR('/api/product/rating', fetcher);


  if (isStatusLoading || isSummaryLoading || isLatestLoading || isCategoryLoading || isTopLoading || isRatingLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-primary animate-pulse font-semibold">
          Memuat Dashboard...
        </div>
      </div>
    );
  }
 
  
  
  return (
    
    <div className="flex flex-col flex-1 w-full bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full p-6 md:p-8 bg-background dark:bg-gradient-to-br dark:from-background dark:via-background dark:to-primary/5">
        <div className="space-y-8 p-6 md:p-10">

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Overview Dashboard</h1>
            <p className="text-foreground/60">Welcome back! Here&apos;s your business metrics.</p>
          </div>


          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {summaryData.map((stat:any) => (
              <StatCard key={stat.title} stat={stat} />
            ))}
          </div>


          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Product count grouped by Category </CardTitle>
                <CardDescription>Orders grouped by Status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productCategoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="name" stroke="#a0aec0" />
                    <YAxis  stroke="#a0aec0" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Orders grouped by Status</CardTitle>
                <CardDescription>Distribution of order statuses</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {orderStatusData.map((entry:any, index:any) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Recent orders made by customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-primary/5 text-foreground/80 font-medium border-b border-primary/10 ">
                      <tr>
                        <th scope="col" className="px-6 py-4 whitespace-nowrap">Order ID</th>
                        <th scope="col" className="px-6 py-4 whitespace-nowrap">Date</th>
                        <th scope="col" className="px-6 py-4 whitespace-nowrap">Status</th>
                        <th scope="col" className="px-6 py-4 text-right whitespace-nowrap">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10 text-foreground/80">
                      {orderLatestData.map((order:any) => (
                        <tr key={order.id} className="hover:bg-primary/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                    ${order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                  'bg-red-500/10 text-red-500 border border-red-500/20'}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-medium whitespace-nowrap">
                            {order.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Most popular products based on price</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-x-auto">

                  <table className="w-full text-sm text-left">
                    <thead className="bg-primary/5 text-foreground/80 font-medium border-b border-primary/10">
                      <tr>
                        {/* whitespace-nowrap mencegah teks patah ke bawah di layar kecil */}
                        <th scope="col" className="px-6 py-4 whitespace-nowrap">ID</th>
                        <th scope="col" className="px-6 py-4 whitespace-nowrap">Name</th>
                        <th scope="col" className="px-6 py-4 whitespace-nowrap">Brand</th>
                        <th scope="col" className="px-6 py-4 whitespace-nowrap">Rating</th>
                        <th scope="col" className="px-6 py-4 text-right whitespace-nowrap">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/10 text-foreground/80">
                      {productTopData.map((product:any) => (
                        <tr key={product.product_external_id} className="hover:bg-primary/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                            {product.product_external_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{product.rating}</td>
                          <td className="px-6 py-4 text-right font-medium whitespace-nowrap">
                            {product.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Product Range Rating</CardTitle>
                <CardDescription>Distribution of product ratings</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productRatingData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productRatingData.map((entry:any, index:any) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
        </div>
        </div>
      </main>
    </div>
  );
}
