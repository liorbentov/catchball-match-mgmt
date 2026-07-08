import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 py-3 text-center text-xs text-gray-400">
        CatchCoach &copy; {new Date().getFullYear()} — Catchball Match Management
      </footer>
    </div>
  );
}
