// portfolio.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

interface Skills {
  frontend: string[];
  backend: string[];
  tools: string[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <!-- Navigation -->
      <nav class="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            &lt;Dev /&gt;
          </h1>
          
          <button 
            class="md:hidden text-white"
            (click)="toggleMenu()">
            <svg *ngIf="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg *ngIf="isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div [class]="(isMenuOpen ? 'flex' : 'hidden') + ' md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-slate-900 md:bg-transparent p-6 md:p-0 gap-6'">
            <button *ngFor="let section of sections"
              (click)="scrollToSection(section)"
              [class]="'capitalize hover:text-purple-400 transition-colors ' + (activeSection === section ? 'text-purple-400' : '')">
              {{section}}
            </button>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section id="home" class="min-h-screen flex items-center justify-center px-6 pt-20">
        <div class="max-w-4xl text-center">
          <div class="mb-8 animate-fade-in">
            <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
            </div>
          </div>
          <h2 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Fullstack Developer
          </h2>
          <p class="text-xl md:text-2xl text-gray-300 mb-8">
            Building scalable web applications with modern technologies
          </p>
          <div class="flex gap-4 justify-center">
            <button 
              (click)="scrollToSection('projects')"
              class="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
              View Projects
            </button>
            <button 
              (click)="scrollToSection('contact')"
              class="px-8 py-3 border border-purple-500 hover:bg-purple-500/10 rounded-lg transition-colors">
              Contact Me
            </button>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="min-h-screen flex items-center justify-center px-6 py-20">
        <div class="max-w-4xl">
          <h3 class="text-4xl font-bold mb-8 text-center">About Me</h3>
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
            <p class="text-lg text-gray-300 mb-4">
              I'm a passionate fullstack developer with expertise in building modern web applications. 
              I love solving complex problems and creating efficient, scalable solutions.
            </p>
            <p class="text-lg text-gray-300 mb-4">
              With a strong foundation in both frontend and backend technologies, I specialize in 
              creating seamless user experiences while ensuring robust server-side architecture.
            </p>
            <p class="text-lg text-gray-300">
              When I'm not coding, you can find me contributing to open-source projects, learning 
              new technologies, or sharing knowledge with the developer community.
            </p>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section id="skills" class="min-h-screen flex items-center justify-center px-6 py-20">
        <div class="max-w-6xl w-full">
          <h3 class="text-4xl font-bold mb-12 text-center">Skills & Technologies</h3>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all">
              <div class="flex items-center gap-3 mb-4">
                <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
                <h4 class="text-2xl font-semibold">Frontend</h4>
              </div>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let skill of skills.frontend" class="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                 {{skill}}
                </span>
              </div>
            </div>

            <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/50 transition-all">
              <div class="flex items-center gap-3 mb-4">
                <svg class="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
                </svg>
                <h4 class="text-2xl font-semibold">Backend</h4>
              </div>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let skill of skills.backend" class="px-3 py-1 bg-pink-500/20 rounded-full text-sm">
                  {{skill}}
                </span>
              </div>
            </div>

            <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all">
              <div class="flex items-center gap-3 mb-4">
                <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
                </svg>
                <h4 class="text-2xl font-semibold">Tools & Cloud</h4>
              </div>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let skill of skills.tools" class="px-3 py-1 bg-blue-500/20 rounded-full text-sm">
                  {{skill}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="min-h-screen flex items-center justify-center px-6 py-20">
        <div class="max-w-6xl w-full">
          <h3 class="text-4xl font-bold mb-12 text-center">Featured Projects</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let project of projects" class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:transform hover:scale-105">
              <h4 class="text-xl font-semibold mb-3">{{project.title}}</h4>
              <p class="text-gray-400 mb-4 text-sm">{{project.description}}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span *ngFor="let tech of project.tech" class="px-2 py-1 bg-purple-500/20 rounded text-xs">
                  {{tech}}
                </span>
              </div>
              <a [href]="project.link" class="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
                View Project
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="min-h-screen flex items-center justify-center px-6 py-20">
        <div class="max-w-2xl w-full text-center">
          <h3 class="text-4xl font-bold mb-8">Get In Touch</h3>
          <p class="text-xl text-gray-300 mb-12">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div class="flex gap-6 justify-center mb-8">
            <a href="https://github.com/yourusername" class="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/yourusername" class="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="mailto:your.email@example.com" class="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>
          <a 
            href="mailto:your.email@example.com"
            class="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
            Send Message
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-purple-500/20 py-6 text-center text-gray-400">
        <p>© 2024 Fullstack Developer. Built with Angular & Tailwind CSS</p>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PortfolioComponent {
  isMenuOpen = false;
  activeSection = 'home';
  sections = ['home', 'about', 'skills', 'projects', 'contact'];

  skills: Skills = {
    frontend: ['Angular', 'TypeScript', 'React', 'Tailwind CSS', 'RxJS'],
    backend: ['Node.js', 'Python', 'Express', 'Django', 'PostgreSQL'],
    tools: ['Git', 'Docker', 'AWS', 'MongoDB', 'Redis']
  };

  projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, inventory management, and analytics dashboard.',
      tech: ['Angular', 'Node.js', 'PostgreSQL', 'Stripe'],
      link: '#'
    },
    {
      title: 'Real-Time Chat Application',
      description: 'Scalable chat app with WebSocket support, group messaging, and file sharing capabilities.',
      tech: ['Angular', 'Socket.io', 'Express', 'MongoDB'],
      link: '#'
    },
    {
      title: 'Task Management System',
      description: 'Collaborative project management tool with real-time updates, kanban boards, and team analytics.',
      tech: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL'],
      link: '#'
    }
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.isMenuOpen = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const current = this.sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    if (current) {
      this.activeSection = current;
    }
  }
}