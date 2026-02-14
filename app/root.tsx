import { Outlet } from 'react-router';
import './app.css';

export default function Root() {
  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 text-white p-6 border-b border-gray-700">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Team Roster</h1>
          <p className="text-gray-400 mt-1">Display players using components and props</p>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}