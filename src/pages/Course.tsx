
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getCourseById } from '@/lib/courses';
import MainLayout from '@/layouts/MainLayout';
import CourseContent from '@/components/CourseContent';
import { ArrowLeft, Book, Clock, Globe, Users, Star, GamepadIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Course = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      // Simulate API call with setTimeout
      setTimeout(() => {
        const foundCourse = getCourseById(courseId);
        setCourse(foundCourse);
        setIsLoading(false);
      }, 500);
    }
  }, [courseId]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="pt-32 pb-16 animate-pulse">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-2/3 mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-8"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                </div>
                <div>
                  <div className="h-96 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-6">Course Not Found</h1>
            <p className="text-gray-600 mb-8">
              We couldn't find the course you're looking for.
            </p>
            <Link to="/">
              <Button className="rounded-full bg-blue-500 hover:bg-blue-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-up">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-gray-500 hover:text-blue-500 transition-smooth mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Link>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg mr-3 flex items-center justify-center text-white",
                      `bg-${course.color}-500`
                    )}
                    style={{ backgroundColor: `var(--tw-colors-${course.color}-500, #3B82F6)` }}
                  >
                    <span className="text-xl" dangerouslySetInnerHTML={{ __html: course.icon }} />
                  </div>
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                  </span>
                </div>
                <Link to={`/course/${courseId}/game`}>
                  <Button className="rounded-full bg-green-500 hover:bg-green-600">
                    <GamepadIcon className="mr-2 h-4 w-4" />
                    Practice Game
                  </Button>
                </Link>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>

              <p className="text-xl text-gray-600 mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium text-gray-900">{course.rating}</span>
                  {course.students && (
                    <span className="ml-1">
                      ({new Intl.NumberFormat().format(course.students)} students)
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <Book className="h-4 w-4 mr-1" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>12 hours</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>English</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-8 flex items-center justify-center">
                  <div className="text-gray-400">Course Preview Placeholder</div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.features?.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-start">
                          <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3" />
                          </div>
                          <span>Core language concepts and syntax</span>
                        </div>
                        <div className="flex items-start">
                          <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3" />
                          </div>
                          <span>Modern development techniques</span>
                        </div>
                        <div className="flex items-start">
                          <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3" />
                          </div>
                          <span>Best practices and patterns</span>
                        </div>
                        <div className="flex items-start">
                          <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3" />
                          </div>
                          <span>Real-world project implementation</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Separator className="my-8" />

                <div>
                  <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                  <div className="prose text-gray-700 max-w-none">
                    <p className="mb-4">
                      This comprehensive course will take you from the fundamentals to advanced 
                      concepts in {course.title}. Whether you're a beginner looking to learn 
                      from scratch or an experienced developer wanting to refresh and upgrade 
                      your skills, this course has something for everyone.
                    </p>
                    <p className="mb-4">
                      Throughout the course, you'll work on real-world projects that will help 
                      you apply what you've learned and build a portfolio to showcase your skills 
                      to potential employers.
                    </p>
                    <p>
                      By the end of this course, you'll have the confidence and skills to create 
                      your own applications and continue your journey as a developer.
                    </p>
                  </div>
                </div>
              </div>
                            
              <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
                {course.modules ? (
                  <CourseContent modules={course.modules} />
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 text-center">
                      <h3 className="text-2xl font-bold mb-3">Join This Course</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900">Free</span>
                        <span className="ml-2 text-gray-500 line-through">$89.99</span>
                      </div>
                      <Button className="w-full py-6 rounded-lg bg-blue-500 hover:bg-blue-600 font-medium mb-4">
                        Enroll Now
                      </Button>
                      <p className="text-sm text-gray-500 mb-6">
                        Full lifetime access to all course content
                      </p>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>24/7 access to all lessons</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Downloadable resources</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Certificate of completion</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Community support</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Course;

// Imports
import { Check } from 'lucide-react';
