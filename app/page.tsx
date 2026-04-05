import Image from "next/image";

import { TrendingUp, TrendingDown, ShoppingCart, Star, DollarSign, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/component/Card'

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
          
          

        </div>
      </main>
    </div>
  );
}
