
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: number;
  level: string;
  index?: number;
};

const CourseCard = ({ 
  id, 
  title, 
  description, 
  icon, 
  color, 
  lessons, 
  level,
  index = 0 
}: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={`/course/${id}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 bg-white border border-gray-100",
        "hover:shadow-lg hover:border-gray-200 hover:-translate-y-1",
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <div 
          className={cn(
            "w-12 h-12 rounded-full mb-4 flex items-center justify-center text-white",
            `bg-${color}-100 text-${color}-500`
          )}
          style={{ backgroundColor: `var(--tw-colors-${color}-100, #EFF6FF)`, color: `var(--tw-colors-${color}-500, #3B82F6)` }}
        >
          <span className="text-xl" dangerouslySetInnerHTML={{ __html: icon }} />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-smooth">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 flex-grow">
          {description}
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <div className="flex space-x-4 text-sm text-gray-500">
            <span>{lessons} lessons</span>
            <span>{level}</span>
          </div>
          
          <div 
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-smooth",
              "bg-gray-100 text-gray-500 group-hover:bg-blue-500 group-hover:text-white"
            )}
          >
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      {/* Animated gradient border on hover */}
      <div 
        className={cn(
          "absolute inset-0 border border-transparent rounded-2xl transition-all duration-500",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: isHovered ? 
            "linear-gradient(to right, transparent, rgba(59, 130, 246, 0.1), transparent)" : 
            "none",
          backgroundSize: "200% 100%",
          animation: isHovered ? "shimmer 2s infinite" : "none"
        }}
      />
    </Link>
  );
};

export default CourseCard;
