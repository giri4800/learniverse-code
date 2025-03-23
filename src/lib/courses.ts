
export const courses = [
  {
    id: 'javascript',
    title: 'JavaScript Fundamentals',
    description: 'Master the core concepts of JavaScript and modern ES6+ features.',
    icon: '&#xe80f;', // Fontawesome code for JavaScript
    color: 'blue',
    lessons: 24,
    level: 'Beginner',
    category: 'frontend',
    rating: 4.8,
    students: 12560,
    features: [
      'Modern ES6+ syntax',
      'Asynchronous JavaScript',
      'DOM manipulation',
      'Error handling',
      'JavaScript modules'
    ],
    preview: {
      image: '/javascript-preview.webp',
      video: 'https://www.youtube.com/watch?v=hdI2bqOjy3c'
    },
    modules: [
      {
        id: 'js-module-1',
        title: 'Getting Started with JavaScript',
        duration: '1h 30m',
        lessons: [
          {
            id: 'js-lesson-1',
            title: 'Introduction to JavaScript',
            duration: '10:23',
            isLocked: false
          },
          {
            id: 'js-lesson-2',
            title: 'Setting Up Your Development Environment',
            duration: '15:45',
            isLocked: false
          },
          {
            id: 'js-lesson-3',
            title: 'Variables, Data Types, and Operators',
            duration: '20:12',
            isLocked: false
          },
          {
            id: 'js-lesson-4',
            title: 'Control Flow: Conditionals and Loops',
            duration: '18:36',
            isLocked: true
          }
        ]
      },
      {
        id: 'js-module-2',
        title: 'Functions and Objects',
        duration: '2h 15m',
        lessons: [
          {
            id: 'js-lesson-5',
            title: 'Function Declarations vs. Expressions',
            duration: '16:42',
            isLocked: true
          },
          {
            id: 'js-lesson-6',
            title: 'Arrow Functions and Lexical Scope',
            duration: '14:55',
            isLocked: true
          },
          {
            id: 'js-lesson-7',
            title: 'Working with Objects',
            duration: '22:18',
            isLocked: true
          },
          {
            id: 'js-lesson-8',
            title: 'Prototypes and Inheritance',
            duration: '24:30',
            isLocked: true
          }
        ]
      },
      {
        id: 'js-module-3',
        title: 'Asynchronous JavaScript',
        duration: '2h 45m',
        lessons: [
          {
            id: 'js-lesson-9',
            title: 'Callbacks and the Event Loop',
            duration: '18:24',
            isLocked: true
          },
          {
            id: 'js-lesson-10',
            title: 'Promises and Error Handling',
            duration: '22:15',
            isLocked: true
          },
          {
            id: 'js-lesson-11',
            title: 'Async/Await Syntax',
            duration: '19:48',
            isLocked: true
          },
          {
            id: 'js-lesson-12',
            title: 'Fetching Data from APIs',
            duration: '25:33',
            isLocked: true
          }
        ]
      }
    ]
  },
  {
    id: 'html-css',
    title: 'HTML & CSS Mastery',
    description: 'Learn to create modern, responsive websites with HTML5 and CSS3.',
    icon: '&#xe63b;', // Fontawesome code for HTML5
    color: 'orange',
    lessons: 18,
    level: 'Beginner',
    category: 'frontend',
    rating: 4.7,
    students: 15840
  },
  {
    id: 'react',
    title: 'React.js Development',
    description: 'Build dynamic user interfaces with React.js and its ecosystem.',
    icon: '&#xe7b9;', // Fontawesome code for React
    color: 'blue',
    lessons: 32,
    level: 'Intermediate',
    category: 'frontend',
    rating: 4.9,
    students: 9870
  },
  {
    id: 'nodejs',
    title: 'Node.js Backend Development',
    description: 'Create scalable backend services with Node.js, Express and MongoDB.',
    icon: '&#xe718;', // Fontawesome code for Node.js
    color: 'green',
    lessons: 28,
    level: 'Intermediate',
    category: 'backend',
    rating: 4.8,
    students: 7640
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL Database Design',
    description: 'Master relational database design and management with PostgreSQL.',
    icon: '&#xe76e;', // Fontawesome code for Database
    color: 'blue',
    lessons: 22,
    level: 'Intermediate',
    category: 'database',
    rating: 4.6,
    students: 5280
  },
  {
    id: 'aws',
    title: 'AWS Cloud Services',
    description: 'Learn to deploy and scale applications using Amazon Web Services.',
    icon: '&#xe7ae;', // Fontawesome code for Cloud
    color: 'orange',
    lessons: 26,
    level: 'Advanced',
    category: 'cloud',
    rating: 4.7,
    students: 6940
  },
  {
    id: 'docker',
    title: 'Docker & Containerization',
    description: 'Containerize applications for consistent development and deployment.',
    icon: '&#xe7b0;', // Fontawesome code for Docker
    color: 'blue',
    lessons: 20,
    level: 'Intermediate',
    category: 'devops',
    rating: 4.8,
    students: 8320
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes Orchestration',
    description: 'Automate deployment, scaling, and management of containerized applications.',
    icon: '&#xe7b2;', // Fontawesome code for Kubernetes
    color: 'blue',
    lessons: 24,
    level: 'Advanced',
    category: 'devops',
    rating: 4.9,
    students: 4860
  },
  {
    id: 'mongodb',
    title: 'MongoDB NoSQL Database',
    description: 'Store and query document-based data with MongoDB and Mongoose.',
    icon: '&#xe7b5;', // Fontawesome code for MongoDB
    color: 'green',
    lessons: 18,
    level: 'Intermediate',
    category: 'database',
    rating: 4.6,
    students: 6120
  },
  {
    id: 'graphql',
    title: 'GraphQL API Development',
    description: 'Build efficient APIs with GraphQL, Apollo Server and Client.',
    icon: '&#xe7b7;', // Fontawesome code for GraphQL
    color: 'pink',
    lessons: 22,
    level: 'Advanced',
    category: 'backend',
    rating: 4.8,
    students: 3840
  }
];

export const getCourseById = (id: string) => {
  return courses.find(course => course.id === id);
};
