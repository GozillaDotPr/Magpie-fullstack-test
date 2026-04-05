'use client'

import { TrendingUp, TrendingDown, ShoppingCart, Star, DollarSign, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/component/Card'


import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const dashboardStats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    isPositive: true,
    icon: DollarSign,
  },
  {
    title: 'Total Order Count',
    value: '1,234',
    change: '+12.5%',
    isPositive: true,
    icon: ShoppingCart,
  },
  {
    title: 'Average Order Value',
    value: '$36.72',
    change: '-4.3%',
    isPositive: false,
    icon: BarChart3,
  },
  {
    title: 'Average Product Rating',
    value: '4.8/5',
    change: '+2.1%',
    isPositive: true,
    icon: Star,
  },
]

const orderData = [
  { month: 'Jan', orders: 240 },
  { month: 'Feb', orders: 221 },
  { month: 'Mar', orders: 229 },
  { month: 'Apr', orders: 200 },
  { month: 'May', orders: 229 },
  { month: 'Jun', orders: 200 },
  { month: 'Jul', orders: 278 },
]

const ratingData = [
  { name: '5 Star', value: 65 },
  { name: '4 Star', value: 20 },
  { name: '3 Star', value: 10 },
  { name: '2 Star', value: 3 },
  { name: '1 Star', value: 2 },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', date: '2026-04-05', status: 'Completed', amount: '$120.50' },
  { id: 'ORD-002', customer: 'Alice Smith', date: '2026-04-04', status: 'Processing', amount: '$45.00' },
  { id: 'ORD-003', customer: 'Bob Johnson', date: '2026-04-04', status: 'Failed', amount: '$299.99' },
  { id: 'ORD-004', customer: 'Sarah Williams', date: '2026-04-03', status: 'Completed', amount: '$85.20' },
  { id: 'ORD-005', customer: 'Michael Brown', date: '2026-04-02', status: 'Completed', amount: '$12.99' },
];

const COLORS = ['#a78bfa', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']


function StatCard({ stat }: { stat: typeof dashboardStats[0] }) {
  const Icon = stat.icon
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


export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full p-6 md:p-8 bg-background dark:bg-gradient-to-br dark:from-background dark:via-background dark:to-primary/5">
        <div className="space-y-8 p-6 md:p-10">

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Overview Dashboard</h1>
            <p className="text-foreground/60">Welcome back! Here&apos;s your business metrics.</p>
          </div>


          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dashboardStats.map((stat) => (
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
                  <BarChart data={orderData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#a0aec0" />
                    <YAxis stroke="#a0aec0" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #3b82f6', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
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
                    data={ratingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ratingData.map((entry, index) => (
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
