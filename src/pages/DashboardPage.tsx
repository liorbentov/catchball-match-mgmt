import { Link } from 'react-router-dom';

const features = [
  {
    path: '/roster',
    icon: '👥',
    title: 'Roster',
    description: 'Manage your squad and game schedule per season.',
    color: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400',
    iconBg: 'bg-indigo-100',
  },
  {
    path: '/game-alignment',
    icon: '🏟️',
    title: 'Game Alignment',
    description: 'Set player positions on the catchball court for each game.',
    color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
    iconBg: 'bg-emerald-100',
  },
  {
    path: '/plan-moves',
    icon: '📋',
    title: 'Plan Moves',
    description: 'Create and visualize tactical plays for your team.',
    color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
    iconBg: 'bg-orange-100',
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          <span className="mr-2">🏐</span> CatchCoach
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Your catchball coaching command centre — manage your roster, plan alignments, and draw up plays.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {features.map((f) => (
          <Link
            key={f.path}
            to={f.path}
            className={`rounded-xl border-2 p-6 flex flex-col gap-4 transition-all shadow-sm hover:shadow-md ${f.color}`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${f.iconBg}`}>
              {f.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{f.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{f.description}</p>
            </div>
            <span className="text-sm font-medium text-indigo-600 mt-auto">
              Open →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
