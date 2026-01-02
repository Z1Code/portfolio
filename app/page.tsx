export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Portfolio</h1>
          <div className="flex gap-6">
            <a href="#about" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">About</a>
            <a href="#projects" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Projects</a>
            <a href="#skills" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Skills</a>
            <a href="#contact" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 animate-fade-in">
            Hi, I&apos;m a <span className="text-blue-600 dark:text-blue-400">Web Developer</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
            Building modern, responsive, and user-friendly web applications with cutting-edge technologies
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="#projects" 
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-full font-medium hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">About Me</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-center max-w-3xl mx-auto">
            I&apos;m a passionate web developer with expertise in building modern web applications. 
            I focus on creating clean, efficient, and scalable solutions that solve real-world problems. 
            My journey in web development has been driven by curiosity and a constant desire to learn and improve.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow">
              <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4"></div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Project One</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">A modern web application built with Next.js and TypeScript</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">Next.js</span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">TypeScript</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow">
              <div className="w-full h-48 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl mb-4"></div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Project Two</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">Full-stack application with React and Node.js</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm">Node.js</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow">
              <div className="w-full h-48 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mb-4"></div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Project Three</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">E-commerce platform with modern UI/UX</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm">Tailwind</span>
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm">API</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-12 text-center">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">⚛️</span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Frontend</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">React, Next.js, TypeScript, Tailwind CSS</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-600 dark:bg-green-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">🔧</span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Backend</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Node.js, Express, REST APIs, GraphQL</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-600 dark:bg-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">💾</span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Database</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">PostgreSQL, MongoDB, Redis, Prisma</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-600 dark:bg-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">DevOps</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Git, Docker, CI/CD, Vercel, AWS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">Let&apos;s Work Together</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            I&apos;m always interested in hearing about new projects and opportunities.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="mailto:contact@example.com" 
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Send Email
            </a>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-full font-medium hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-full font-medium hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto text-center text-zinc-600 dark:text-zinc-400">
          <p>&copy; 2026 Portfolio. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
