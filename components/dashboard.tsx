"use client"

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Wallet, Activity, BarChart3, PieChart } from 'lucide-react';

export default function Dashboard() {
  const { publicKey } = useWallet();

  const walletVolume = [
    { name: 'Jan', total: 1200 },
    { name: 'Feb', total: 1900 },
    { name: 'Mar', total: 1500 },
    { name: 'Apr', total: 2200 },
    { name: 'May', total: 2800 },
    { name: 'Jun', total: 2600 },
  ];

  const protocolUsage = [
    { name: 'Serum', value: 35 },
    { name: 'Raydium', value: 25 },
    { name: 'Mango', value: 20 },
    { name: 'Orca', value: 15 },
    { name: 'Others', value: 5 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Solana Wallet Dashboard</h1>
        <WalletMultiButton />
      </div>

      {publicKey ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Wallet Balance
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">123.45 SOL</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Transactions
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +180 since last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Value Locked
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,678</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Protocols
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                +2 new this month
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">Please connect your wallet to view the dashboard.</p>
          </CardContent>
        </Card>
      )}

      {publicKey && (
        <Tabs defaultValue="volume" className="space-y-4">
          <TabsList>
            <TabsTrigger value="volume">Wallet Volume</TabsTrigger>
            <TabsTrigger value="protocols">Protocol Usage</TabsTrigger>
          </TabsList>
          <TabsContent value="volume" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Volume</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <AreaChart
                  data={walletVolume}
                  index="name"
                  categories={['total']}
                  colors={['blue']}
                  valueFormatter={(number: number) =>
                    `$${Intl.NumberFormat('us').format(number).toString()}`
                  }
                  yAxisWidth={48}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="protocols" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Protocol Usage</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart
                  data={protocolUsage}
                  index="name"
                  categories={['value']}
                  colors={['blue']}
                  valueFormatter={(number: number) => `${number}%`}
                  yAxisWidth={48}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}