import { Home, Heart, Brain, MapPin, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', icon: Home, label: 'Accueil' },
  { id: 'health', icon: Heart, label: 'Santé' },
  { id: 'behavior', icon: Brain, label: 'Comportement' },
  { id: 'map', icon: MapPin, label: 'Carte' },
  { id: 'profile', icon: User, label: 'Profil' },
];

const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  return (
    <nav className="tab-bar z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center py-1 px-3 min-w-[64px] transition-colors"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.95,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="relative"
              >
                <Icon 
                  className={`w-6 h-6 transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
              <span className={`text-[10px] mt-1 font-medium transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default TabBar;
