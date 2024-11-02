import { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { io } from 'socket.io-client';
import 'xterm/css/xterm.css';

interface TerminalTabsProps {
  terminals: string[];
  onClose: (containerId: string) => void;
}

export function TerminalTabs({ terminals, onClose }: TerminalTabsProps) {
  const terminalRefs = useRef<{ [key: string]: Terminal }>({});
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const socket = io('http://localhost:3001');

  useEffect(() => {
    if (terminals.length > 0 && !activeTab) {
      setActiveTab(terminals[0]);
    }
  }, [terminals]);

  useEffect(() => {
    terminals.forEach((containerId) => {
      if (!terminalRefs.current[containerId]) {
        const term = new Terminal({
          cursorBlink: true,
          theme: {
            background: '#1e1e1e'
          }
        });
        
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        
        const element = document.getElementById(`terminal-${containerId}`);
        if (element) {
          term.open(element);
          fitAddon.fit();
          
          socket.emit('attach-container', containerId);
          
          socket.on(`terminal-output-${containerId}`, (data) => {
            term.write(data);
          });
          
          term.onData((data) => {
            socket.emit('terminal-input', { containerId, data });
          });
        }
        
        terminalRefs.current[containerId] = term;
      }
    });

    return () => {
      Object.entries(terminalRefs.current).forEach(([containerId, term]) => {
        if (!terminals.includes(containerId)) {
          term.dispose();
          delete terminalRefs.current[containerId];
        }
      });
    };
  }, [terminals]);

  const handleSendMessage = () => {
    if (activeTab && message.trim()) {
      const term = terminalRefs.current[activeTab];
      if (term) {
        socket.emit('terminal-input', { 
          containerId: activeTab, 
          data: `${message}\n` 
        });
        setMessage('');
      }
    }
  };

  if (terminals.length === 0) return null;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {terminals.map((containerId) => (
            <div key={containerId} className="relative">
              <a 
                className={`py-4 px-6 text-sm font-medium whitespace-nowrap cursor-pointer
                  ${activeTab === containerId 
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                onClick={() => setActiveTab(containerId)}
              >
                Terminal: {containerId.slice(0, 12)}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose(containerId);
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </a>
            </div>
          ))}
        </nav>
      </div>
      <div className="p-4">
        {terminals.map((containerId) => (
          <div
            key={containerId}
            id={`terminal-${containerId}`}
            className={`h-96 ${activeTab === containerId ? 'block' : 'hidden'}`}
          />
        ))}
        <div className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your command..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}