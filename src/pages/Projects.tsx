import { useEffect, useMemo, useState } from 'react';
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

const REPOS = [
  'kiruluchamika/Golden-Grain-Mill-ITP-Project',
  'KodniDiyana/Whale_Watching_MobileApp',
  'Upeksha0721/INTURN_HUB',
  'Upeksha0721/Upeksha0721-it3030-paf-2026-smart-campus-group_WE_315_2.2',
];

type Project = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'web' | 'mobile' | 'ai' | 'other';
  progress: number;
  github: string;
  demo: string;
};

const categoriesAll = ['all', 'web', 'mobile', 'ai'] as const;

const IMAGE_MAP: Record<string, string> = {
  'kiruluchamika/golden-grain-mill-itp-project': paddyImage,
  'kodnidiyana/whale_watching_mobileapp': whaleImage,
  'upeksha0721/inturn_hub': internImage,
  'upeksha0721/upeksha0721-it3030-paf-2026-smart-campus-group_we_315_2.2':
    smartCampusImage,
};

const FALLBACK_IMAGE =
  'https://images.pexels.com/photos/301972/pexels-photo-301972.jpeg?auto=compress&cs=tinysrgb&w=800';

export function Projects() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categoriesAll)[number]>('all');

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadRepos() {
      try {
        const fetched = await Promise.all(
          REPOS.map(async (full) => {
            
            const [owner, repo] = full.split('/');

            const repoRes = await fetch(
              `https://api.github.com/repos/${owner}/${repo}`,
              {
                headers: { Accept: 'application/vnd.github+json' },
              }
            );

            if (!repoRes.ok) throw new Error(`Failed to load ${full}`);
            const repoJson = await repoRes.json();

            const topicsRes = await fetch(
              `https://api.github.com/repos/${owner}/${repo}/topics`,
              {
                headers: {
                  Accept: 'application/vnd.github.mercy-preview+json',
                },
              }
            );

            const topicsJson = topicsRes.ok
              ? await topicsRes.json()
              : { names: [] };

            const langsRes = await fetch(
              `https://api.github.com/repos/${owner}/${repo}/languages`
            );

            const langsJson = langsRes.ok ? await langsRes.json() : {};
            const languages = Object.keys(langsJson);

            let knownTech: string[] = [];

            if (key === 'kiruluchamika/golden-grain-mill-itp-project') {
              knownTech = ['Spring Boot', 'React', 'MySQL', 'Stripe', 'JWT'];
            }

            if (key === 'kodnidiyana/whale_watching_mobileapp') {
              knownTech = ['Android', 'Kotlin', 'Firebase'];
            }

            if (key === 'upeksha0721/inturn_hub') {
              knownTech = [
                'MongoDB Atlas',
                'Express.js',
                'React.js',
                'Node.js',
                'Tailwind CSS',
                'JWT',
              ];
            }

            if (
              key ===
              'upeksha0721/upeksha0721-it3030-paf-2026-smart-campus-group_we_315_2.2'
            ) {
              knownTech = [
                'Java',
                'Spring Boot',
                'React.js',
                'MySQL',
                'REST API',
                'Postman',
              ];
            }

            const tags = Array.from(
              new Set<string>([
                ...knownTech,
                ...languages,
                ...(Array.isArray(topicsJson?.names) ? topicsJson.names : []),
              ])
            ).slice(0, 8);

            let category: Project['category'] = 'web';

            if (key === 'kodnidiyana/whale_watching_mobileapp') {
              category = 'mobile';
            }

            const demo =
              repoJson.homepage && repoJson.homepage.trim().length > 0
                ? repoJson.homepage
                : repoJson.html_url;

            let title = repoJson.name || repo;
            let description = repoJson.description || '';

            if (key === 'kiruluchamika/golden-grain-mill-itp-project') {
              title = 'Golden Grain Mill – Management System';
              description =
                description ||
                'Full-stack platform for Sri Lanka’s rice & paddy ecosystem with supplier/buyer workflows, inventory, invoices, payments, and analytics.';
            }

            if (key === 'kodnidiyana/whale_watching_mobileapp') {
              title = 'Whale Watching – Mobile App';
              description =
                description ||
                'Mobile app for booking whale-watching tours with schedules, ticket booking, and live weather integration.';
            }

            if (key === 'upeksha0721/inturn_hub') {
              title = 'Internship Management System';
              description =
                'Developed a full-stack Internship Management System using MERN Stack and Microservices Architecture.';
            }

            if (
              key ===
              'upeksha0721/upeksha0721-it3030-paf-2026-smart-campus-group_we_315_2.2'
            ) {
              title = 'Smart Campus Management System';
              description =
                'Developed a Smart Campus Management System using Spring Boot, React.js, and MySQL. Designed and implemented RESTful APIs for university facility and asset management.';
            }

            const progress = repoJson.archived ? 85 : 100;
            const image = IMAGE_MAP[key] || FALLBACK_IMAGE;

            return {
              id: repoJson.id ?? full,
              title,
              description,
              image,
              tags: tags.length ? tags : ['Project'],
              category,
              progress,
              github: repoJson.html_url,
              demo,
            } as Project;
          })
        );

        setProjects(fetched);
      } catch (err) {
        console.error(err);

        setProjects([
          {
            id: 'golden-grain-fallback',
            title: 'Golden Grain Mill – Management System',
            description:
              'Full-stack platform for Sri Lanka’s rice & paddy ecosystem with supplier/buyer workflows, inventory, invoices, payments, and analytics.',
            image: paddyImage,
            tags: ['Spring Boot', 'React', 'MySQL', 'Stripe', 'JWT'],
            category: 'web',
            progress: 100,
            github:
              'https://github.com/kiruluchamika/Golden-Grain-Mill-ITP-Project',
            demo:
              'https://github.com/kiruluchamika/Golden-Grain-Mill-ITP-Project',
          },
          {
            id: 'whale-app-fallback',
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
            id: 'internship-system-fallback',
            title: 'Internship Management System',
            description:
              'Developed a full-stack Internship Management System using MERN Stack and Microservices Architecture.',
            image: internImage,
            tags: [
              'MongoDB Atlas',
              'Express.js',
              'React.js',
              'Node.js',
              'Tailwind CSS',
              'JWT',
            ],
            category: 'web',
            progress: 100,
            github: 'https://github.com/Upeksha0721/INTURN_HUB',
            demo: 'https://github.com/Upeksha0721/INTURN_HUB',
          },
          {
            id: 'smart-campus-fallback',
            title: 'Smart Campus Management System',
            description:
              'Developed a Smart Campus Management System using Spring Boot, React.js, and MySQL. Designed and implemented RESTful APIs for university facility and asset management.',
            image: smartCampusImage,
            tags: [
              'Java',
              'Spring Boot',
              'React.js',
              'MySQL',
              'REST API',
              'Postman',
            ],
            category: 'web',
            progress: 100,
            github:
              'https://github.com/Upeksha0721/Upeksha0721-it3030-paf-2026-smart-campus-group_WE_315_2.2',
            demo:
              'https://github.com/Upeksha0721/Upeksha0721-it3030-paf-2026-smart-campus-group_WE_315_2.2',
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadRepos();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

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
            A showcase of my real work pulled directly from GitHub
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

        {loading && (
          <div className="text-center text-muted-foreground">
            Loading your projects…
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="text-center text-muted-foreground">
            No projects found. Check your repository list.
          </div>
        )}

        <AnimatePresence mode="wait">
          {!loading && projects.length > 0 && (
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
                      <CardTitle className="flex items-center justify-between">
                        {project.title}
                      </CardTitle>
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>

                      <Button size="sm" className="flex-1" asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
