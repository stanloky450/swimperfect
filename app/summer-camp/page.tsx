import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, BookOpen, Waves, Code, Heart, ArrowLeft, Calendar, Target, Star, Gift } from "lucide-react";

export default function SummerCampPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              {/* <ArrowLeft className="h-4 w-4 mr-2" /> */}
              <Image
                src="/swimp.jpg"
                alt="Swim Perfect Limited"
                width={100}
                height={50}
                className="h-13 w-13 rounded-md mr-3"
              />
                {/* <div>
                <h1 className="text-2xl font-bold text-gray-900">Swim Perfect</h1>
                <p className="text-sm text-gray-600">Limited</p>
              </div> */}
            </Link>
            
            <div className="flex items-center">
              <Trophy className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">AQUATECH  2025</h1>
            </div>
            {/* <Link href="/admin/login">
              <Button variant="outline">Admin Login</Button>
            </Link> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Sports & Learning
            <span className="block text-blue-600"> AQUATECH 2025</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Give your children an unforgettable summer filled with sports, learning, and new friendships. 
            Our comprehensive 4-week program combines physical activities with educational experiences.
          </p>
          <div className="bg-green-100 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <Calendar className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Program Duration</h3>
            <p className="text-green-700">4 Weeks: August 2025</p>
            <p className="text-sm text-green-600 mt-2">Registration opens soon!</p>
          </div>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-4">
              Register Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Program Objectives */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Program Objectives</h3>
            <p className="text-xl text-gray-600">Our comprehensive approach to summer learning and development</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg bg-blue-50">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Engaging Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700">
                  Provide an engaging and productive learning experience for pupils and students 
                  through interactive activities and hands-on learning.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-green-50">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-900">Bridge Learning Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700">
                  Bridge learning gaps and prepare students for the next academic session 
                  with targeted educational support and reinforcement.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg bg-purple-50">
              <CardHeader>
                <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-purple-900">Skill Building</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700">
                  Offer skill-building activities including creative arts, leadership training, 
                  digital literacy, and sports development.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Your Child Will Experience
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Sports Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Choose between Football or Basketball to develop athletic skills and teamwork.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Mind Games</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Enhance strategic thinking with Chess or improve vocabulary with Scrabble.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <CardTitle>Creative Arts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Express creativity through Ballet or build discipline with Martial Arts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Waves className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                <CardTitle>Swimming</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All children learn essential swimming skills in our safe, supervised environment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Code className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Digital Skills & Coding</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Introduction to programming, digital literacy, and technology skills for the future.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Leadership Training</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Build leadership skills, communication abilities, and lasting friendships.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Career Guidance Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Career Guidance & Mentorship</h3>
            <p className="text-xl text-gray-600">Interactive sessions with professionals across various industries</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Professional Mentorship</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    Interactive sessions with industry professionals
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    Career exploration and guidance
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    Future planning and goal setting
                  </li>
                  <li className="flex items-start">
                    <Star className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    Industry exposure and networking
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Users className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <h5 className="text-xl font-bold text-gray-900 mb-2">Expert Mentors</h5>
                  <p className="text-gray-600">
                    Learn from successful professionals across technology, business, arts, and sports
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Who Can Join?</h3>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
            <Users className="h-16 w-16 mx-auto mb-6 text-green-200" />
            <h4 className="text-2xl font-bold mb-4">Children & Adults Welcome</h4>
            <p className="text-xl text-green-100 mb-6">
              Our program is designed for participants of all ages - from young learners 
              to adults seeking skill development and enrichment.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h5 className="font-semibold mb-2">For Children:</h5>
                <ul className="space-y-1 text-sm text-green-100">
                  <li>• Age-appropriate activities and learning</li>
                  <li>• Safe, supervised environment</li>
                  <li>• Skill development and creativity</li>
                  <li>• Social interaction and friendship building</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">For Adults:</h5>
                <ul className="space-y-1 text-sm text-green-100">
                  <li>• Professional skill enhancement</li>
                  <li>• Career development opportunities</li>
                  <li>• Networking and mentorship</li>
                  <li>• Personal growth and learning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Affordable Pricing with Family Discounts
          </h3>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl font-bold text-blue-600 mb-4">₦150,000</div>
            <p className="text-xl text-gray-600 mb-6">per child</p>
            <div className="space-y-2 text-left max-w-md mx-auto">
              <div className="flex justify-between">
                <span>2 children:</span>
                <span className="font-semibold text-green-600">5% discount</span>
              </div>
              <div className="flex justify-between">
                <span>3 children:</span>
                <span className="font-semibold text-green-600">10% discount</span>
              </div>
              <div className="flex justify-between">
                <span>4 children:</span>
                <span className="font-semibold text-green-600">15% discount</span>
              </div>
              <div className="flex justify-between">
                <span>5 children:</span>
                <span className="font-semibold text-green-600">20% discount</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <Gift className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-800">
                <strong>Referral Discounts Available!</strong> Ask about our referral program for additional savings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Track Record</h3>
            <p className="text-xl text-gray-600">Proven success in developing young minds and talents</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Students Influenced</div>
              <div className="text-sm text-gray-500 mt-1">Across all programs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">4+</div>
              <div className="text-gray-600">Years Experience</div>
              <div className="text-sm text-gray-500 mt-1">Since 2021</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Schools Partnered</div>
              <div className="text-sm text-gray-500 mt-1">Nationwide reach</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Positive Feedback</div>
              <div className="text-sm text-gray-500 mt-1">From participants</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Give Your Child an Amazing Summer?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Secure your child's spot today. Limited spaces available for our 4-week intensive program!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Start Registration
              </Button>
            </Link>
            {/* <Link href="/referral/SUMMER2025">
              <Button size="lg" variant="outline" className="border-white bg-blue-600 hover:text-blue-600 hover:bg-white text-white text-lg px-8 py-4">
                Check Referral Codes
              </Button>
            </Link> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/swimp.jpg"
              alt="Swim Perfect Limited"
              width={80}
              height={40}
              className="h-6 w-auto mr-2"
            />
            <span className="font-semibold">Summer Sports & Learning Camp 2025</span>
          </div>
          <p className="text-gray-400 mb-2">&copy; 2025 Swim Perfect Limited. All rights reserved.</p>
          <p className="text-sm text-gray-500">
            Part of Swim Perfect Limited's comprehensive educational programs
          </p>
        </div>
      </footer>
    </div>
  );
}