import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Waves, 
  Users, 
  Award, 
  Target,
  Heart,
  Star,
  Calendar,
  MapPin,
  Trophy,
  GraduationCap,
  Building
} from "lucide-react";
import Navigation from "@/components/useNavigation";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
        <Navigation />
      {/* <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <Image
                src="/swimp.jpg"
                alt="Swim Perfect Limited"
                width={100}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/#services" className="text-gray-700 hover:text-blue-600">Services</Link>
              <Link href="/summer-camp" className="text-gray-700 hover:text-blue-600">Summer Camp</Link>
              <Link href="/#contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            </nav>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Swim Perfect</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Passionate about developing swimming excellence and providing comprehensive 
            aquatic solutions across Nigeria since 2021
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-xl mb-8">
              <strong>Swim Perfect Limited</strong> is a company that is passionate about developing swimming pools 
              and providing pool maintenance, water treatment, pool covers, water falls/fountains, 
              hydro aerobics, martial arts, coaching and therapeutic swimming services to corporate 
              organizations and schools across the country.
            </p>
            
            <p className="text-lg mb-8">
              Our services focus on teaching people of all ages how to swim flawlessly. In addition 
              to the aforementioned, we have coached children in several schools throughout the years, 
              helping them discover their love and passion for swimming thereby reaching their aspirations.
            </p>
            
            <p className="text-lg">
              We effectively influenced nearly <strong>5,000 participants</strong> in our prior summer classes, 
              giving them useful life skills and academic knowledge. Students, parents, and educators 
              gave this program overwhelmingly good comments, highlighting its value in closing learning 
              gaps and promoting individual development.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 border-0 shadow-lg bg-blue-50">
              <CardHeader className="text-center pb-6">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-blue-900">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center leading-relaxed">
                  To provide exceptional aquatic solutions and swimming education that empowers 
                  individuals of all ages to achieve swimming excellence while promoting water 
                  safety and healthy lifestyles across Nigeria.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg bg-green-50">
              <CardHeader className="text-center pb-6">
                <Star className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-green-900">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center leading-relaxed">
                  To be the leading aquatic solutions provider in Nigeria, recognized for our 
                  commitment to excellence, innovation, and the development of swimming talent 
                  that contributes to national and international success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600">
              From humble beginnings to nationwide impact
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-8 border-l-4 border-blue-500 bg-blue-50">
              <div className="flex items-start space-x-4">
                <Calendar className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">August 2021 - The Beginning</h3>
                  <p className="text-gray-700">
                    The first edition of our summer camping was hosted in the city of Abuja, 
                    marking the beginning of our journey to transform aquatic education in Nigeria.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-green-500 bg-green-50">
              <div className="flex items-start space-x-4">
                <Users className="h-8 w-8 text-green-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">2021-2025 - Rapid Growth</h3>
                  <p className="text-gray-700">
                    Successfully trained nearly 5,000 participants across multiple summer programs, 
                    establishing partnerships with schools and corporate organizations nationwide.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-purple-500 bg-purple-50">
              <div className="flex items-start space-x-4">
                <Trophy className="h-8 w-8 text-purple-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">2025 - New Horizons</h3>
                  <p className="text-gray-700">
                    Launching our most comprehensive summer program yet, featuring expanded 
                    activities and seeking partnerships with prestigious organizations for 
                    greater impact and reach.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Summer Classes Program */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Our Summer Classes
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive 4-week program designed for holistic development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 bg-white shadow-lg border-0">
              <CardHeader className="text-center pb-4">
                <Target className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <CardTitle className="text-lg">Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Provide engaging and productive learning experiences</li>
                  <li>• Bridge learning gaps for next academic session</li>
                  <li>• Offer comprehensive skill-building activities</li>
                  <li>• Develop leadership and creative abilities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white shadow-lg border-0">
              <CardHeader className="text-center pb-4">
                <Users className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <CardTitle className="text-lg">Target Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600 mb-2">Children & Adults</p>
                  <p className="text-sm text-gray-600">
                    All ages welcome - from young learners to adult participants 
                    seeking skill development and enrichment
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white shadow-lg border-0">
              <CardHeader className="text-center pb-4">
                <Calendar className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <CardTitle className="text-lg">Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600 mb-2">4 Weeks</p>
                  <p className="text-sm text-gray-600">
                    July - August 2025
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Intensive program designed for maximum impact
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Program Activities */}
          <Card className="p-8 bg-white shadow-xl border-0">
            <CardHeader className="text-center mb-6">
              <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Program Activities</CardTitle>
              <CardDescription className="text-lg">
                Comprehensive curriculum covering multiple development areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Skill Acquisition
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Digital skills development</li>
                    <li>• Coding and programming</li>
                    <li>• Arts and crafts</li>
                    <li>• Technical skills training</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Extracurricular Activities
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Swimming training</li>
                    <li>• Sports activities</li>
                    <li>• Leadership training</li>
                    <li>• Team building exercises</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Career Guidance
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Professional mentorship</li>
                    <li>• Interactive career sessions</li>
                    <li>• Industry exposure</li>
                    <li>• Future planning guidance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact & Statistics */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Impact</h2>
            <p className="text-xl text-gray-300">
              Transforming lives through aquatic excellence and comprehensive education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">5,000+</div>
              <div className="text-gray-300">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-gray-300">Schools Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">100+</div>
              <div className="text-gray-300">Pools Built</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">4+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you're interested in our services or summer camp program, 
            we're here to help you achieve aquatic excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Contact Us Today
              </Button>
            </Link>
            <Link href="/summer-camp">
              <Button size="lg" variant="outline" className="border-white text-white bg-blue-600 hover:text-blue-600 hover:bg-white px-8 py-4 text-lg">
                Learn About Summer Camp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/swimp.jpg"
              alt="Swim Perfect Limited"
              width={80}
              height={40}
              className="h-6 w-auto mr-2"
            />
          </div>
          <p className="text-gray-400">&copy; 2025 Swim Perfect Limited. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}