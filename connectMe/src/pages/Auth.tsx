
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ArrowRight, CheckCircle2, Eye, EyeOff, ShieldCheck, Sparkles, UserRoundCheck } from 'lucide-react';

const benefits = [
  'Create a profile once and jump into rooms faster.',
  'Use the same account for calls, room discovery, and invites.',
  'Keep the entry flow simple for mobile and desktop users.',
];

const trustPoints = [
  {
    title: 'Quick room access',
    description: 'Sign in and move directly into your dashboard or matching room flows without extra setup.',
    icon: Sparkles,
  },
  {
    title: 'Simple identity',
    description: 'Name, email, and password are all you need to start connecting with people.',
    icon: UserRoundCheck,
  },
  {
    title: 'Safer sessions',
    description: 'A cleaner entry point gives users more confidence before joining live conversations.',
    icon: ShieldCheck,
  },
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      if (isLogin) {
        const res = await fetch(`https://connect-me-backend.vercel.app/api/userList/${email}/${password}`);
        const data = await res.json();
  
        if (res.ok && data) {
          localStorage.setItem('connectme-user', JSON.stringify(data));
          toast.success('Logged in successfully!');
          navigate('/dashboard');
        } else {
          toast.error(data.message || 'Invalid credentials');
        }
      } else {
        if (!name.trim()) {
          toast.error('Please enter your name');
          setIsLoading(false);
          return;
        }
  
        const res = await fetch('https://connect-me-backend.vercel.app/api/newuser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          localStorage.setItem('connectme-user', JSON.stringify(data));
          toast.success('Account created successfully!');
          navigate('/');
        } else {
          toast.error(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef5ff_42%,_#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[10%] top-28 h-44 w-44 rounded-full bg-cyan-200/50 blur-3xl animate-float" />
        <div className="absolute right-[10%] top-24 h-56 w-56 rounded-full bg-sky-200/55 blur-3xl animate-float-delayed" />
        <div className="absolute inset-0 bg-grid-slate [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.18))]" />
      </div>

      <Navbar />
      
      <main className="relative z-10 flex flex-1 items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <section className="relative overflow-hidden rounded-[36px] border border-white/70 bg-slate-950 p-7 text-white shadow-[0_35px_120px_-45px_rgba(15,23,42,0.95)] sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_35%)]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-sky-200 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Entry screen refreshed for a better first impression
              </div>

              <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {isLogin ? 'Welcome back to cleaner, faster calling.' : 'Create your account and start joining better rooms.'}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                {isLogin
                  ? 'Sign in to reach your dashboard, explore active rooms, and start conversations without getting lost in a heavy interface.'
                  : 'A short signup flow gets users from curiosity to live conversation with less friction and more confidence.'}
              </p>

              <div className="mt-8 grid gap-4">
                {trustPoints.map((point) => {
                  const Icon = point.icon;

                  return (
                    <div key={point.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-200">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-white">{point.title}</h2>
                          <p className="mt-2 text-sm leading-7 text-slate-300">{point.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                  alt="People collaborating in a modern workspace"
                  className="h-56 w-full object-cover"
                />
                <div className="p-5">
                  <div className="text-sm font-medium text-sky-200">What changed</div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    This screen now has clearer structure, more supporting content, and a more inviting tone before users enter the app.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[36px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_28px_90px_-50px_rgba(14,116,144,0.7)] backdrop-blur-xl sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
              <CheckCircle2 className="h-4 w-4" />
              {isLogin ? 'Sign in to continue' : 'New here? Create your profile'}
            </div>

            <div className="mt-5">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                {isLogin ? 'Access your account' : 'Create your account'}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {isLogin
                  ? 'Use your email and password to continue into dashboard and room discovery.'
                  : 'Set up a basic profile so you can create rooms, join conversations, and return later.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="h-12 rounded-2xl border-slate-200 bg-white"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-12 rounded-2xl border-slate-200 bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-12 rounded-2xl border-slate-200 bg-white pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="h-12 w-full rounded-2xl bg-slate-950 text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                disabled={isLoading}
              >
                {isLoading
                  ? 'Loading...'
                  : isLogin
                  ? 'Sign In'
                  : 'Create Account'}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
            
            <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-900">Why this flow is better</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex flex-col gap-4 rounded-[28px] border border-sky-100 bg-sky-50/80 p-5 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-medium text-slate-900">Demo credentials</div>
                <div className="mt-1">Email: john@example.com</div>
                <div>Password: password</div>
              </div>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="inline-flex items-center gap-2 font-medium text-sky-700 transition hover:text-sky-900"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Auth;
