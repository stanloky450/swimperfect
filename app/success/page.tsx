"use client";


import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Calendar, Users, Download } from "lucide-react";

export default function SuccessPage() {
  const downloadReceipt = () => {
    // Get registration data from localStorage or URL params
    const registrationData = localStorage.getItem('registrationData');
    
    if (registrationData) {
      const data = JSON.parse(registrationData);
      
      // Create receipt content
      const receiptContent = `
        SUMMER SPORTS & LEARNING CAMP 2025
        REGISTRATION RECEIPT
        ================================
        
        Registration Date: ${new Date().toLocaleDateString()}
        Transaction ID: ${data.transactionId || 'N/A'}
        
        PARENT INFORMATION:
        Name: ${data.parentName || 'N/A'}
        Email: ${data.email || 'N/A'}
        Phone: ${data.phone || 'N/A'}
        
        CHILDREN REGISTERED: ${data.numberOfChildren || 0}
        
        PAYMENT DETAILS:
        Base Amount: ₦${((data.totalAmount || 0) / (1 - (data.discount || 0))).toLocaleString()}
        Discount Applied: ${((data.discount || 0) * 100).toFixed(0)}%
        Final Amount: ₦${(data.totalAmount || 0).toLocaleString()}
        Payment Status: COMPLETED
        
        ${data.referralCode ? `Referral Code Used: ${data.referralCode}` : ''}
        
        Thank you for registering with us!
        
        For inquiries, contact:
        Email: info@swimperfect.com
        Phone: +234-XXX-XXXX
      `;
      
      // Create and download the receipt
      const blob = new Blob([receiptContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `summer-camp-receipt-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      // Fallback receipt
      const receiptContent = `
        SUMMER SPORTS & LEARNING CAMP 2025
        REGISTRATION RECEIPT
        ================================
        
        Registration Date: ${new Date().toLocaleDateString()}
        Payment Status: COMPLETED
        
        Thank you for your registration!
        
        For detailed receipt information, please contact:
        Email: info@swimperfect.com
        Phone: +234-XXX-XXXX
      `;
      
      const blob = new Blob([receiptContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `summer-camp-receipt-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Registration Successful!</CardTitle>
          <CardDescription className="text-lg">
            Thank you for registering your child(ren) for our Summer Camp 2025
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-3">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Confirmation Email</p>
                  <p className="text-sm text-green-700">
                    You'll receive a detailed confirmation email with your registration summary and payment receipt.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Camp Information</p>
                  <p className="text-sm text-green-700">
                    We'll send you detailed information about camp schedules, what to bring, and pickup/drop-off procedures.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Contact Information</p>
                  <p className="text-sm text-green-700">
                    Our team will reach out if we need any additional information about your child(ren).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Important Reminders</h3>
          <ul className="text-sm text-blue-700 space-y-1">
              <li>• Camp starts on August 4th, 2025 at 9:00 AM</li>
              <li>• Please ensure your child brings appropriate sports attire and laptop or any device that would help for the coding class</li>
              <li>• Swimming gear will be provided But If A child have would be an added advantage</li>
              <li>• Lunch and snacks Should be brought as the session is about 6 hours long </li>
              <li>• Emergency contact information has been noted</li>
            </ul>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-4">
              <Button onClick={downloadReceipt} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              
              <Link href="/">
                <Button size="lg">
                  Return to Home
                </Button>
              </Link>
            </div>
            
            <p className="text-gray-600">
              If you have any questions or need to make changes to your registration, 
              please contact us at <strong>info@swimperfect.com</strong> or <strong>+234-XXX-XXXX</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}