import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { WelcomePage } from './pages/WelcomePage';
import { TerminalsPage } from './pages/TerminalsPage';
import { Container } from './types';
import { io } from 'socket.io-client';
import { config } from '../server/config.js';

function App() {
  const [socket, setSocket] = useState(null);
  const [containers, setContainers] = useState<Container[]>([]);
  const [activeTerminals, setActiveTerminals] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<'welcome' | 'terminals'>('welcome');
  const [serverPort, setServerPort] = useState(config.defaultServerPort);

  useEffect(() => {
    // Try to connect to the default port first
    const connectToServer = async (port) => {
      const newSocket = io(`http://localhost:${port}`);
      
      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        // If connection fails, try the next port
        newSocket.close();
        connectToServer(port + 1);
      });

      newSocket.on('connect', () => {
        console.log('Connected to server on port:', port);
        setSocket(newSocket);
        setServerPort(port);
      });

      newSocket.on('containers', (containerList: Container[]) => {
        setContainers(containerList);
      });
    };

    connectToServer(config.defaultServerPort);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('list-containers');
    }
  }, [socket]);

  const handleContainerClick = (containerId: string) => {
    if (!activeTerminals.includes(containerId)) {
      setActiveTerminals([...activeTerminals, containerId]);
    }
  };

  const handleCloseTerminal = (containerId: string) => {
    setActiveTerminals(activeTerminals.filter(id => id !== containerId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        serverPort={serverPort}
      />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentPage === 'welcome' ? (
          <WelcomePage onGetStarted={() => setCurrentPage('terminals')} />
        ) : (
          <TerminalsPage
            containers={containers}
            activeTerminals={activeTerminals}
            onContainerClick={handleContainerClick}
            onCloseTerminal={handleCloseTerminal}
            socket={socket}
          />
        )}
      </main>
    </div>
  );
}