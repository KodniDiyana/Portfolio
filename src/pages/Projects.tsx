import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

import paddyImage from '../assets/paddy.jpg';
import whaleImage from '../assets/whale.jpg';
import internImage from '../assets/intern.jpg';
import smartCampusImage from '../assets/smartCampus.jpg';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'web' | 'mobile' | 'ai';
  progress: number;
  github: string;
  demo: string;
};

const categoriesAll = ['all', 'web', 'mobile', 'ai'] as const;

const projectsData: Project[] = [
  {
    id: 'golden-grain',
    title: 'Golden Grain Mill – Management System',
    description:
      'Full-stack platform for Sri Lanka’s rice & paddy ecosystem with supplier/buyer workflows, inventory, invoices, payments, and analytics.',
    image: paddyImage,
    tags: ['Spring Boot', 'React', 'MySQL', 'Stripe', 'JWT'],
    category: 'web',
    progress: 100,
    github: 'https://github.com/kiruluchamika/Golden-Grain-Mill-ITP-Project',
    demo: 'https://github.com/kiruluchamika/Golden-Grain-Mill-ITP-Project',
  },
  {
    id: 'whale-app',
    title: 'Whale Watching – Mobile App',
    description:
      'Mobile app for booking whale-watching tours with schedules, ticket booking, and live weather integration.',
    image: whaleImage,
    tags: ['Android', 'Kotlin', 'Firebase'],
    category: 'mobile',
    progress: 100,
    github: 'https://github.com/KodniDiyana/Whale_Watching_MobileApp',
    demo: 'https://github.com/KodniDiyana/Whale_Watching_MobileApp',
  },
  {
    id: 'internship-system',
    title: 'Internship Management System',
    description:
      'Developed a full-stack Internship Management System using MERN Stack and Microservices Architecture.',
    image: internImage,
    tags: ['MongoDB Atlas', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'JWT'],
    category: 'web',
    progress: 100,
    github: 'https://github.com/Upeksha0721/INTURN_HUB',
    demo: 'https://github.com/Upeksha0721/INTURN_HUB',
  },
  {
    id: 'smart-campus',
    title: 'Smart Campus Management System',
    description:
      'Developed a Smart Campus Management System using Spring Boot, React.js, and MySQL. Designed and implemented RESTful APIs for university facility and asset management.',
    image: smartCampusImage,
    tags: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'REST API', 'Postman'],
    category: 'web',
    progress: 100,
    github:
      'https://github.com/Upeksha0721/Upeksha0721-it3030-paf-2026-smart-campus-group_WE_315_2.2',
    demo:
      'https://github.com/Upeksha0721/Upeksha0721-it3030-paf-2026-smart-campus-group_WE_315_2.2',
  },
];

export function Projects() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categoriesAll)[number]>('all');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projectsData;
    return projectsData.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Featured Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my real work and academic projects
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-12 flex-wrap"
        >
          <Filter className="w-4 h-4 text-muted-foreground" />

          {categoriesAll.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                      {project.progress}% Complete
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="gap-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>

                    <Button size="sm" className="flex-1" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}