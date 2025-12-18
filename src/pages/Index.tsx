import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MobileContainer from '@/components/layout/MobileContainer';
import TabBar from '@/components/layout/TabBar';
import DashboardPage from '@/components/pages/DashboardPage';
import HealthPage from '@/components/pages/HealthPage';
import BehaviorPage from '@/components/pages/BehaviorPage';
import MapPage from '@/components/pages/MapPage';
import ProfilePage from '@/components/pages/ProfilePage';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'health':
        return <HealthPage />;
      case 'behavior':
        return <BehaviorPage />;
      case 'map':
        return <MapPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <MobileContainer>
      <div className="min-h-screen pb-20 overflow-y-auto no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </MobileContainer>
  );
};

export default Index;
