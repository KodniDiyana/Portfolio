import { motion } from 'framer-motion';
import { Code2, Database, Globe, Layout, Palette, Server, Smartphone, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Layout,
    color: 'text-blue-500',
    skills: [
      { name: 'React/Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Vue.js', level: 85 },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'text-green-500',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'GraphQL', level: 80 },
      { name: 'REST APIs', level: 95 },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    color: 'text-cyan-500',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'Redis', level: 80 },
      { name: 'Supabase', level: 90 },
    ],
  },
  {
    title: 'DevOps',
    icon: Zap,
    color: 'text-orange-500',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'CI/CD', level: 82 },
      { name: 'AWS', level: 78 },
      { name: 'Vercel', level: 90 },
    ],
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    color: 'text-purple-500',
    skills: [
      { name: 'React Native', level: 88 },
      { name: 'Flutter', level: 75 },
      { name: 'iOS/Android', level: 80 },
      { name: 'PWA', level: 92 },
    ],
  },
  {
    title: 'Design',
    icon: Palette,
    color: 'text-pink-500',
    skills: [
      { name: 'UI/UX Design', level: 85 },
      { name: 'Figma', level: 88 },
      { name: 'Responsive Design', level: 95 },
      { name: 'Animation', level: 82 },
    ],
  },
];

const tools = [
  { name: 'VS Code', icon: Code2 },
  { name: 'Git', icon: Code2 },
  { name: 'Postman', icon: Globe },
  { name: 'Figma', icon: Palette },
];

export function Skills() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built over years of hands-on experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ${category.color}`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                      >
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Favorite Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <tool.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
