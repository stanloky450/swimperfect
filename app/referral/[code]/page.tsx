"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Gift,
  Search,
  Loader2,
  ArrowLeft,
  Trophy,
  Star,
  Clock
} from "lucide-react";
import Link from "next/link";

interface ReferralStats {
  code: string;
  discountPercentage: number;
  usageCount: number;
  totalRevenue: number;
  recentUsage: Array<{
    parentName: string;
    amount: number;
    usedAt: string;
  }>;
}

export default function PublicReferralDashboard() {
  const params = useParams();
  const [referralCode, setReferralCode] = useState(params.code as string || "");
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchCode, setSearchCode] = useState("");

  useEffect(() => {
    if (params.code) {
      fetchReferralStats(params.code as string);
    }
  }, [params.code]);

  const fetchReferralStats = async (code: string) => {
    if (!code.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/referrals/public/${code}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Referral code not found or inactive");
        } else {
          setError("Failed to fetch referral statistics");
        }
        setStats(null);
        return;
      }
      
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching referral stats:', error);
      setError("Failed to connect to server");
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchCode.trim()) {
      setReferralCode(searchCode.trim().toUpperCase());
      fetchReferralStats(searchCode.trim());
      // Update URL without page reload
      window.history.pushState({}, '', `/referral/${searchCode.trim().toUpperCase()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Gift className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Referral Dashboard</h1>
            </div>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <Image
                  src="/swimp.jpg"
                  alt="Swim Perfect Limited"
                  width={80}
                  height={40}
                  className="h-6 w-auto"
                />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Referral Code
            </CardTitle>
            <CardDescription>
              Enter a referral code to view its usage statistics and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="referralCode">Referral Code</Label>
                <Input
                  id="referralCode"
                  placeholder="Enter referral code (e.g., SUMMER2025)"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} disabled={loading || !searchCode.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center text-red-700">
                <div className="text-sm">{error}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading referral statistics...</span>
          </div>
        )}

        {/* Stats Display */}
        {stats && !loading && (
          <div className="space-y-8">
            {/* Header with Referral Code */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Referral Code: <span className="text-blue-600">{stats.code}</span>
              </h2>
              {stats.discountPercentage > 0 && (
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                  <Star className="h-4 w-4 mr-2" />
                  {stats.discountPercentage}% Discount Available
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Total Usage</CardTitle>
                  <Users className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.usageCount}</div>
                  <p className="text-xs opacity-90">
                    {stats.usageCount === 1 ? 'person has' : 'people have'} used this code
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Revenue Generated</CardTitle>
                  <DollarSign className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦{stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs opacity-90">
                    Total from {stats.usageCount} registration{stats.usageCount !== 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Average Value</CardTitle>
                  <TrendingUp className="h-4 w-4 opacity-90" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₦{stats.usageCount > 0 ? Math.round(stats.totalRevenue / stats.usageCount).toLocaleString() : '0'}
                  </div>
                  <p className="text-xs opacity-90">
                    Per registration
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Usage
                </CardTitle>
                <CardDescription>
                  Latest registrations using this referral code
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats.recentUsage.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentUsage.map((usage, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Trophy className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{usage.parentName}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(usage.usedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">₦{usage.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Registration fee</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No usage recorded yet</p>
                    <p className="text-sm text-gray-400">This referral code hasn't been used for any registrations</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Insights */}
            {stats.usageCount > 0 && (
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-indigo-700">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Usage Statistics</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• {stats.usageCount} successful registration{stats.usageCount !== 1 ? 's' : ''}</li>
                        <li>• ₦{stats.totalRevenue.toLocaleString()} total revenue generated</li>
                        <li>• ₦{stats.usageCount > 0 ? Math.round(stats.totalRevenue / stats.usageCount).toLocaleString() : '0'} average per registration</li>
                        {stats.discountPercentage > 0 && (
                          <li>• {stats.discountPercentage}% discount offered to users</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Impact</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Helped {stats.usageCount} famil{stats.usageCount === 1 ? 'y' : 'ies'} register for summer camp</li>
                        <li>• Generated significant revenue for the program</li>
                        <li>• Contributing to camp growth and success</li>
                        {stats.discountPercentage > 0 && (
                          <li>• Providing valuable savings to families</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Call to Action */}
            <Card className="bg-blue-600 text-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Want to Register for Summer Camp?</h3>
                  <p className="mb-4 opacity-90">
                    Use referral code <strong>{stats.code}</strong> during registration
                    {stats.discountPercentage > 0 && ` to get ${stats.discountPercentage}% discount`}
                  </p>
                  <Link href="/register">
                    <Button size="lg" variant="secondary">
                      Register Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Initial State */}
        {!stats && !loading && !error && (
          <div className="text-center py-12">
            <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Referral Code Dashboard</h3>
            <p className="text-gray-600 mb-6">
              Enter a referral code above to view its usage statistics and performance metrics
            </p>
            <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
              <h4 className="font-semibold text-blue-900 mb-2">What you can see:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Total number of people who used the code</li>
                <li>• Revenue generated from referrals</li>
                <li>• Recent usage activity</li>
                <li>• Performance insights and statistics</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}