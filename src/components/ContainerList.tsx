import { Container } from '../types';

interface ContainerListProps {
  containers: Container[];
  onContainerClick: (containerId: string) => void;
}

export function ContainerList({ containers, onContainerClick }: ContainerListProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Running Containers</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {containers.map((container) => (
            <div
              key={container.id}
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 cursor-pointer"
              onClick={() => onContainerClick(container.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {container.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{container.id}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Running
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}