"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { ChevronRight, Flag, Trophy, Users, Clock, Shield, Terminal, Brain, Code, Lock } from "lucide-react";
import { TeamMember } from "@/components/landing/team";
import { useRouter } from "next/navigation";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const Page = () => {
  const [activeChallenge, setActiveChallenge] = useState(0);

  const router = useRouter();
  
  const challenges = [
    { 
      id: 1, 
      title: "Web Exploitation", 
      description: "Test your skills in finding and exploiting vulnerabilities in web applications",
      difficulty: "Medium",
      points: 250,
      solved: 12,
      icon: <Code className="h-6 w-6" />
    },
    { 
      id: 2, 
      title: "Cryptography", 
      description: "Break codes and decrypt messages using mathematical algorithms",
      difficulty: "Hard",
      points: 350,
      solved: 8,
      icon: <Lock className="h-6 w-6" />
    },
    { 
      id: 3, 
      title: "Binary Analysis", 
      description: "Reverse engineer software and exploit binary files",
      difficulty: "Expert",
      points: 450,
      solved: 5,
      icon: <Terminal className="h-6 w-6" />
    },
    { 
      id: 4, 
      title: "Forensics Challenge", 
      description: "Investigate digital artifacts to uncover hidden data",
      difficulty: "Beginner",
      points: 150,
      solved: 23,
      icon: <Shield className="h-6 w-6" />
    },
  ];

  const teamMembers = [
    {
      name: "P'Sumet",
      role: "Faculty Advisor",
      studentId: "66070221",
      githubUrl: "wwww.google.com",
      email: "aruchakhem@gmail.com",
      imageUrl: "/api/placeholder/150/150",
    },
    {
      name: "P'Cho",
      role: "Technical Lead",
      studentId: "66070222",
      githubUrl: "wwww.google.com",
      email: "aruchakhem@gmail.com",
      imageUrl: "/api/placeholder/150/150",
    },
    {
      name: "P'Tae",
      role: "Teaching Assistant",
      studentId: "66070223",
      githubUrl: "wwww.google.com",
      email: "aruchakhem@gmail.com",
      imageUrl: "/api/placeholder/150/150",
    },
    {
      name: "P'Kit",
      studentId: "66070220",
      role: "Network Specialist TA",
      githubUrl: "wwww.google.com",
      email: "aruchakhem@gmail.com",
      imageUrl: "/api/placeholder/150/150",
    },
  ];
  interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
  
  // Data for the feature cards
  const features: Feature[] = [
    {
      icon: <Shield className="h-8 w-8 text-blue-500 mb-2" />,
      title: "Security Focused",
      description: "Tackle real-world cybersecurity challenges in a controlled environment",
    },
    {
      icon: <Trophy className="h-8 w-8 text-blue-500 mb-2" />,
      title: "Compete & Win",
      description: "Climb the leaderboard and earn rewards for solving complex problems",
    },
    {
      icon: <Brain className="h-8 w-8 text-blue-500 mb-2" />,
      title: "Learn by Doing",
      description: "Apply classroom concepts to hands-on technical challenges",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500 mb-2" />,
      title: "Team Building",
      description: "Collaborate with peers and build valuable connections in the IT community",
    },
  ];


  return (
    <div className="min-h-screen flex flex-col dark:from-slate-950 dark:to-slate-900">
      <div className="w-full">
        <Navbar />
      </div>
      <main id="home" className="container mx-auto max-w-6xl px-6 min-h-screen flex flex-col md:flex-row items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="md:w-1/2 space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-blue-600">
            Fugaru
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            KMITL School of IT's premier Capture The Flag competition platform. Test your cybersecurity skills, collaborate with peers, and climb the leaderboard.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={() => router.push("/login")} className="bg-blue-600 hover:bg-blue-700 cursor-pointer hover:scale-105 duration-300 transition">
              Join Challenge <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              onClick={() => {
                const featureSection = document.getElementById('feature');
                if (featureSection) {
                  featureSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              variant="outline"
              className="cursor-pointer hover:scale-105 duration-300 transition"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="md:w-1/2 flex items-center justify-end mt-10 md:mt-0"
        >
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90 shadow-lg transform rotate-3"></div>
            <div className="absolute inset-0 rounded-xl bg-slate-900 flex items-center justify-center transform -rotate-3">
              <Flag className="h-20 w-20 text-blue-500" />
              <code className="absolute bottom-10 text-sm font-mono text-blue-400">
                FLAG{"KMITL_CTF_2025"}
              </code>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="feature" className="container mx-auto max-w-6xl px-6 pt-24 md:mt-0">
        <div className="text-center mb-16">
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold mb-4">Why Join Our CTF Platform?</h2>
          <p data-aos="fade-up" className="text-primary max-w-2xl mx-auto ">
            Enhance your cybersecurity skills with real-world challenges designed by KMITL IT faculty
          </p>
        </div>
        
        <div data-aos="flip-up"  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="border border-slate-200 dark:border-slate-800 hover:shadow-md hover:scale-105 transition-all duration-300"
          >
            <CardHeader className="pb-2">
              {feature.icon}
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
        </div>
      </section>

        {/* Platform Information Section */}
        <section data-aos="zoom-in" id="platform" className="mt-42">
          <motion.div 
            className="max-w-6xl mx-auto px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col-reverse md:flex-row items-center">
              <div className="md:w-1/2 space-y-6 flex items-center mt-10 md:mt-0">
                <motion.div 
                  className="rounded-xl overflow-hidden shadow-lg w-full"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-full h-[300px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-8">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-8">KMITL CTF Platform</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white/20 col-span-1 rounded-lg p-2">
                          <span className="block text-2xl font-bold">6</span>
                          <span className="text-xs">Categories</span>
                        </div>
                        <div className="bg-white/20 col-span-1 rounded-lg p-2">
                          <span className="block text-2xl font-bold">3</span>
                          <span className="text-xs">Difficulty Levels</span>
                        </div>
                        <div className="bg-white/20 col-span-1 rounded-lg p-2">
                          <span className="block text-2xl font-bold">24/7</span>
                          <span className="text-xs">Access</span>
                        </div>
                      </div>
                      <Badge className="bg-white/30 text-white hover:bg-white/40 mt-8">Built by KMITL Students</Badge>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="md:w-1/2 md:pl-12"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Overview</h2>
                <p className="text-muted-foreground mb-4">
                  The KMITL CTF Platform provides students with hands-on cybersecurity experience through a variety of challenges across multiple security domains.
                </p>
                <ul className="space-y-2 mb-6">
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="h-4 w-4 text-primary mr-2" />
                    <span>Web security, cryptography, and reverse engineering challenges</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="h-4 w-4 text-primary mr-2" />
                    <span>Learning resources and tutorials for beginners</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="h-4 w-4 text-primary mr-2" />
                    <span>Industry-standard tools and environments for practice</span>
                  </motion.li>
                </ul>
                <Button size="lg" className="cursor-pointer hover:scale-105 duration-300 transition">Explore Platform</Button>
              </motion.div>
            </div>
          </motion.div>
        </section>

      {/* Active Challenges Section */}
      <section data-aos="zoom-in-right" className="max-w-6xl mx-auto px-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm mt-42">
        <div className="flex flex-col md:flex-row pt-8">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Active Challenges</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Test your skills across different cybersecurity domains with our diverse set of challenges designed by KMITL's IT faculty.
            </p>
            
            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <div 
                  key={challenge.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${index === activeChallenge ? 
                    'bg-blue-50 dark:bg-slate-800 border-l-4 border-blue-500' : 
                    'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  onClick={() => setActiveChallenge(index)}
                >
                  <div className="flex items-center">
                    <div className="mr-4 p-2 rounded-full bg-blue-100 dark:bg-slate-700">
                      {challenge.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{challenge.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={
                          challenge.difficulty === "Beginner" ? "outline" : 
                          challenge.difficulty === "Medium" ? "secondary" : 
                          challenge.difficulty === "Hard" ? "destructive" : "default"
                        }>
                          {challenge.difficulty}
                        </Badge>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {challenge.points} pts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div  className="md:w-1/2 flex items-center justify-end mt-10 md:mt-0">
            <Card className="w-full max-w-md border border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{challenges[activeChallenge].title}</CardTitle>
                  <Badge variant="outline">
                    <Clock className="mr-1 h-3 w-3" />
                    Active
                  </Badge>
                </div>
                <CardDescription>
                  {challenges[activeChallenge].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Difficulty</span>
                    <span className="font-medium">{challenges[activeChallenge].difficulty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Points</span>
                    <span className="font-medium">{challenges[activeChallenge].points}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Solved by</span>
                    <span className="font-medium">{challenges[activeChallenge].solved} teams</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => router.push("/login")} className="w-full cursor-pointer">Start Challenge</Button>
              </CardFooter>
            </Card>
          </div>
          </div>
      </section>

        <section data-aos="fade-up" className="mt-42">
          <div className="container mx-auto max-w-7xl px-6">
            <div 
              className="bg-blue-600/10 rounded-xl p-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Test Your Skills?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join the KMITL CTF Platform today and start solving challenges to improve your cybersecurity skills.
              </p>
              <Button size="lg" onClick={() => router.push("/register")} className="cursor-pointer hover:scale-105 duration-300 transition">Register Now</Button>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" data-aos="fade-in" className="pt-24 lg:pt-40 mb-24 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div data-aos="fade-up" className="text-center mb-24 max-w-[1280px] mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text animate-gradient">
                Meet The Developer Team
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-4">
                Our platform is developed and maintained by KMITL's top cybersecurity experts and teaching assistants
              </p>
            </div>
            
            <div data-aos="fade-in" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamMember key={member.studentId} {...member} />
            ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    );
};

export default Page;