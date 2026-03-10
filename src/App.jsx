import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EarlyAccess from './pages/EarlyAccess';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';

function App() {
<<<<<<< HEAD
  // load session once on mount
  useEffect(() => {
    useAuthStore.getState().loadSession();
  }, []);
=======
<<<<<<< HEAD
  const setUser = useStore((s) => s.setUser);

  useEffect(() => {
    let mounted = true;

    // Hydrate initial session.
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data.session ? { session: data.session } : null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session ? { session } : null);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [setUser]);
=======
  // load session once on mount
  useEffect(() => {
    useAuthStore.getState().loadSession();
  }, []);
>>>>>>> 5a556e1 (Describe what you changed)
>>>>>>> 29214ca (update)

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
