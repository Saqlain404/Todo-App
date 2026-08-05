import React from "react";
import { Link } from "react-router-dom";
// import { getCurrentUser } from "../utils/storage";
import {
  LogoIcon,
  PlusIcon,
  CheckIcon,
  PencilIcon,
  SearchIcon,
  FolderIcon,
  BoltIcon,
  ShieldIcon,
  ListIcon,
  CheckCircleIcon,
} from "./Icons";
import {useAuth} from "../context/AuthContext";

const NavLink = ({ href, children }) => (
  <a href={href} className="text-white/70 hover:text-white transition text-sm font-medium">
    {children}
  </a>
);

const FeatureCard = ({ icon, title, text }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#75da8b]/40 transition group">
    <span className="w-12 h-12 rounded-xl bg-[#064c5f] text-[#75da8b] flex items-center justify-center mb-4 group-hover:scale-110 transition">
      {icon}
    </span>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-white/60 text-sm leading-relaxed">{text}</p>
  </div>
);

const MockTask = ({ title, done, tag }) => (
  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
    <span
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
        done ? "bg-[#75da8b] border-[#75da8b] text-[#06252e]" : "border-[#75da8b]"
      }`}
    >
      {done && <CheckIcon className="w-3.5 h-3.5" />}
    </span>
    <span className={`flex-1 text-sm truncate ${done ? "line-through text-white/40" : "text-white/90"}`}>
      {title}
    </span>
    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#064c5f] text-[#75da8b] shrink-0">
      {tag}
    </span>
  </div>
);

const Mockup = () => (
  <div className="relative w-full max-w-md mx-auto">
    <div className="absolute -inset-4 bg-[#75da8b]/20 blur-3xl rounded-full" />
    <div className="relative bg-[#232b2d] border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="w-8 h-8 rounded-lg bg-[#75da8b] text-[#06252e] flex items-center justify-center">
          <LogoIcon className="w-4 h-4" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold leading-none">Inbox</p>
          <p className="text-[11px] text-white/40">3 of 5 tasks done</p>
        </div>
        <span className="text-white/40 text-xs flex items-center gap-1">
          <SearchIcon className="w-4 h-4" />
        </span>
      </div>
      <div className="p-4 space-y-2.5">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
          <input
            readOnly
            value="Write your next task..."
            className="flex-1 bg-transparent text-sm text-white/60 focus:outline-none"
          />
          <span className="w-7 h-7 rounded-lg bg-[#75da8b] text-[#06252e] flex items-center justify-center">
            <PlusIcon className="w-4 h-4" />
          </span>
        </div>
        <MockTask title="Design landing page" done tag="Design" />
        <MockTask title="Write project brief" done tag="Work" />
        <MockTask title="Review PR #128" tag="Dev" />
        <MockTask title="Plan weekend trip" tag="Personal" />
        <MockTask title="Ship v2.0 release" tag="Work" />
      </div>
      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex justify-between text-xs text-white/50 mb-1.5">
          <span>Progress</span>
          <span className="text-[#75da8b] font-medium">60%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-3/5 rounded-full bg-[#75da8b]" />
        </div>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  // const user = getCurrentUser();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#2c3335] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#2c3335]/90 backdrop-blur-md">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-[#75da8b] text-[#06252e] flex items-center justify-center">
              <LogoIcon className="w-5 h-5" />
            </span>
            <span className="text-xl font-bold tracking-tight">Taskly</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#about">About</NavLink>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/todo"
                className="px-5 py-2 rounded-xl bg-[#75da8b] text-[#06252e] text-sm font-bold hover:bg-[#8be4a0] transition"
              >
                Open App
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl bg-[#75da8b] text-[#06252e] text-sm font-bold hover:bg-[#8be4a0] transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064c5f]/60 text-[#75da8b] text-xs font-semibold mb-6">
              <BoltIcon className="w-4 h-4" /> Plan, organize, and ship faster
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              Your tasks, projects & ideas —{" "}
              <span className="text-[#75da8b]">beautifully organized</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
              Taskly is a professional todo app that keeps every task in its
              place. Create projects, track progress, and never lose track of
              what matters — all stored securely on your device.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                to={user ? "/todo" : "/signup"}
                className="px-7 py-3 rounded-xl bg-[#75da8b] text-[#06252e] font-bold hover:bg-[#8be4a0] transition shadow-lg shadow-[#75da8b]/20"
              >
                {user ? "Open Your Tasks" : "Get Started Free"}
              </Link>
              <a
                href="#features"
                className="px-7 py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition"
              >
                See Features
              </a>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <div>
                <p className="text-2xl font-bold text-[#75da8b]">100%</p>
                <p className="text-white/50">Free to use</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#75da8b]">No cloud</p>
                <p className="text-white/50">Data stays local</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#75da8b]">Unlimited</p>
                <p className="text-white/50">Projects & tasks</p>
              </div>
            </div>
          </div>

          <Mockup />
        </section>

        <section id="features" className="py-16 bg-[#232b2d]/60 border-y border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Everything you need to{" "}
                <span className="text-[#75da8b]">get things done</span>
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Built to be fast, focused, and delightful — from your first task
                to your hundredth project.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<PlusIcon className="w-6 h-6" />}
                title="Add tasks in seconds"
                text="Type a task, pick a project, and press enter. Your to-do list updates instantly."
              />
              <FeatureCard
                icon={<PencilIcon className="w-6 h-6" />}
                title="Edit & organize"
                text="Rename a task inline with a single click and keep everything fresh."
              />
              <FeatureCard
                icon={<CheckCircleIcon className="w-6 h-6" />}
                title="Track completion"
                text="Mark tasks done with one tap and watch your progress bar fill up."
              />
              <FeatureCard
                icon={<FolderIcon className="w-6 h-6" />}
                title="Projects & filters"
                text="Group work into projects. Filter by All, Today, or Completed in a click."
              />
              <FeatureCard
                icon={<SearchIcon className="w-6 h-6" />}
                title="Instant search"
                text="Search across every task so nothing ever slips through the cracks."
              />
              <FeatureCard
                icon={<ShieldIcon className="w-6 h-6" />}
                title="Private by design"
                text="Your data lives only in your browser. No accounts on a server, no tracking."
              />
            </div>
          </div>
        </section>

        <section id="about" className="py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-5">
              <span className="w-14 h-14 rounded-2xl bg-[#75da8b] text-[#06252e] flex items-center justify-center">
                <ListIcon className="w-7 h-7" />
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A todo app that respects your focus
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Taskly strips away the noise. A clean workspace, a smart sidebar
              for your projects, and a progress view that keeps you motivated —
              everything you need and nothing you don't.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {["Projects", "Today", "Completed", "Search", "Progress", "Your account"].map(
                (f) => (
                  <span
                    key={f}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 flex items-center gap-2"
                  >
                    <CheckIcon className="w-4 h-4 text-[#75da8b]" />
                    {f}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#064c5f] to-[#0a5f74] rounded-3xl border border-[#75da8b]/30 p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Ready to get organized?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Create your free account and start checking things off today.
            </p>
            <Link
              to={user ? "/todo" : "/signup"}
              className="inline-block px-8 py-3 rounded-xl bg-[#75da8b] text-[#06252e] font-bold hover:bg-[#8be4a0] transition shadow-lg shadow-black/20"
            >
              {user ? "Go to your dashboard" : "Create Free Account"}
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#75da8b] text-[#06252e] flex items-center justify-center">
              <LogoIcon className="w-4 h-4" />
            </span>
            <span className="font-semibold text-white/80">Taskly</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Projects</span>
            <span>Today</span>
            <span>Completed</span>
          </div>
          <p>© {new Date().getFullYear()} Taskly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
