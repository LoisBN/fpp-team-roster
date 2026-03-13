import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import './app.css';

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-gray-900">
        <nav className="bg-gray-800 text-white p-6 border-b border-gray-700">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">Team Roster</h1>
            <p className="text-gray-400 mt-1">Display players using components and props</p>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto p-6">
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
