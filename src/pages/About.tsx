import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Users, Target, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const timeline = [
  {
    year: '2024',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    description: 'Leading development of enterprise solutions and mentoring junior developers.',
    icon: Briefcase,
  },
  {
    year: '2022',
    title: 'Full Stack Developer',
    company: 'Digital Solutions Co.',
    description: 'Built scalable web applications and improved system architecture.',
    icon: Briefcase,
  },
  {
    year: '2020',
    title: 'Frontend Developer',
    company: 'Creative Studio',
    description: 'Developed responsive user interfaces and collaborated with design teams.',
    icon: Briefcase,
  },
  {
    year: '2019',
    title: 'B.S. Computer Science',
    company: 'University of Technology',
    description: 'Graduated with honors, specialized in software engineering and AI.',
    icon: GraduationCap,
  },
];

const values = [
  {
    icon: Target,
    title: 'Goal-Oriented',
    description: 'Focused on delivering measurable results and exceeding expectations.',
  },
  {
    icon: Users,
    title: 'Collaborative',
    description: 'Strong believer in teamwork and open communication.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to quality code and best practices in every project.',
  },
  {
    icon: Heart,
    title: 'Passionate',
    description: 'Genuinely love what I do and continuously learning new technologies.',
  },
];

const metrics = [
  { label: 'Client Satisfaction', value: 98, color: 'bg-blue-500' },
  { label: 'Code Quality', value: 95, color: 'bg-cyan-500' },
  { label: 'Project Delivery', value: 100, color: 'bg-teal-500' },
  { label: 'Team Collaboration', value: 96, color: 'bg-green-500' },
];

export function About() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A passionate developer dedicated to creating exceptional digital experiences
            through innovative solutions and clean, maintainable code.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card>
            <CardHeader>
              <CardTitle>My Journey</CardTitle>
              <CardDescription>
                Professional experience and educational background
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                        <item.icon className="w-5 h-5" />
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="text-sm text-muted-foreground mb-1">{item.year}</div>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <div className="text-sm text-muted-foreground mb-2">{item.company}</div>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Performance Metrics</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <span className="text-sm font-bold">{metric.value}%</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: 'easeOut' }}
                        className={`h-full ${metric.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
