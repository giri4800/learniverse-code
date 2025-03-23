
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4',
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-semibold text-lg transition-smooth hover:opacity-80"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-md flex items-center justify-center text-white font-bold">
            CJ
          </div>
          <span className={cn(
            'transition-smooth',
            scrolled ? 'text-gray-900' : 'text-gray-900'
          )}>
            CodeJourney
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className={cn(
            'flex space-x-6 text-sm font-medium transition-smooth',
            scrolled ? 'text-gray-700' : 'text-gray-700'
          )}>
            <Link to="/" className="hover:text-blue-500 transition-smooth py-2">Home</Link>
            <Link to="/courses" className="hover:text-blue-500 transition-smooth py-2">Courses</Link>
            <Link to="/about" className="hover:text-blue-500 transition-smooth py-2">About</Link>
            <Link to="/contact" className="hover:text-blue-500 transition-smooth py-2">Contact</Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="rounded-full transition-smooth hover:text-blue-500 hover:border-blue-500"
            >
              Log in
            </Button>
            <Button className="rounded-full transition-smooth bg-blue-500 hover:bg-blue-600">
              Sign up
            </Button>
          </div>
        </div>
        
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-slide-up">
          <nav className="flex flex-col py-4 px-6 space-y-3 text-gray-700">
            <Link to="/" className="py-2 hover:text-blue-500 transition-smooth" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/courses" className="py-2 hover:text-blue-500 transition-smooth" onClick={() => setMobileMenuOpen(false)}>
              Courses
            </Link>
            <Link to="/about" className="py-2 hover:text-blue-500 transition-smooth" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="py-2 hover:text-blue-500 transition-smooth" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <div className="pt-3 flex flex-col space-y-2">
              <Button variant="outline" className="w-full justify-center">
                Log in
              </Button>
              <Button className="w-full justify-center bg-blue-500 hover:bg-blue-600">
                Sign up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
