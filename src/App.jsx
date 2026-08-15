import React from "react";

export default function App() {
  const services = [
    {
      icon: "🌐",
      title: "Web Development",
      text: "Modern, responsive and high-performance websites built for businesses and brands.",
    },
    {
      icon: "⚡",
      title: "Web Applications",
      text: "Powerful custom web applications designed around your business workflow.",
    },
    {
      icon: "📱",
      title: "Mobile Apps",
      text: "Cross-platform mobile applications with smooth and modern user experiences.",
    },
    {
      icon: "🛒",
      title: "E-Commerce",
      text: "Complete online stores with modern UI, product management and secure checkout.",
    },
    {
      icon: "🤖",
      title: "AI Automation",
      text: "Automate repetitive business processes with AI-powered intelligent solutions.",
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      text: "Clean, premium and user-focused interfaces that make products easy to use.",
    },
  ];

  const projects = [
    {
      title: "Geminix ERP",
      category: "Business Management",
      icon: "📊",
    },
    {
      title: "Student Management System",
      category: "Education Technology",
      icon: "🎓",
    },
    {
      title: "E-Commerce Platform",
      category: "Online Store",
      icon: "🛍️",
    },
    {
      title: "Business Portfolio",
      category: "Web Development",
      icon: "💻",
    },
  ];

  const courses = [
    {
      title: "Full Stack Web Development",
      duration: "6 Months",
      icon: "💻",
    },
    {
      title: "Artificial Intelligence",
      duration: "6 Months",
      icon: "🤖",
    },
    {
      title: "Machine Learning",
      duration: "6 Months",
      icon: "🧠",
    },
    {
      title: "Graphic Designing",
      duration: "3 Months",
      icon: "🎨",
    },
  ];

  return (
    <div className="min-h-screen bg-[#05070b] text-white font-sans overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#05070b]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">

          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20">
              G
            </div>

            <div>
              <h1 className="font-black text-xl tracking-tight">
                Geminix<span className="text-blue-400">.</span>
              </h1>
              <p className="text-[9px] uppercase tracking-[3px] text-gray-500">
                Software Solutions
              </p>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#home" className="hover:text-white transition">Home</a>
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#courses" className="hover:text-white transition">Courses</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>

          <a
            href="#contact"
            className="hidden sm:block px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-blue-400 hover:text-white transition"
          >
            Let's Talk
          </a>
        </div>
      </nav>


      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-24"
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Building Digital Experiences
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
                We Build
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                  Digital
                </span>
                <br />
                Futures.
              </h1>

              <p className="mt-7 max-w-xl text-gray-400 text-lg leading-8">
                Geminix is a software development company creating modern
                websites, powerful applications, AI solutions and digital
                experiences for ambitious businesses.
              </p>

              <div className="flex flex-wrap gap-4 mt-9">
                <a
                  href="#contact"
                  className="px-7 py-3.5 rounded-full bg-blue-500 hover:bg-blue-400 font-bold transition shadow-xl shadow-blue-500/20"
                >
                  Start a Project →
                </a>

                <a
                  href="#projects"
                  className="px-7 py-3.5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 font-semibold transition"
                >
                  View Our Work
                </a>
              </div>

              <div className="flex gap-10 mt-12">
                <div>
                  <h3 className="text-3xl font-black">50+</h3>
                  <p className="text-gray-500 text-sm mt-1">Projects</p>
                </div>

                <div>
                  <h3 className="text-3xl font-black">20+</h3>
                  <p className="text-gray-500 text-sm mt-1">Clients</p>
                </div>

                <div>
                  <h3 className="text-3xl font-black">10+</h3>
                  <p className="text-gray-500 text-sm mt-1">Services</p>
                </div>
              </div>
            </div>


            {/* RIGHT VISUAL */}
            <div className="relative hidden lg:block">
              <div className="relative w-full max-w-lg mx-auto">

                <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] rounded-full" />

                <div className="relative rounded-[32px] border border-white/10 bg-white/[0.035] backdrop-blur-xl p-5 shadow-2xl">

                  <div className="rounded-[24px] bg-[#080b12] border border-white/10 p-6">

                    <div className="flex items-center justify-between mb-8">
                      <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-400/70" />
                        <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                        <span className="w-3 h-3 rounded-full bg-green-400/70" />
                      </div>

                      <span className="text-xs text-gray-600">
                        geminix.dev
                      </span>
                    </div>

                    <div className="space-y-5">

                      <div className="h-4 w-32 rounded-full bg-blue-500/70" />

                      <div className="h-3 w-full rounded-full bg-white/10" />
                      <div className="h-3 w-4/5 rounded-full bg-white/10" />

                      <div className="grid grid-cols-3 gap-3 pt-5">
                        <div className="h-28 rounded-2xl bg-blue-500/10 border border-blue-500/10" />
                        <div className="h-28 rounded-2xl bg-cyan-500/10 border border-cyan-500/10" />
                        <div className="h-28 rounded-2xl bg-purple-500/10 border border-purple-500/10" />
                      </div>

                      <div className="h-32 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                        <div className="flex items-end gap-2 h-full">
                          <div className="w-full h-1/3 bg-blue-500/30 rounded-t-lg" />
                          <div className="w-full h-1/2 bg-blue-500/40 rounded-t-lg" />
                          <div className="w-full h-2/3 bg-blue-500/50 rounded-t-lg" />
                          <div className="w-full h-4/5 bg-blue-500/60 rounded-t-lg" />
                          <div className="w-full h-full bg-blue-500/80 rounded-t-lg" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -left-12 top-24 px-5 py-4 rounded-2xl border border-white/10 bg-[#0b0e15]/90 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      ⚡
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Performance</p>
                      <p className="font-bold">98.9%</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 bottom-16 px-5 py-4 rounded-2xl border border-white/10 bg-[#0b0e15]/90 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      🚀
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Projects</p>
                      <p className="font-bold">50+ Delivered</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SERVICES */}
      <section id="services" className="py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="max-w-2xl mb-16">
            <p className="text-blue-400 text-sm font-bold uppercase tracking-[3px]">
              What We Do
            </p>

            <h2 className="text-4xl sm:text-5xl font-black mt-4">
              Solutions that move
              <span className="text-gray-500"> businesses forward.</span>
            </h2>

            <p className="text-gray-500 mt-5 leading-7">
              From idea to execution, we create reliable digital products
              designed to solve real business problems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-7 rounded-3xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.05] hover:border-blue-500/30 transition duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-2xl mb-7 group-hover:scale-110 transition">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-500 leading-7 text-sm">
                  {service.text}
                </p>

                <div className="mt-6 text-blue-400 text-sm font-semibold group-hover:translate-x-1 transition">
                  Explore Service →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ABOUT */}
      <section id="about" className="py-28 bg-white/[0.018] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div>
              <p className="text-blue-400 text-sm font-bold uppercase tracking-[3px]">
                About Geminix
              </p>

              <h2 className="text-4xl sm:text-5xl font-black mt-4 leading-tight">
                Technology with a
                <span className="text-blue-400"> purpose.</span>
              </h2>

              <p className="text-gray-400 mt-7 leading-8">
                We are a technology-focused team passionate about turning
                ideas into powerful digital products. Our goal is simple:
                build technology that looks great, performs exceptionally
                and creates real value.
              </p>

              <p className="text-gray-500 mt-5 leading-8">
                Whether you are a startup, small business, educational
                institute or growing company, Geminix helps you establish
                a strong digital presence and automate your operations.
              </p>

              <a
                href="#contact"
                className="inline-block mt-8 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition font-semibold"
              >
                Work With Us →
              </a>
            </div>


            <div className="grid grid-cols-2 gap-4">

              <div className="p-7 rounded-3xl border border-white/10 bg-[#080b12]">
                <div className="text-4xl font-black text-blue-400">50+</div>
                <p className="text-gray-500 mt-2">Projects Completed</p>
              </div>

              <div className="p-7 rounded-3xl border border-white/10 bg-[#080b12] mt-10">
                <div className="text-4xl font-black text-cyan-400">20+</div>
                <p className="text-gray-500 mt-2">Happy Clients</p>
              </div>

              <div className="p-7 rounded-3xl border border-white/10 bg-[#080b12]">
                <div className="text-4xl font-black text-purple-400">10+</div>
                <p className="text-gray-500 mt-2">Technology Services</p>
              </div>

              <div className="p-7 rounded-3xl border border-white/10 bg-[#080b12] mt-10">
                <div className="text-4xl font-black text-green-400">24/7</div>
                <p className="text-gray-500 mt-2">Technical Support</p>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* PROJECTS */}
      <section id="projects" className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-blue-400 text-sm font-bold uppercase tracking-[3px]">
                Our Work
              </p>

              <h2 className="text-4xl sm:text-5xl font-black mt-4">
                Featured Projects
              </h2>
            </div>

            <p className="text-gray-500 max-w-md">
              A selection of digital products and solutions created by
              the Geminix team.
            </p>
          </div>


          <div className="grid md:grid-cols-2 gap-5">

            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden min-h-[330px] rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-8 flex flex-col justify-end"
              >

                <div className="absolute top-8 right-8 text-5xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition duration-500">
                  {project.icon}
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />

                <div className="relative">
                  <p className="text-blue-400 text-sm font-semibold mb-3">
                    {project.category}
                  </p>

                  <h3 className="text-3xl font-black">
                    {project.title}
                  </h3>

                  <div className="mt-5 text-gray-500 text-sm group-hover:text-gray-300 transition">
                    View Case Study →
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>


      {/* TECHNOLOGY */}
      <section className="py-20 border-y border-white/5 bg-white/[0.018]">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <p className="text-gray-500 uppercase tracking-[3px] text-xs font-bold">
            Technologies We Use
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">

            {[
              "React.js",
              "JavaScript",
              "Node.js",
              "Express.js",
              "MongoDB",
              "Tailwind CSS",
              "Bootstrap",
              "React Native",
              "REST APIs",
              "Git & GitHub",
              "AI",
              "Automation",
            ].map((tech, index) => (
              <div
                key={index}
                className="px-5 py-3 rounded-full border border-white/10 bg-white/[0.025] text-gray-400 hover:text-white hover:border-blue-500/30 transition"
              >
                {tech}
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* COURSES */}
      <section id="courses" className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="max-w-2xl mb-14">
            <p className="text-blue-400 text-sm font-bold uppercase tracking-[3px]">
              Geminix Institute
            </p>

            <h2 className="text-4xl sm:text-5xl font-black mt-4">
              Learn. Build. <span className="text-blue-400">Grow.</span>
            </h2>

            <p className="text-gray-500 mt-5 leading-7">
              Practical technology courses designed to help students
              build real-world skills and start their careers.
            </p>
          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {courses.map((course, index) => (
              <div
                key={index}
                className="p-7 rounded-3xl border border-white/10 bg-white/[0.025] hover:border-blue-500/30 transition"
              >

                <div className="text-4xl mb-7">
                  {course.icon}
                </div>

                <h3 className="text-xl font-bold leading-7">
                  {course.title}
                </h3>

                <div className="mt-5 text-sm text-gray-500">
                  Duration
                </div>

                <div className="text-blue-400 font-semibold mt-1">
                  {course.duration}
                </div>

                <button className="w-full mt-7 py-3 rounded-xl border border-white/10 hover:bg-blue-500 hover:border-blue-500 transition font-semibold">
                  View Course
                </button>

              </div>
            ))}

          </div>
        </div>
      </section>


      {/* PROCESS */}
      <section className="py-28 bg-white/[0.018] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-blue-400 text-sm font-bold uppercase tracking-[3px]">
              Our Process
            </p>

            <h2 className="text-4xl sm:text-5xl font-black mt-4">
              From idea to reality.
            </h2>
          </div>


          <div className="grid md:grid-cols-4 gap-5">

            {[
              ["01", "Discover", "We understand your goals, audience and business requirements."],
              ["02", "Design", "We create clean interfaces and a user experience around your vision."],
              ["03", "Develop", "Our team transforms the design into a fast and reliable product."],
              ["04", "Launch", "We test, deploy and help you grow your digital product."],
            ].map((item, index) => (
              <div key={index} className="relative">

                <div className="text-6xl font-black text-white/[0.05]">
                  {item[0]}
                </div>

                <h3 className="text-xl font-bold mt-[-20px] relative">
                  {item[1]}
                </h3>

                <p className="text-gray-500 text-sm leading-6 mt-3">
                  {item[2]}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6">

          <div className="relative overflow-hidden rounded-[36px] border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-white/[0.03] to-cyan-500/5 p-10 sm:p-16 text-center">

            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full" />

            <div className="relative">

              <p className="text-blue-400 text-sm font-bold uppercase tracking-[3px]">
                Have an Idea?
              </p>

              <h2 className="text-4xl sm:text-6xl font-black mt-5 leading-tight">
                Let's build something
                <br />
                <span className="text-blue-400">amazing together.</span>
              </h2>

              <p className="text-gray-500 max-w-xl mx-auto mt-6 leading-7">
                Tell us about your project and our team will help you
                turn your idea into a powerful digital solution.
              </p>

              <a
                href="#contact"
                className="inline-block mt-8 px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-400 font-bold transition shadow-xl shadow-blue-500/20"
              >
                Start Your Project →
              </a>

            </div>
          </div>
        </div>
      </section>


      {/* CONTACT */}
      <section id="contact" className="py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-16">

            <div>
              <p className="text-blue-400 text-sm font-bold uppercase tracking-[3px]">
                Contact Us
              </p>

              <h2 className="text-4xl sm:text-5xl font-black mt-4">
                Let's talk about
                <span className="text-gray-500"> your project.</span>
              </h2>

              <p className="text-gray-500 mt-6 leading-7 max-w-lg">
                Have a project, business idea or question? Send us a
                message and let's discuss how Geminix can help.
              </p>

              <div className="space-y-5 mt-10">

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    ✉️
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">
                      Email
                    </p>
                    <p className="font-semibold">
                      gemnixxofficial@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    📱
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">
                      WhatsApp
                    </p>
                    <p className="font-semibold">
                      Let's Connect
                    </p>
                  </div>
                </div>

              </div>
            </div>


            <div className="p-7 sm:p-9 rounded-3xl border border-white/10 bg-white/[0.025]">

              <div className="grid sm:grid-cols-2 gap-5">

                <div>
                  <label className="text-sm text-gray-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full mt-2 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="w-full mt-2 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-blue-500 transition"
                  />
                </div>

              </div>

              <div className="mt-5">
                <label className="text-sm text-gray-400">
                  Project Type
                </label>

                <select className="w-full mt-2 px-4 py-3.5 rounded-xl bg-[#0b0e15] border border-white/10 outline-none focus:border-blue-500 transition text-gray-300">
                  <option>Website Development</option>
                  <option>Web Application</option>
                  <option>Mobile Application</option>
                  <option>E-Commerce</option>
                  <option>AI / Automation</option>
                  <option>UI/UX Design</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="mt-5">
                <label className="text-sm text-gray-400">
                  Tell us about your project
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your project details..."
                  className="w-full mt-2 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 outline-none focus:border-blue-500 transition resize-none"
                />
              </div>

              <button className="w-full mt-6 py-4 rounded-xl bg-blue-500 hover:bg-blue-400 transition font-bold shadow-lg shadow-blue-500/10">
                Send Inquiry →
              </button>

            </div>

          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-black">
                G
              </div>

              <div>
                <div className="font-black">
                  Geminix<span className="text-blue-400">.</span>
                </div>
                <div className="text-[9px] tracking-[2px] text-gray-600 uppercase">
                  Software Solutions
                </div>
              </div>

            </div>

            <div className="text-sm text-gray-600 text-center">
              © 2026 Geminix. All rights reserved.
            </div>

            <div className="flex gap-5 text-sm text-gray-500">
              <a href="#home" className="hover:text-white transition">
                Instagram
              </a>
              <a href="#home" className="hover:text-white transition">
                Facebook
              </a>
              <a href="#home" className="hover:text-white transition">
                LinkedIn
              </a>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}