interface NavigationProps {
  currentPage: 'welcome' | 'terminals';
  onNavigate: (page: 'welcome' | 'terminals') => void;
  serverPort: number;
}

export function Navigation({ currentPage, onNavigate, serverPort }: NavigationProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900">Docker Web Terminal</h1>
            <span className="ml-4 text-sm text-gray-500">Server Port: {serverPort}</span>
          </div>
          <nav className="flex space-x-8">
            <button
              onClick={() => onNavigate('welcome')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === 'welcome'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('terminals')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === 'terminals'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              Terminals
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}