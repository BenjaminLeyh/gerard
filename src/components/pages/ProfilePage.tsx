import { motion } from 'framer-motion';
import { 
  ChevronRight, Bell, Moon, Sun, Bluetooth, Battery, 
  FileText, HelpCircle, Info, Shield, Scale, Syringe,
  Settings, LogOut, Smartphone, Share2
} from 'lucide-react';
import PetAvatar from '@/components/ui/PetAvatar';
import StatusBadge from '@/components/ui/StatusBadge';
import { pet } from '@/data/mockData';
import { Switch } from '@/components/ui/switch';
import {useTheme} from "@/ThemeContext.tsx";
import {useState} from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface SettingItemProps {
  icon: typeof Bell;
  iconColor?: string;
  label: string;
  value?: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  destructive?: boolean;
}

const SettingItem = ({ 
  icon: Icon, 
  iconColor = 'text-foreground',
  label, 
  value, 
  hasToggle,
  toggleValue,
  onToggle,
  onClick,
  destructive
}: SettingItemProps) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={hasToggle ? undefined : onClick}
    className="w-full flex items-center gap-4 py-3"
  >
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
      destructive ? 'bg-health-red/15' : 'bg-secondary'
    }`}>
      <Icon className={`w-4 h-4 ${destructive ? 'text-health-red' : iconColor}`} />
    </div>
    <span className={`flex-1 text-left font-medium ${destructive ? 'text-health-red' : 'text-foreground'}`}>
      {label}
    </span>
    {hasToggle ? (
      <Switch checked={toggleValue} onCheckedChange={onToggle} />
    ) : value ? (
      <span className="text-sm text-muted-foreground">{value}</span>
    ) : (
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    )}
  </motion.button>
);

const ProfilePage = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-4 pb-24 pt-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Profil</h1>
        <p className="text-muted-foreground text-sm">Paramètres et informations</p>
      </motion.div>

      {/* Pet Profile Card */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <div className="flex items-center gap-4">
          <PetAvatar name={pet.name} imageUrl={pet.avatar} size="xl" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">{pet.name}</h2>
            <p className="text-muted-foreground">{pet.breed}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">
                {pet.age} ans
              </span>
              <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">
                {pet.weight} kg
              </span>
            </div>
          </div>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </motion.div>

      {/* Medical Info */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <h3 className="font-semibold text-foreground mb-4">Informations médicales</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Syringe className="w-5 h-5 text-health-purple" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Vaccins</p>
              <p className="font-medium text-foreground">À jour</p>
            </div>
            <StatusBadge status="success" label="Vérifié" />
          </div>
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Poids idéal</p>
              <p className="font-medium text-foreground">26-30 kg</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-health-green" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Allergies</p>
              <p className="font-medium text-foreground">Aucune connue</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Collar Settings */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <h3 className="font-semibold text-foreground mb-4">Collier connecté</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-health-green/15 flex items-center justify-center">
              <Bluetooth className="w-4 h-4 text-health-green" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Connecté</p>
              <p className="text-xs text-muted-foreground">PetCollar Pro v2.1</p>
            </div>
            <StatusBadge status="success" label="En ligne" pulse />
          </div>
          
          <div className="flex items-center gap-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Battery className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Batterie</p>
              <p className="text-xs text-muted-foreground">Charge depuis la laisse disponible</p>
            </div>
            <span className="text-sm font-semibold text-foreground">{pet.collarBattery}%</span>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-secondary/50">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: pet.collarColor }}
              />
              <span className="text-sm text-foreground">Couleur du collier</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* App Settings */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <h3 className="font-semibold text-foreground mb-2">Paramètres</h3>
        <div className="divide-y divide-border">
          <SettingItem
            icon={Bell}
            iconColor="text-health-red"
            label="Notifications"
            hasToggle
            toggleValue={notifications}
            onToggle={() => setNotifications(!notifications)}
          />
          <SettingItem
              icon={theme === 'dark' ? Moon : Sun}
              iconColor="text-health-purple"
              label="Mode sombre"
              hasToggle
              toggleValue={theme === 'dark'}
              onToggle={toggleTheme}
          />
          <SettingItem
            icon={Settings}
            iconColor="text-muted-foreground"
            label="Unités"
            value="Métrique"
          />
          <SettingItem
            icon={Smartphone}
            iconColor="text-primary"
            label="Widget iOS"
            value="Activé"
          />
        </div>
      </motion.div>

      {/* Export & Support */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <h3 className="font-semibold text-foreground mb-2">Données & Support</h3>
        <div className="divide-y divide-border">
          <SettingItem
            icon={FileText}
            iconColor="text-health-green"
            label="Exporter rapport santé"
            value="PDF"
          />
          <SettingItem
            icon={Share2}
            iconColor="text-primary"
            label="Partager avec vétérinaire"
          />
          <SettingItem
            icon={HelpCircle}
            iconColor="text-health-orange"
            label="Aide et FAQ"
          />
          <SettingItem
            icon={Info}
            iconColor="text-muted-foreground"
            label="À propos"
            value="v2.1.0"
          />
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div variants={itemVariants} className="ios-card">
        <SettingItem
          icon={LogOut}
          label="Déconnexion"
          destructive
        />
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
