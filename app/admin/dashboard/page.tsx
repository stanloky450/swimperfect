"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  DollarSign, 
  Settings, 
  UserCheck, 
  Calendar,
  Download,
  Edit,
  Trash2,
  Plus,
  Loader2,
  Eye,
  Gift,
  X,
  Save,
  Percent
} from "lucide-react";
import { registrationAPI, settingsAPI, referralAPI } from "@/lib/api";

interface Registration {
  _id: string;
  parentInfo: {
    name: string;
    email: string;
    phone: string;
    emergencyContact: string;
    address: string;
    needsPickup: boolean;
  };
  children: Array<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    medicalConditions?: string;
    allergies?: string;
    specialNotes?: string;
    activities: {
      sports: string;
      mind: string;
      creative: string;
    };
  }>;
  totalAmount: number;
  paymentStatus: string;
  registrationDate: string;
  referralCode?: string;
  transactionId: string;
}

interface Settings {
  basePrice: number;
  discountRules: Record<string, number>;
}

interface Referral {
  _id: string;
  code: string;
  discountPercentage: number;
  usageCount: number;
  totalRevenue: number;
  usedBy: Array<{
    registrationId: {
      _id: string;
      parentInfo: {
        name: string;
      };
      totalAmount: number;
    };
    usedAt: string;
  }>;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [settings, setSettings] = useState<Settings>({
    basePrice: 150000,
    discountRules: { '2': 5, '3': 10, '4': 15, '5': 20 }
  });
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReferralCode, setNewReferralCode] = useState("");
  const [newReferralDiscount, setNewReferralDiscount] = useState(0);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
  const [editingReferral, setEditingReferral] = useState<{id: string, discount: number} | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [registrationsRes, settingsRes, referralsRes] = await Promise.all([
        registrationAPI.getAll(),
        settingsAPI.get(),
        referralAPI.getAll()
      ]);

      console.log('Referrals response:', referralsRes.data);
      setRegistrations(registrationsRes.data);
      setSettings(settingsRes.data);
      setReferrals(referralsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = registrations.reduce((sum, reg) => sum + reg.totalAmount, 0);
  const totalChildren = registrations.reduce((sum, reg) => sum + reg.children.length, 0);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = "/";
  };

  const handleSaveSettings = async () => {
    try {
      await settingsAPI.update(settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
  };

  const handleAddReferral = async () => {
    if (!newReferralCode.trim()) return;

    try {
      const response = await referralAPI.create({ 
        code: newReferralCode,
        discountPercentage: newReferralDiscount
      });
      console.log('New referral created:', response.data);
      setNewReferralCode("");
      setNewReferralDiscount(0);
      loadData();
    } catch (error) {
      console.error('Error adding referral:', error);
      alert('Failed to add referral code');
    }
  };

  const handleUpdateReferralDiscount = async (id: string, discountPercentage: number) => {
    try {
      await referralAPI.update(id, { discountPercentage });
      setEditingReferral(null);
      loadData();
      alert('Referral discount updated successfully!');
    } catch (error) {
      console.error('Error updating referral:', error);
      alert('Failed to update referral discount');
    }
  };

  const handleDeleteReferral = async (id: string) => {
    if (!confirm('Are you sure you want to delete this referral code?')) return;

    try {
      await referralAPI.delete(id);
      loadData();
    } catch (error) {
      console.error('Error deleting referral:', error);
      alert('Failed to delete referral code');
    }
  };

  const handleEditRegistration = (registration: Registration) => {
    setEditingRegistration({ ...registration });
    setIsEditing(true);
  };

  const handleSaveRegistration = async () => {
    if (!editingRegistration) return;

    try {
      await registrationAPI.update(editingRegistration._id, editingRegistration);
      setIsEditing(false);
      setEditingRegistration(null);
      loadData();
      alert('Registration updated successfully!');
    } catch (error) {
      console.error('Error updating registration:', error);
      alert('Failed to update registration');
    }
  };

  const exportToCSV = () => {
    const csvData = registrations.map(reg => ({
      'Parent Name': reg.parentInfo.name,
      'Email': reg.parentInfo.email,
      'Phone': reg.parentInfo.phone,
      'Children Count': reg.children.length,
      'Total Amount': reg.totalAmount,
      'Payment Status': reg.paymentStatus,
      'Registration Date': new Date(reg.registrationDate).toLocaleDateString(),
      'Referral Code': reg.referralCode || 'None'
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.csv';
    a.click();
  };

  const exportReferralsToCSV = () => {
    const csvData = referrals.map(ref => ({
      'Referral Code': ref.code,
      'Discount Percentage': ref.discountPercentage || 0,
      'Usage Count': ref.usageCount || 0,
      'Total Revenue Generated': ref.totalRevenue || 0
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'referrals.csv';
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: Calendar },
              { id: "registrations", label: "Registrations", icon: Users },
              { id: "referrals", label: "Referrals", icon: Gift },
              { id: "settings", label: "Settings", icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{registrations.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Children</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalChildren}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{referrals.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Registrations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Registrations</CardTitle>
                <CardDescription>Latest camp registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registrations.slice(0, 5).map((registration) => (
                    <div key={registration._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{registration.parentInfo.name}</p>
                        <p className="text-sm text-gray-500">
                          {registration.children.length} child{registration.children.length > 1 ? 'ren' : ''} • 
                          ₦{registration.totalAmount.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(registration.registrationDate).toLocaleDateString()}
                        </p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          registration.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                          registration.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {registration.paymentStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === "registrations" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Registrations</h2>
              <Button onClick={exportToCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Parent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Children
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {registrations.map((registration) => (
                        <tr key={registration._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {registration.parentInfo.name}
                              </div>
                              <div className="text-sm text-gray-500">{registration.parentInfo.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {registration.children.map((child, index) => (
                                <div key={index}>
                                  {child.firstName} {child.lastName}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₦{registration.totalAmount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              registration.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                              registration.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {registration.paymentStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(registration.registrationDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedRegistration(registration)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditRegistration(registration)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Referrals Tab */}
        {activeTab === "referrals" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Referral Code Management</h2>
              <Button onClick={exportReferralsToCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export Referrals CSV
              </Button>
            </div>

            {/* Add New Referral */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Referral Code</CardTitle>
                <CardDescription>Create new referral codes with custom discount percentages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="newCode">Referral Code</Label>
                    <Input 
                      id="newCode"
                      placeholder="Enter new referral code" 
                      value={newReferralCode}
                      onChange={(e) => setNewReferralCode(e.target.value.toUpperCase())}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newDiscount">Discount Percentage</Label>
                    <Input 
                      id="newDiscount"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      value={newReferralDiscount}
                      onChange={(e) => setNewReferralDiscount(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddReferral} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Referral
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referrals Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Referral Codes</CardTitle>
                <CardDescription>Track referral code usage and performance</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Discount %
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usage Count
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue Generated
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recent Users
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {referrals.map((referral) => (
                        <tr key={referral._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">{referral.code}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingReferral?.id === referral._id ? (
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={editingReferral.discount}
                                  onChange={(e) => setEditingReferral({
                                    ...editingReferral,
                                    discount: parseInt(e.target.value) || 0
                                  })}
                                  className="w-20"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleUpdateReferralDiscount(referral._id, editingReferral.discount)}
                                >
                                  <Save className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingReferral(null)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-900">{referral.discountPercentage || 0}%</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setEditingReferral({
                                    id: referral._id,
                                    discount: referral.discountPercentage || 0
                                  })}
                                >
                                  <Percent className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{referral.usageCount || 0}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              ₦{(referral.totalRevenue || 0).toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {(referral.usedBy || []).slice(0, 3).map((usage, index) => (
                                <div key={index}>
                                  {usage.registrationId?.parentInfo?.name || 'Unknown'} - {new Date(usage.usedAt).toLocaleDateString()}
                                </div>
                              ))}
                              {(referral.usedBy || []).length > 3 && (
                                <div className="text-xs text-gray-500">
                                  +{(referral.usedBy || []).length - 3} more
                                </div>
                              )}
                              {(!referral.usedBy || referral.usedBy.length === 0) && (
                                <div className="text-xs text-gray-500">No usage yet</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteReferral(referral._id)}
                            >
                              <Trash2 className="h-4 w-4" />
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
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Camp Settings</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Pricing Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Configuration</CardTitle>
                  <CardDescription>Manage base price and discount rates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="basePrice">Base Price per Child (₦)</Label>
                    <Input
                      id="basePrice"
                      type="number"
                      value={settings.basePrice}
                      onChange={(e) => setSettings({
                        ...settings,
                        basePrice: parseInt(e.target.value)
                      })}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Family Discount Rates (%)</Label>
                    {Object.entries(settings.discountRules).map(([children, discount]) => (
                      <div key={children} className="flex items-center space-x-3">
                        <Label className="w-20">{children} children:</Label>
                        <Input
                          type="number"
                          value={discount}
                          onChange={(e) => setSettings({
                            ...settings,
                            discountRules: {
                              ...settings.discountRules,
                              [children]: parseInt(e.target.value)
                            }
                          })}
                          className="w-20"
                        />
                        <span>%</span>
                      </div>
                    ))}
                  </div>

                  <Button onClick={handleSaveSettings}>Save Pricing Settings</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* View Registration Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Registration Details</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRegistration(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Parent Information */}
                <div>
                  <h4 className="font-medium mb-3">Parent Information</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Name:</strong> {selectedRegistration.parentInfo.name}</div>
                    <div><strong>Email:</strong> {selectedRegistration.parentInfo.email}</div>
                    <div><strong>Phone:</strong> {selectedRegistration.parentInfo.phone}</div>
                    <div><strong>Emergency Contact:</strong> {selectedRegistration.parentInfo.emergencyContact}</div>
                    <div><strong>Address:</strong> {selectedRegistration.parentInfo.address}</div>
                    <div><strong>Pickup Required:</strong> {selectedRegistration.parentInfo.needsPickup ? 'Yes' : 'No'}</div>
                  </div>
                </div>

                {/* Children Information */}
                <div>
                  <h4 className="font-medium mb-3">Children Information</h4>
                  <div className="space-y-4">
                    {selectedRegistration.children.map((child, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h5 className="font-medium mb-2">Child {index + 1}</h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div><strong>Name:</strong> {child.firstName} {child.lastName}</div>
                          <div><strong>Date of Birth:</strong> {new Date(child.dateOfBirth).toLocaleDateString()}</div>
                          <div><strong>Sports:</strong> {child.activities.sports}</div>
                          <div><strong>Mind Game:</strong> {child.activities.mind}</div>
                          <div><strong>Creative:</strong> {child.activities.creative}</div>
                          <div><strong>Medical Conditions:</strong> {child.medicalConditions || 'None'}</div>
                          <div><strong>Allergies:</strong> {child.allergies || 'None'}</div>
                          <div><strong>Special Notes:</strong> {child.specialNotes || 'None'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h4 className="font-medium mb-3">Payment Information</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Total Amount:</strong> ₦{selectedRegistration.totalAmount.toLocaleString()}</div>
                    <div><strong>Payment Status:</strong> {selectedRegistration.paymentStatus}</div>
                    <div><strong>Transaction ID:</strong> {selectedRegistration.transactionId}</div>
                    <div><strong>Referral Code:</strong> {selectedRegistration.referralCode || 'None'}</div>
                    <div><strong>Registration Date:</strong> {new Date(selectedRegistration.registrationDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Registration Modal */}
      {isEditing && editingRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit Registration</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveRegistration}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingRegistration(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Parent Information */}
                <div>
                  <h4 className="font-medium mb-3">Parent Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={editingRegistration.parentInfo.name}
                        onChange={(e) => setEditingRegistration({
                          ...editingRegistration,
                          parentInfo: {
                            ...editingRegistration.parentInfo,
                            name: e.target.value
                          }
                        })}
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={editingRegistration.parentInfo.email}
                        onChange={(e) => setEditingRegistration({
                          ...editingRegistration,
                          parentInfo: {
                            ...editingRegistration.parentInfo,
                            email: e.target.value
                          }
                        })}
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={editingRegistration.parentInfo.phone}
                        onChange={(e) => setEditingRegistration({
                          ...editingRegistration,
                          parentInfo: {
                            ...editingRegistration.parentInfo,
                            phone: e.target.value
                          }
                        })}
                      />
                    </div>
                    <div>
                      <Label>Emergency Contact</Label>
                      <Input
                        value={editingRegistration.parentInfo.emergencyContact}
                        onChange={(e) => setEditingRegistration({
                          ...editingRegistration,
                          parentInfo: {
                            ...editingRegistration.parentInfo,
                            emergencyContact: e.target.value
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Status */}
                <div>
                  <h4 className="font-medium mb-3">Payment Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Payment Status</Label>
                      <select
                        value={editingRegistration.paymentStatus}
                        onChange={(e) => setEditingRegistration({
                          ...editingRegistration,
                          paymentStatus: e.target.value
                        })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </div>
                    <div>
                      <Label>Total Amount</Label>
                      <Input
                        type="number"
                        value={editingRegistration.totalAmount}
                        onChange={(e) => setEditingRegistration({
                          ...editingRegistration,
                          totalAmount: parseInt(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}