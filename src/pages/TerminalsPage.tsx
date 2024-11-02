import { ContainerList } from '../components/ContainerList';
import { TerminalTabs } from '../components/TerminalTabs';
import { Container } from '../types';

interface TerminalsPageProps {
  containers: Container[];
  activeTerminals: string[];
  onContainerClick: (containerId: string) => void;
  onCloseTerminal: (containerId: string) => void;
}

export function TerminalsPage({
  containers,
  activeTerminals,
  onContainerClick,
  onCloseTerminal,
}: TerminalsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <ContainerList 
        containers={containers} 
        onContainerClick={onContainerClick} 
      />
      <TerminalTabs 
        terminals={activeTerminals} 
        onClose={onCloseTerminal}
      />
    </div>
  );
}