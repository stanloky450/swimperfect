"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { PaystackButton } from "react-paystack";
import { ArrowLeft, Plus, Minus, Loader2 } from "lucide-react";
import Link from "next/link";
import { registrationAPI, referralAPI } from "@/lib/api";

const childSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
  specialNotes: z.string().optional(),
  sportsActivity: z.enum(["football", "basketball"], {
    required_error: "Please select a sports activity",
  }),
  mindActivity: z.enum(["chess", "scrabble"], {
    required_error: "Please select a mind activity",
  }),
  creativeActivity: z.enum(["ballet", "martial-arts"], {
    required_error: "Please select a creative activity",
  }),
});

const registrationSchema = z.object({
  parentName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  emergencyContact: z.string().min(10, "Emergency contact must be at least 10 digits"),
  address: z.string().min(10, "Please provide a complete address"),
  needsPickup: z.enum(["yes", "no"], {
    required_error: "Please specify if pickup is needed",
  }),
  referralCode: z.string().optional(),
  numberOfChildren: z.number().min(1).max(5),
  children: z.array(childSchema),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const BASE_PRICE = 150000;
const DISCOUNT_RATES = {
  1: 0,
  2: 0.05,
  3: 0.10,
  4: 0.15,
  5: 0.20,
};

export default function RegisterPage() {
  const [numberOfChildren, setNumberOfChildren] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referralValidation, setReferralValidation] = useState<{
    isValid: boolean;
    message: string;
    discountPercentage?: number;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      numberOfChildren: 1,
      children: [{}],
    },
  });

  const watchedChildren = watch("numberOfChildren");
  const watchedReferralCode = watch("referralCode");
  const totalPrice = BASE_PRICE * numberOfChildren;
  
  // Calculate family discount
  const familyDiscount = DISCOUNT_RATES[numberOfChildren as keyof typeof DISCOUNT_RATES] || 0;
  const familyDiscountAmount = totalPrice * familyDiscount;
  
  // Calculate referral discount
  const referralDiscount = (referralValidation?.discountPercentage || 0) / 100;
  const referralDiscountAmount = totalPrice * referralDiscount;
  
  // Apply the better discount
  const bestDiscountAmount = Math.max(familyDiscountAmount, referralDiscountAmount);
  const finalPrice = totalPrice - bestDiscountAmount;
  
  const discountType = referralDiscountAmount > familyDiscountAmount ? 'referral' : 'family';

  const updateChildrenCount = (count: number) => {
    setNumberOfChildren(count);
    setValue("numberOfChildren", count);
    
    const currentChildren = watch("children") || [];
    const newChildren = Array.from({ length: count }, (_, index) => 
      currentChildren[index] || {}
    );
    setValue("children", newChildren);
  };

  const validateReferralCode = async (code: string) => {
    if (!code.trim()) {
      setReferralValidation(null);
      return;
    }

    try {
      const response = await referralAPI.validate(code);
      setReferralValidation({
        isValid: true,
        message: `Valid referral code! ${response.data.discountPercentage}% discount available. Used ${response.data.usageCount} times.`,
        discountPercentage: response.data.discountPercentage
      });
    } catch (error) {
      setReferralValidation({
        isValid: false,
        message: "Invalid referral code"
      });
    }
  };

  const onSubmit = async (data: RegistrationForm) => {
    setIsSubmitting(true);
    try {
      // Validate referral code if provided
      if (data.referralCode) {
        await validateReferralCode(data.referralCode);
        if (referralValidation && !referralValidation.isValid) {
          setIsSubmitting(false);
          return;
        }
      }

      console.log("Form data:", data);
      setShowPayment(true);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async (reference: any) => {
    try {
      const formData = watch();
      
      // Store registration data for receipt
      const registrationData = {
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        numberOfChildren: numberOfChildren,
        totalAmount: finalPrice,
        discount: bestDiscountAmount,
        discountType: discountType,
        referralCode: formData.referralCode,
        transactionId: reference.reference
      };
      localStorage.setItem('registrationData', JSON.stringify(registrationData));
      
      const registrationPayload = {
        parentInfo: {
          name: formData.parentName,
          email: formData.email,
          phone: formData.phone,
          emergencyContact: formData.emergencyContact,
          address: formData.address,
          needsPickup: formData.needsPickup
        },
        children: formData.children,
        referralCode: formData.referralCode,
        transactionId: reference.reference,
        paymentStatus: 'completed'
      };

      await registrationAPI.create(registrationPayload);
      window.location.href = "/success";
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please contact support.");
    }
  };

  const handlePaymentClose = async () => {
    try {
      const formData = watch();
      
      // Save registration with failed payment status
      const registrationPayload = {
        parentInfo: {
          name: formData.parentName,
          email: formData.email,
          phone: formData.phone,
          emergencyContact: formData.emergencyContact,
          address: formData.address,
          needsPickup: formData.needsPickup
        },
        children: formData.children,
        referralCode: formData.referralCode,
        transactionId: `FAILED_${Date.now()}`,
        paymentStatus: 'failed'
      };

      await registrationAPI.create(registrationPayload);
      alert("Payment was cancelled or failed. Your registration has been saved with pending payment status. Please contact support to complete payment.");
    } catch (error) {
      console.error("Failed registration save error:", error);
      alert("Payment failed and registration could not be saved. Please try again or contact support.");
    }
    
    setShowPayment(false);
  };

  const paystackConfig = {
    reference: `REF_${Date.now()}`,
    email: watch("email") || "",
    amount: finalPrice * 100, // Paystack expects amount in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    text: "Pay Now",
    onSuccess: (reference: any) => handlePaymentSuccess(reference),
    onClose: () => handlePaymentClose(),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl"> AQUATECH Summer Camp Registration</CardTitle>
            <CardDescription>
              Please fill out all required information for your child(ren)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Parent Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Parent/Guardian Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parentName">Full Name *</Label>
                    <Input
                      id="parentName"
                      {...register("parentName")}
                      className={errors.parentName ? "border-red-500" : ""}
                    />
                    {errors.parentName && (
                      <p className="text-red-500 text-sm mt-1">{errors.parentName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                    <Input
                      id="emergencyContact"
                      {...register("emergencyContact")}
                      className={errors.emergencyContact ? "border-red-500" : ""}
                    />
                    {errors.emergencyContact && (
                      <p className="text-red-500 text-sm mt-1">{errors.emergencyContact.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    {...register("address")}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <Label>Do you want child(ren) to be picked up? *</Label>
                  <RadioGroup
                    onValueChange={(value) => setValue("needsPickup", value as "yes" | "no")}
                    className="flex space-x-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="pickup-yes" />
                      <Label htmlFor="pickup-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="pickup-no" />
                      <Label htmlFor="pickup-no">No</Label>
                    </div>
                  </RadioGroup>
                  {errors.needsPickup && (
                    <p className="text-red-500 text-sm mt-1">{errors.needsPickup.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                  <Input
                    id="referralCode"
                    {...register("referralCode")}
                    placeholder="Enter referral code if you have one"
                    onBlur={(e) => validateReferralCode(e.target.value)}
                  />
                  {referralValidation && (
                    <p className={`text-sm mt-1 ${referralValidation.isValid ? 'text-green-600' : 'text-red-500'}`}>
                      {referralValidation.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Number of Children */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Number of Children</h3>
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateChildrenCount(Math.max(1, numberOfChildren - 1))}
                    disabled={numberOfChildren <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold w-8 text-center">{numberOfChildren}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateChildrenCount(Math.min(5, numberOfChildren + 1))}
                    disabled={numberOfChildren >= 5}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Children Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Children Information</h3>
                {Array.from({ length: numberOfChildren }, (_, index) => (
                  <Card key={index} className="p-6">
                    <h4 className="text-md font-semibold mb-4">Child {index + 1}</h4>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`children.${index}.firstName`}>First Name *</Label>
                        <Input
                          {...register(`children.${index}.firstName`)}
                          className={errors.children?.[index]?.firstName ? "border-red-500" : ""}
                        />
                        {errors.children?.[index]?.firstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.children[index]?.firstName?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor={`children.${index}.lastName`}>Last Name *</Label>
                        <Input
                          {...register(`children.${index}.lastName`)}
                          className={errors.children?.[index]?.lastName ? "border-red-500" : ""}
                        />
                        {errors.children?.[index]?.lastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.children[index]?.lastName?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor={`children.${index}.dateOfBirth`}>Date of Birth *</Label>
                        <Input
                          type="date"
                          {...register(`children.${index}.dateOfBirth`)}
                          className={errors.children?.[index]?.dateOfBirth ? "border-red-500" : ""}
                        />
                        {errors.children?.[index]?.dateOfBirth && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.children[index]?.dateOfBirth?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label>Medical Conditions</Label>
                        <Textarea
                          {...register(`children.${index}.medicalConditions`)}
                          placeholder="Any medical conditions..."
                        />
                      </div>

                      <div>
                        <Label>Allergies</Label>
                        <Textarea
                          {...register(`children.${index}.allergies`)}
                          placeholder="Any allergies..."
                        />
                      </div>

                      <div>
                        <Label>Special Notes</Label>
                        <Textarea
                          {...register(`children.${index}.specialNotes`)}
                          placeholder="Any special notes..."
                        />
                      </div>
                    </div>

                    {/* Activity Selection */}
                    <div className="space-y-4">
                      <h5 className="font-medium">Activity Selection</h5>
                      
                      <div>
                        <Label>Sports Activity *</Label>
                        <RadioGroup
                          onValueChange={(value) => 
                            setValue(`children.${index}.sportsActivity`, value as "football" | "basketball")
                          }
                          className="flex space-x-6 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="football" id={`child-${index}-football`} />
                            <Label htmlFor={`child-${index}-football`}>Football</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="basketball" id={`child-${index}-basketball`} />
                            <Label htmlFor={`child-${index}-basketball`}>Basketball</Label>
                          </div>
                        </RadioGroup>
                        {errors.children?.[index]?.sportsActivity && (
                          <p className="text-red-500 text-sm mt-1">Please select a sports activity</p>
                        )}
                      </div>

                      <div>
                        <Label>Mind Activity *</Label>
                        <RadioGroup
                          onValueChange={(value) => 
                            setValue(`children.${index}.mindActivity`, value as "chess" | "scrabble")
                          }
                          className="flex space-x-6 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="chess" id={`child-${index}-chess`} />
                            <Label htmlFor={`child-${index}-chess`}>Chess</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="scrabble" id={`child-${index}-scrabble`} />
                            <Label htmlFor={`child-${index}-scrabble`}>Scrabble</Label>
                          </div>
                        </RadioGroup>
                        {errors.children?.[index]?.mindActivity && (
                          <p className="text-red-500 text-sm mt-1">Please select a mind activity</p>
                        )}
                      </div>

                      <div>
                        <Label>Creative Activity *</Label>
                        <RadioGroup
                          onValueChange={(value) => 
                            setValue(`children.${index}.creativeActivity`, value as "ballet" | "martial-arts")
                          }
                          className="flex space-x-6 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ballet" id={`child-${index}-ballet`} />
                            <Label htmlFor={`child-${index}-ballet`}>Ballet</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="martial-arts" id={`child-${index}-martial-arts`} />
                            <Label htmlFor={`child-${index}-martial-arts`}>Martial Arts</Label>
                          </div>
                        </RadioGroup>
                        {errors.children?.[index]?.creativeActivity && (
                          <p className="text-red-500 text-sm mt-1">Please select a creative activity</p>
                        )}
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Included Activities:</strong> Swimming & Coding (automatically included for all children)
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pricing Summary */}
              <Card className="bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg">Pricing Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Price ({numberOfChildren} child{numberOfChildren > 1 ? 'ren' : ''})</span>
                      <span>₦{totalPrice.toLocaleString()}</span>
                    </div>
                    {bestDiscountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>
                          {discountType === 'referral' ? 'Referral' : 'Family'} Discount 
                          ({discountType === 'referral' 
                            ? `${referralValidation?.discountPercentage}%` 
                            : `${(familyDiscount * 100).toFixed(0)}%`
                          })
                        </span>
                        <span>-₦{bestDiscountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span>₦{finalPrice.toLocaleString()}</span>
                    </div>
                    {referralValidation?.isValid && referralDiscountAmount > familyDiscountAmount && (
                      <p className="text-sm text-green-600 mt-2">
                        🎉 Referral discount applied! You saved ₦{(referralDiscountAmount - familyDiscountAmount).toLocaleString()} more than the family discount.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center">
                {!showPayment ? (
                  <Button type="submit" size="lg" className="px-8" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Proceed to Payment'
                    )}
                  </Button>
                ) : (
                  <PaystackButton
                    {...paystackConfig}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors"
                  />
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}