import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  Video,
  Waves,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const highlights = [
  {
    title: 'Browser-first rooms',
    description: 'Open a room instantly, share the link, and get everyone in without installs or setup friction.',
    icon: Globe2,
  },
  {
    title: 'Stable voice and video',
    description: 'Clear audio, responsive video, and a call flow that keeps the conversation natural.',
    icon: Waves,
  },
  {
    title: 'Private by design',
    description: 'Room-based access and secure call flows keep collaboration comfortable for teams and friends.',
    icon: ShieldCheck,
  },
];

const stats = [
  { value: '12k+', label: 'rooms started every month' },
  { value: '98%', label: 'users join under 10 seconds' },
  { value: '24/7', label: 'connection across time zones' },
];

const steps = [
  'Create or join a room in a single tap.',
  'Invite friends, teammates, or clients with a shareable link.',
  'Switch from quick catchups to longer sessions without breaking flow.',
];

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    alt: 'People collaborating during a video meeting',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    alt: 'Team members smiling during a remote conversation',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
    alt: 'Two people working together from a cafe',
  },
];

const quotes = [
  {
    name: 'Aarav',
    role: 'Product designer',
    text: 'The room flow is fast enough for spontaneous discussions. It feels lighter than traditional meeting tools.',
  },
  {
    name: 'Naina',
    role: 'Community lead',
    text: 'We use it for quick community check-ins. The interface feels friendly, not corporate or heavy.',
  },
];

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAction = (type: 'video' | 'audio') => {
    const user = localStorage.getItem('connectme-user');

    if (user) {
      navigate('/exploreRooms');
    } else {
      toast.warning('Please log in first to continue');
      navigate('/auth');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_42%,_#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-[8%] top-24 h-40 w-40 rounded-full bg-sky-200/50 blur-3xl animate-float" />
        <div className="absolute right-[10%] top-20 h-56 w-56 rounded-full bg-cyan-200/50 blur-3xl animate-float-delayed" />
        <div className="absolute inset-x-0 top-0 h-full bg-grid-slate [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.15))]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-20">
        <section className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-8">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/75 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Faster calls, cleaner rooms, more human conversations
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Meet, talk, and share energy with people who feel right there with you.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Just Talk turns quick links into polished rooms for remote catchups, team syncs, classes,
              and one-on-one calls. A softer interface, rich visuals, and fast entry make it feel natural.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={() => handleAction('video')}
                className="h-14 rounded-2xl bg-slate-950 px-7 text-base font-medium text-white shadow-[0_18px_45px_-18px_rgba(15,23,42,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <Video className="mr-2 h-5 w-5" />
                Start Video Call
              </Button>

              <Button
                onClick={() => handleAction('audio')}
                variant="outline"
                className="h-14 rounded-2xl border-slate-200 bg-white/85 px-7 text-base font-medium text-slate-700 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                <Phone className="mr-2 h-5 w-5" />
                Start Audio Call
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                No install required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Simple room-based access
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Smooth on mobile and desktop
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-[0_18px_40px_-30px_rgba(14,116,144,0.7)] backdrop-blur"
                >
                  <div className="text-2xl font-semibold text-slate-900">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl animate-fade-in [animation-delay:120ms]">
            <div className="absolute -left-8 top-10 hidden rounded-3xl border border-sky-100 bg-white/85 p-4 shadow-xl backdrop-blur md:block animate-float">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Live room active</div>
                  <div className="text-xs text-slate-500">4 people connected, zero setup</div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-slate-950 p-4 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.8)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_38%)]" />
              <div className="relative grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden rounded-[26px]">
                  <img
                    src={gallery[0].src}
                    alt={gallery[0].alt}
                    className="h-full min-h-[380px] w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-[24px]">
                    <img
                      src={gallery[1].src}
                      alt={gallery[1].alt}
                      className="h-44 w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 text-left text-white backdrop-blur-sm">
                    <div className="mb-3 flex items-center gap-2 text-sm text-sky-200">
                      <Play className="h-4 w-4" />
                      Call snapshot
                    </div>
                    <h3 className="text-xl font-semibold">Rooms that feel welcoming from the first second</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-200">
                      Softer colors, clear calls to action, and better visual hierarchy help users know where to tap next.
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-[24px]">
                    <img
                      src={gallery[2].src}
                      alt={gallery[2].alt}
                      className="h-36 w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-20 grid max-w-7xl gap-6 lg:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[28px] border border-slate-200/70 bg-white/75 p-7 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.65)] backdrop-blur animate-fade-in"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </section>

        <section className="mx-auto mt-20 grid max-w-7xl gap-8 rounded-[36px] border border-slate-200/70 bg-slate-950 px-6 py-8 text-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.95)] lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-10">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-300">Why it feels better</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              A calmer interface for work calls, quick catchups, and community rooms.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300">
              The landing experience now carries more story, more confidence, and more visual depth. Instead of a plain hero,
              users see how the product fits into real remote conversations.
            </p>

            {!isAuthenticated && (
              <Button
                onClick={() => navigate('/auth')}
                className="mt-8 h-12 rounded-2xl bg-white px-6 text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Create your account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:col-span-2">
              <div className="text-sm font-medium text-sky-200">Simple room journey</div>
              <div className="mt-4 space-y-4">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-400/20 text-sm font-semibold text-sky-200">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {quotes.map((quote) => (
              <blockquote key={quote.name} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-sm leading-7 text-slate-200">“{quote.text}”</p>
                <footer className="mt-6">
                  <div className="font-medium text-white">{quote.name}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{quote.role}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/70 py-6 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>&copy; {new Date().getFullYear()} Just Talk. Built for smoother conversations.</p>
          <p>Video rooms, quick joins, and a cleaner first impression.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
