interface WelcomePageProps {
  onGetStarted: () => void;
}

export function WelcomePage({ onGetStarted }: WelcomePageProps) {
  return (
    <div className="text-center">
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Welcome to Docker Web Terminal
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Access and manage your Docker containers through an intuitive web interface.
        Connect to running containers and interact with them in real-time.
      </p>
      <div className="mt-10">
        <button
          onClick={onGetStarted}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get Started
        </button>
      </div>

      {/* Example Features */}
      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Interactive Terminal</h3>
                <p className="mt-5 text-base text-gray-500">
                  Access your containers through a full-featured web terminal interface
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Container Management</h3>
                <p className="mt-5 text-base text-gray-500">
                  View and manage all your running containers in one place
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Real-time Connection</h3>
                <p className="mt-5 text-base text-gray-500">
                  Connect to your containers in real-time with instant feedback
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}