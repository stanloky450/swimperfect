import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Waves, 
  Users, 
  Award, 
  Shield, 
  Phone, 
  Mail, 
  MapPin,
  Star,
  CheckCircle,
  Droplets,
  Building,
  Wrench,
  GraduationCap,
  Heart,
  Calendar
} from "lucide-react";
import Navigation from "@/components/useNavigation";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
       <Navigation />
      {/* <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/swimp.jpg"
                alt="Swim Perfect Limited"
                width={120}
                height={60}
                className="h-16 w-14 rounded-md mr-3"
                priority
              />
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About Us
              </Link>
              <Link href="/summer-camp" className="text-gray-700 hover:text-blue-600 transition-colors">
                Summer Camp
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
           
            </nav>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                 Swim Perfect
                <span className="block text-cyan-200">Limited</span>
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                From pool construction to swimming coaching, we provide comprehensive aquatic solutions 
                for corporate organizations, schools, and individuals across the country.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#services">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                    Our Services
                  </Button>
                </Link>
                <Link href="/summer-camp">
                  <Button size="lg" variant="outline" className="border-white bg-blue-600 hover:text-blue-600 hover:bg-white text-yellow-400 text- px-8 py-4 text-lg">
                   AQUATECH Summer Camp 2025
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-200">5,000+</div>
                    <div className="text-sm text-blue-100">Students Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-200">4+</div>
                    <div className="text-sm text-blue-100">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-200">100+</div>
                    <div className="text-sm text-blue-100">Pools Built</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-200">50+</div>
                    <div className="text-sm text-blue-100">Schools Served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Comprehensive Services
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer end-to-end aquatic solutions tailored to meet the unique needs of our clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pool Construction */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit group-hover:bg-blue-200 transition-colors">
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Pool Construction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Professional swimming pool design and construction services for residential, 
                  commercial, and institutional clients with modern equipment and techniques.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Pool Maintenance */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit group-hover:bg-green-200 transition-colors">
                  <Wrench className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Pool Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Complete pool maintenance services including water treatment, cleaning, 
                  equipment servicing, and chemical balancing to keep your pool pristine.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Swimming Coaching */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-cyan-100 rounded-full w-fit group-hover:bg-cyan-200 transition-colors">
                  <GraduationCap className="h-8 w-8 text-cyan-600" />
                </div>
                <CardTitle className="text-xl">Swimming Coaching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Expert swimming instruction for all ages and skill levels, from beginners 
                  to competitive swimmers, with certified professional coaches.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Water Features */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-fit group-hover:bg-purple-200 transition-colors">
                  <Droplets className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Water Features</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Design and installation of waterfalls, fountains, and other decorative 
                  water features to enhance your aquatic environment.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Therapeutic Swimming */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-pink-100 rounded-full w-fit group-hover:bg-pink-200 transition-colors">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle className="text-xl">Therapeutic Swimming</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  Specialized therapeutic swimming programs and hydro aerobics for 
                  rehabilitation, fitness, and wellness purposes.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Pool Covers */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-orange-100 rounded-full w-fit group-hover:bg-orange-200 transition-colors">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Pool Covers & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  High-quality pool covers for safety, energy efficiency, and maintenance 
                  reduction, available in various materials and designs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Swim Perfect?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                With years of experience and thousands of satisfied clients, we've established 
                ourselves as the leading aquatic solutions provider in the country.
              </p>
              
              <div className="space-y-4">
                {[
                  "5,000+ students successfully trained",
                  "Professional certified coaches and technicians",
                  "State-of-the-art equipment and techniques",
                  "Comprehensive maintenance and support",
                  "Serving schools and corporate organizations nationwide",
                  "Proven track record since 2021"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6 bg-blue-50 border-blue-200">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-blue-600 mb-2">5,000+</div>
                <div className="text-sm text-gray-600">Students Trained</div>
              </Card>
              
              <Card className="text-center p-6 bg-green-50 border-green-200">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-green-600 mb-2">100+</div>
                <div className="text-sm text-gray-600">Pools Built</div>
              </Card>
              
              <Card className="text-center p-6 bg-purple-50 border-purple-200">
                <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-purple-600 mb-2">4+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </Card>
              
              <Card className="text-center p-6 bg-orange-50 border-orange-200">
                <Building className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-orange-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Schools Served</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Summer Camp CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="h-16 w-16 mx-auto mb-6 text-green-200" />
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Summer Camp 2025 is Coming!
          </h3>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join our exciting 4-week summer program featuring swimming, digital skills, 
            arts & crafts, leadership training, and career guidance. Registration opens soon!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/summer-camp">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Learn More About AQUATECH Summer Camp
              </Button>
            </Link>
            <Link href="/summer-camp#register">
              <Button size="lg" variant="outline" className="border-white bg-blue-600 hover:text-blue-600 hover:bg-white text-white px-8 py-4 text-lg">
                Register Interest
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h3>
            <p className="text-xl text-gray-300">
              Ready to start your aquatic journey? Contact us today!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700 text-center p-8">
              <Phone className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Call Us</h4>
              <p className="text-gray-300">+234-XXX-XXXX</p>
              <p className="text-gray-300">+234-XXX-XXXX</p>
            </Card>

            <Card className="bg-gray-800 border-gray-700 text-center p-8">
              <Mail className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Email Us</h4>
              <p className="text-gray-300">info@swimperfect.com</p>
              <p className="text-gray-300">support@swimperfect.com</p>
            </Card>

            <Card className="bg-gray-800 border-gray-700 text-center p-8">
              <MapPin className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Visit Us</h4>
              <p className="text-gray-300">Abuja, Nigeria</p>
              <p className="text-gray-300">Nationwide Service</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/swimp.jpg"
                  alt="Swim Perfect Limited"
                  width={80}
                  height={40}
                  className="h-8 w-auto mr-3"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner for comprehensive aquatic solutions across Nigeria.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Pool Construction</li>
                <li>Pool Maintenance</li>
                <li>Swimming Coaching</li>
                <li>Water Features</li>
                <li>Therapeutic Swimming</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Programs</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/summer-camp" className="hover:text-white">Summer Camp</Link></li>
                <li>Corporate Training</li>
                <li>School Programs</li>
                <li>Adult Classes</li>
                <li>Competitive Training</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Partnerships</li>
                <li>Testimonials</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Swim Perfect Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}