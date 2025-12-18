import { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
}

const MobileContainer = ({ children }: MobileContainerProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto min-h-screen relative">
        {children}
      </div>
    </div>
  );
};

export default MobileContainer;
