import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import paddyImage from '../asset/paddy.jpg'; // ✅ your local image

/** ─────────────────────────────────────────────────────────────
 *  Add your GitHub repositories here as "owner/repo" strings.
 *  ───────────────────────────────────────────────────────────── */
const REPOS = [
  'kiruluchamika/Golden-Grain-Mill-ITP-Project'
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

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categoriesAll)[number]>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadRepos() {
      try {
        const fetched = await Promise.all(
          REPOS.map(async (full) => {
            const [owner, repo] = full.split('/');

            // Fetch repo details
            const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
              headers: { Accept: 'application/vnd.github+json' },
            });
            if (!repoRes.ok) throw new Error(`Failed to load ${full}`);
            const repoJson = await repoRes.json();

            // Fetch topics
            const topicsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/topics`, {
              headers: { Accept: 'application/vnd.github.mercy-preview+json' },
            });
            const topicsJson = topicsRes.ok ? await topicsRes.json() : { names: [] };

            // Fetch languages
            const langsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
            const langsJson = langsRes.ok ? await langsRes.json() : {};
            const languages = Object.keys(langsJson);

            // Known tech tags
            const knownTech =
              full.toLowerCase() === 'kiruluchamika/golden-grain-mill-itp-project'
                ? ['Spring Boot', 'React', 'MySQL', 'Stripe', 'JWT']
                : [];

            const tags = Array.from(
              new Set<string>([
                ...knownTech,
                ...languages,
                ...(Array.isArray(topicsJson?.names) ? topicsJson.names : []),
              ])
            ).slice(0, 8);

            const category: Project['category'] = 'web';
            const demo = repoJson.homepage && repoJson.homepage.trim().length > 0
              ? repoJson.homepage
              : repoJson.html_url;

            const title =
              repoJson.name === 'Golden-Grain-Mill-ITP-Project'
                ? 'Golden Grain Mill – Management System'
                : repoJson.name;

            const description =
              repoJson.description ||
              'Full-stack platform for Sri Lanka’s rice & paddy ecosystem with supplier/buyer workflows, inventory, invoices, payments, and analytics.';

            const progress = repoJson.archived ? 80 : 100;

            const image = paddyImage; // ✅ Use your local paddy.jpg

            return {
              id: repoJson.id ?? full,
              title,
              description,
              image,
              tags: tags.length ? tags : ['Spring Boot', 'React', 'MySQL'],
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
        // Fallback (offline or GitHub API blocked)
        setProjects([
          {
            id: 'golden-grain-fallback',
            title: 'Golden Grain Mill – Management System',
            description:
              'Full-stack platform for Sri Lanka’s rice & paddy ecosystem with supplier/buyer workflows, inventory, invoices, payments, and analytics.',
            image: paddyImage, // ✅ Local image fallback
            tags: ['Spring Boot', 'React', 'MySQL', 'Stripe', 'JWT'],
            category: 'web',
            progress: 100,
            github: 'https://github.com/kiruluchamika/Golden-Grain-Mill-ITP-Project',
            demo: 'https://github.com/kiruluchamika/Golden-Grain-Mill-ITP-Project',
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
        {/* Header */}
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

        {/* Filters */}
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

        {/* Loading / Empty states */}
        {loading && (
          <div className="text-center text-muted-foreground">Loading your projects…</div>
        )}
        {!loading && projects.length === 0 && (
          <div className="text-center text-muted-foreground">
            No projects found. Check your repository list.
          </div>
        )}

        {/* Projects grid */}
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
