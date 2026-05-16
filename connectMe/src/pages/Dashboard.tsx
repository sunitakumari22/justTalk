import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useCall } from '@/context/CallContext';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CalendarClock,
  Compass,
  Mic,
  Phone,
  ShieldCheck,
  Sparkles,
  Video,
  Waves,
} from 'lucide-react';
import { toast } from 'sonner';

const quickStats = [
  { value: '3', label: 'active rooms available now' },
  { value: '10s', label: 'average time to join a flow' },
  { value: 'HD', label: 'built for clear conversations' },
];

const actions = [
  {
    type: 'video' as const,
    title: 'Start a video room',
    description: 'Launch a face-to-face conversation with a clean entry point and room-ready flow.',
    icon: Video,
    image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80',
    surface: 'bg-sky-50 border-sky-200',
    accent: 'from-sky-500 to-cyan-400',
  },
  {
    type: 'audio' as const,
    title: 'Start an audio room',
    description: 'Move quickly into voice-first conversations when you want speed and less screen fatigue.',
    icon: Phone,
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
    surface: 'bg-emerald-50 border-emerald-200',
    accent: 'from-emerald-500 to-teal-400',
  },
];

const features = [
  {
    title: 'Fast room launch',
    description: 'Start a room and move into the explore flow without extra clutter or confusing setup.',
    icon: Sparkles,
  },
  {
    title: 'Reliable conversation quality',
    description: 'Designed around clear voice and video experiences that feel lighter than heavy meeting tools.',
    icon: Waves,
  },
  {
    title: 'Simple guided navigation',
    description: 'The next step is always visible, whether you want to host, discover, or join.',
    icon: Compass,
  },
  {
    title: 'Private room mindset',
    description: 'Users get a calmer environment before they enter a live space with others.',
    icon: ShieldCheck,
  },
];

const journey = [
  'Choose video or audio based on how you want to connect.',
  'Create a room instantly and enter the explore flow.',
  'Invite others or continue into topic-based rooms when ready.',
];

const Dashboard = () => {
  const { createRoom } = useCall();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem('connectme-user');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const firstName = currentUser?.name?.split(' ')[0] || 'there';

  const startCall = (type: 'video' | 'audio') => {
    const roomName = `${type === 'video' ? 'Video' : 'Audio'}Call-${Math.floor(Math.random() * 10000)}`;
    createRoom(roomName);
    toast.success(`${type === 'video' ? 'Video' : 'Audio'} call started`);
    navigate('/exploreRooms');
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef6ff_42%,_#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[8%] top-28 h-44 w-44 rounded-full bg-sky-200/55 blur-3xl animate-float" />
        <div className="absolute right-[10%] top-20 h-60 w-60 rounded-full bg-cyan-200/50 blur-3xl animate-float-delayed" />
        <div className="absolute inset-0 bg-grid-slate [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.18))]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-20">
        <section className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Your dashboard is now a cleaner control point for calls
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Welcome back, {firstName}. Start a room that feels quick, clear, and ready.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              This dashboard now works like a proper launchpad instead of a plain hero. You can start a room fast,
              understand the next step, and move into the explore flow with better visual direction.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={() => startCall('video')}
                className="h-14 rounded-2xl bg-slate-950 px-7 text-base font-medium text-white shadow-[0_18px_45px_-18px_rgba(15,23,42,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <Video className="mr-2 h-5 w-5" />
                Start Video Call
              </Button>

              <Button
                onClick={() => startCall('audio')}
                variant="outline"
                className="h-14 rounded-2xl border-slate-200 bg-white/85 px-7 text-base font-medium text-slate-700 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                <Mic className="mr-2 h-5 w-5" />
                Start Audio Call
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-[0_18px_40px_-30px_rgba(14,116,144,0.65)] backdrop-blur"
                >
                  <div className="text-2xl font-semibold text-slate-900">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in [animation-delay:120ms]">
            <div className="overflow-hidden rounded-[34px] border border-white/60 bg-slate-950 shadow-[0_35px_120px_-48px_rgba(15,23,42,0.85)]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
                alt="People collaborating in a live conversation"
                className="h-[460px] w-full object-cover opacity-85"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-[28px] border border-white/10 bg-slate-950/75 p-5 text-white backdrop-blur-md">
                <div className="flex items-center gap-2 text-sm text-sky-200">
                  <CalendarClock className="h-4 w-4" />
                  Dashboard overview
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  Start a room in one tap, then continue into interest-based discovery or direct invites without losing momentum.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 grid max-w-7xl gap-6 lg:grid-cols-2">
          {actions.map((action, index) => {
            const Icon = action.icon;

            return (
              <article
                key={action.type}
                className={`group cursor-pointer overflow-hidden rounded-[34px] border p-5 shadow-[0_25px_70px_-42px_rgba(15,23,42,0.65)] transition duration-300 hover:-translate-y-1 ${action.surface}`}
                onClick={() => startCall(action.type)}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="overflow-hidden rounded-[28px]">
                  <img
                    src={action.image}
                    alt={action.title}
                    className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${action.accent}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-900">{action.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{action.description}</p>
                  </div>
                  <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700" />
                </div>
              </article>
            );
          })}
        </section>

        <section className="mx-auto mt-16 grid max-w-7xl gap-8 rounded-[36px] border border-slate-200/70 bg-white/75 px-6 py-8 shadow-[0_28px_90px_-50px_rgba(14,116,144,0.6)] backdrop-blur-xl lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
              <Compass className="h-4 w-4" />
              Why this dashboard feels better
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">
              Clear actions first, supporting context second, less noise overall.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Users should land here and instantly know what to do. The page now prioritizes starting a room,
              understanding the room flow, and seeing why the product is useful.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="rounded-[28px] border border-slate-200 bg-slate-50/90 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-7xl rounded-[36px] border border-slate-200/70 bg-slate-950 px-6 py-8 text-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.95)] lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-sky-200">
                <Waves className="h-4 w-4" />
                Room journey
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">A smoother flow from dashboard to conversation.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Instead of a generic landing-style page, this dashboard now acts like a real signed-in workspace with context,
                call actions, and a clearer path forward.
              </p>
            </div>

            <div className="space-y-4">
              {journey.map((step, index) => (
                <div key={step} className="flex items-start gap-4 rounded-[26px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-400/20 text-sm font-semibold text-sky-200">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-200">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/70 py-6 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>&copy; {new Date().getFullYear()} Just Talk. Your conversation dashboard, refined.</p>
          <p>Start rooms faster, discover better, and keep the interface calm.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
