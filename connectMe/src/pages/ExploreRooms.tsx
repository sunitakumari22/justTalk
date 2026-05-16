import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ArrowRight, Compass, PlusCircle, Sparkles, Users, Waves } from "lucide-react";
import Navbar from "@/components/Navbar";

const interestOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Music", label: "Music" },
  { value: "Sports", label: "Sports" },
  { value: "Gaming", label: "Gaming" },
  { value: "Art", label: "Art" },
  { value: "Education", label: "Education" },
  { value: "Health", label: "Health" },
  { value: "Travel", label: "Travel" },
];

type InterestOption = {
  value: string;
  label: string;
};

const roomModes = [
  {
    type: "create" as const,
    title: "Create your own room",
    description: "Start a fresh conversation space, choose the topic, and invite people into something you host.",
    icon: PlusCircle,
    accent: "from-sky-500 to-cyan-400",
    surface: "bg-sky-50 border-sky-200",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    type: "join" as const,
    title: "Join a live room",
    description: "Browse shared interests and jump into active spaces where people are already online and talking.",
    icon: Users,
    accent: "from-emerald-500 to-teal-400",
    surface: "bg-emerald-50 border-emerald-200",
    image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
  },
];

const steps = [
  "Pick whether you want to host a conversation or join one.",
  "Choose the interest that best matches your mood or topic.",
  "Move directly into the room flow with less confusion and clearer intent.",
];

const ExploreRooms = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<InterestOption | null>(null);
  const [actionType, setActionType] = useState<"create" | "join" | null>(null);

  const handleOpenDialog = (type: "create" | "join") => {
    setActionType(type);
    setOpenDialog(true);
  };

  const handleProceed = () => {
    if (!selectedInterest) return;

    localStorage.setItem("interest", selectedInterest.value);

    if (actionType === "create") {
      navigate("/room", { state: { interest: selectedInterest.value } });
    } else {
      navigate("/joinedUser", { state: { interest: selectedInterest.value } });
    }

    setSelectedInterest(null);
    setOpenDialog(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef6ff_40%,_#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[9%] top-28 h-40 w-40 rounded-full bg-sky-200/55 blur-3xl animate-float" />
        <div className="absolute right-[10%] top-20 h-60 w-60 rounded-full bg-cyan-200/50 blur-3xl animate-float-delayed" />
        <div className="absolute inset-0 bg-grid-slate [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.16))]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-20">
        <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm backdrop-blur">
              <Compass className="h-4 w-4" />
              Explore conversations by intent, not clutter
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Pick your vibe, choose your topic, and enter a room with clarity.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              This page now guides users more clearly. Instead of a plain choice screen, it explains the room journey,
              adds visual cues, and makes the create-or-join decision feel immediate.
            </p>

            <div className="mt-8 grid gap-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-start gap-4 rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.7)] backdrop-blur">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in [animation-delay:100ms]">
            <div className="overflow-hidden rounded-[34px] border border-white/60 bg-slate-950 shadow-[0_35px_120px_-48px_rgba(15,23,42,0.85)]">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80"
                alt="Friends connecting together in a casual setting"
                className="h-[440px] w-full object-cover opacity-80"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-[28px] border border-white/10 bg-slate-950/75 p-5 text-white backdrop-blur-md">
                <div className="flex items-center gap-2 text-sm text-sky-200">
                  <Sparkles className="h-4 w-4" />
                  Better direction for new users
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  Users understand what happens next before they click. That makes the room flow feel lighter and more intentional.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 grid max-w-7xl gap-6 lg:grid-cols-2">
          {roomModes.map((mode, index) => {
            const Icon = mode.icon;

            return (
              <article
                key={mode.type}
                className={`group cursor-pointer overflow-hidden rounded-[34px] border p-5 shadow-[0_25px_70px_-42px_rgba(15,23,42,0.65)] transition duration-300 hover:-translate-y-1 ${mode.surface}`}
                onClick={() => handleOpenDialog(mode.type)}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="overflow-hidden rounded-[28px]">
                  <img
                    src={mode.image}
                    alt={mode.title}
                    className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${mode.accent}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-900">{mode.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{mode.description}</p>
                  </div>
                  <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-700" />
                </div>
              </article>
            );
          })}
        </section>

        <section className="mx-auto mt-14 max-w-7xl rounded-[34px] border border-slate-200/70 bg-white/75 p-6 shadow-[0_25px_80px_-50px_rgba(14,116,144,0.6)] backdrop-blur sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
                <Waves className="h-4 w-4" />
                Room flow summary
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">Create when you want control. Join when you want momentum.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                The interface now explains both paths clearly so users do not have to guess which option to pick. That reduces friction before the dialog opens.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {interestOptions.slice(0, 6).map((interest) => (
                <div key={interest.value} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-sm font-medium text-slate-700">
                  {interest.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interest Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-md rounded-[30px] border border-slate-200 bg-white/95 p-6 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.8)] backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-semibold tracking-tight text-slate-950">
                Select your interest
              </DialogTitle>
              <p className="mt-2 text-center text-sm leading-7 text-slate-600">
                Pick the topic you want to host or join. The next step will use this interest to route you correctly.
              </p>
            </DialogHeader>

            <Select
              options={interestOptions}
              value={selectedInterest}
              onChange={(option) => setSelectedInterest(option as InterestOption | null)}
              placeholder="Choose an interest"
              className="mt-4"
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: 52,
                  borderRadius: 18,
                  borderColor: state.isFocused ? '#38bdf8' : '#cbd5e1',
                  boxShadow: state.isFocused ? '0 0 0 4px rgba(56, 189, 248, 0.12)' : 'none',
                  '&:hover': {
                    borderColor: '#38bdf8',
                  },
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: 18,
                  overflow: 'hidden',
                  zIndex: 30,
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#0f172a' : state.isFocused ? '#f0f9ff' : '#ffffff',
                  color: state.isSelected ? '#ffffff' : '#334155',
                  padding: '12px 14px',
                }),
              }}
            />

            <DialogFooter className="mt-6">
              <Button
                onClick={handleProceed}
                disabled={!selectedInterest}
                className="h-12 w-full rounded-2xl bg-slate-950 py-2 font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/70 py-6 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Just Talk. Discover rooms with better guidance and cleaner visuals.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ExploreRooms;
