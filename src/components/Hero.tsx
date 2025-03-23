
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full bg-dot-pattern opacity-50 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-100/40 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6 animate-fade-down">
            Master modern development skills
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up">
            Begin Your <span className="text-gradient">Coding Journey</span> Today
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Interactive learning paths for web development, cloud services, and DevOps. 
            Build real-world projects that strengthen your portfolio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Button className="rounded-full px-6 py-6 bg-blue-500 hover:bg-blue-600 transition-smooth text-base">
              Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="rounded-full px-6 py-6 border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-smooth text-base">
              View Learning Paths
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-gray-900">20+</div>
              <div className="text-sm text-gray-500 mt-1">Technologies</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-gray-900">100+</div>
              <div className="text-sm text-gray-500 mt-1">Lessons</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-500 mt-1">Projects</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-500 mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
