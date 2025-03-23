
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Lock, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type Module = {
  id: string;
  title: string;
  duration: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    isLocked: boolean;
  }[];
};

type CourseContentProps = {
  modules: Module[];
};

const CourseContent = ({ modules }: CourseContentProps) => {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    modules.reduce((acc, module, index) => {
      acc[module.id] = index === 0; // Initially expand only the first module
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-semibold">Course Content</h3>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <span>{modules.length} modules</span>
          <span className="mx-2">•</span>
          <span>
            {modules.reduce((total, module) => total + module.lessons.length, 0)} lessons
          </span>
          <span className="mx-2">•</span>
          <span>12 hours total</span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {modules.map((module) => (
          <div key={module.id} className="overflow-hidden">
            <button
              className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50 transition-smooth"
              onClick={() => toggleModule(module.id)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-4">
                  <span>{modules.findIndex(m => m.id === module.id) + 1}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{module.title}</h4>
                  <div className="text-sm text-gray-500 mt-1">
                    {module.lessons.length} lessons • {module.duration}
                  </div>
                </div>
              </div>
              <div>
                {expandedModules[module.id] ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </button>

            <div
              className={cn(
                "transition-all duration-300 ease-in-out",
                expandedModules[module.id]
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              )}
            >
              <div className="px-6 pb-6 space-y-2">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-50 transition-smooth"
                  >
                    <div className="mr-4">
                      {lesson.isLocked ? (
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                          <Lock className="h-4 w-4" />
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium text-gray-900">{lesson.title}</div>
                      <div className="text-sm text-gray-500">{lesson.duration}</div>
                    </div>
                    {!lesson.isLocked && (
                      <div className="ml-2 text-sm font-medium text-green-500 flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Free
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
