
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/CourseCard';
import { cn } from '@/lib/utils';
import { courses } from '@/lib/courses';

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'database', name: 'Database' },
  { id: 'cloud', name: 'Cloud' },
  { id: 'devops', name: 'DevOps' },
];

const FeaturedCourses = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);
  
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-up">
            Explore Our Learning Paths
          </h2>
          <p className="text-lg text-gray-600 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Comprehensive courses designed to take you from beginner to professional
            in the most in-demand programming technologies.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              className={cn(
                "rounded-full transition-smooth",
                activeCategory === category.id 
                  ? "bg-blue-500 hover:bg-blue-600" 
                  : "hover:text-blue-500 hover:border-blue-500"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          {filteredCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              {...course}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <Button variant="outline" className="rounded-full px-6 hover:text-blue-500 hover:border-blue-500 transition-smooth">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
