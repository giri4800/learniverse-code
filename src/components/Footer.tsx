
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 font-semibold text-lg mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center text-white font-bold">
                CJ
              </div>
              <span className="text-gray-900">CodeJourney</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Begin your coding journey today with our comprehensive learning platform for programming technologies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-smooth">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Learning Paths</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/courses/frontend" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  Frontend Development
                </Link>
              </li>
              <li>
                <Link to="/courses/backend" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  Backend Development
                </Link>
              </li>
              <li>
                <Link to="/courses/database" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  Database Management
                </Link>
              </li>
              <li>
                <Link to="/courses/cloud" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  Cloud Computing
                </Link>
              </li>
              <li>
                <Link to="/courses/devops" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  DevOps & Infrastructure
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-500 transition-smooth">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} CodeJourney. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-blue-500 text-sm transition-smooth">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-blue-500 text-sm transition-smooth">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-blue-500 text-sm transition-smooth">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
