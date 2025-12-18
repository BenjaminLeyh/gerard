import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Plus, Edit2, Shield, Clock, ChevronRight, Home, Trees, Stethoscope, Locate } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { locationData, safeZones, locationHistory, pet } from '@/data/mockData';
import {useTheme} from "@/ThemeContext.tsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const zoneIcons: Record<string, typeof Home> = {
  'Maison': Home,
  'Parc du quartier': Trees,
  'Vétérinaire': Stethoscope,
};

const MapPage = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-4 pb-24 pt-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Localisation</h1>
        <p className="text-muted-foreground text-sm">Suivez {pet.name} en temps réel</p>
      </motion.div>

      {/* Map View */}
      {/* Map View */}
      <motion.div variants={itemVariants} className="ios-card mb-6 p-0 overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          {/* Background Map Image */}
          <div className="absolute inset-0">
            <img
                src="/gerard/map-background.jpg"
                alt="Map"
                className={`w-full h-full object-cover transition-all duration-300 ${
                    isDark ? 'brightness-[0.4] contrast-110 saturate-75' : 'brightness-100'
                }`}
            />

            {/* Overlay for better contrast */}
            <div className={`absolute inset-0 ${
                isDark ? 'bg-black/30' : 'bg-white/10'
            }`} />
          </div>

          {/* Safe Zone Circle */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100"
               preserveAspectRatio="xMidYMid slice">
            {/* Safe Zone - Cercle parfait */}
            <circle
                cx="50"
                cy="50"
                r="20"
                fill="hsl(var(--health-green))"
                fillOpacity="0.12"
                stroke="hsl(var(--health-green))"
                strokeWidth="0.5"
                strokeDasharray="2,2"
            />

            {/* Path trace - Suit exactement les points */}
            <path
                d="M 41 75 Q 44 70 47 65 Q 50.5 59.5 54 54 L 50 50"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.8"
            />

            {/* Points de passage sur le chemin */}
            <circle cx="41" cy="75" r="1.2" fill="hsl(var(--primary))" opacity="0.9"/>
            <circle cx="47" cy="65" r="1.2" fill="hsl(var(--primary))" opacity="0.8"/>
            <circle cx="54" cy="54" r="1.2" fill="hsl(var(--primary))" opacity="0.7"/>
            <circle cx="50" cy="50" r="1.5" fill="hsl(var(--primary))" opacity="1"/>
          </svg>


          {/* Pet Location Pin avec pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut'
                }}
                className="relative"
            >
              <div
                  className="absolute -inset-4 rounded-full opacity-30"
                  style={{
                    background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
                  }}
              />
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-4 h-4 text-primary-foreground"/>
              </div>
            </motion.div>
          </div>
          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
                className="w-10 h-10 bg-card/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg hover:bg-card transition-colors border border-border/50">
              <Locate className="w-5 h-5 text-primary"/>
            </button>
            <button
                className="w-10 h-10 bg-card/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg hover:bg-card transition-colors border border-border/50">
              <Navigation className="w-5 h-5 text-foreground"/>
            </button>
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-4 left-4">
            <StatusBadge
                status={locationData.isInSafeZone ? 'success' : 'warning'}
                label={locationData.isInSafeZone ? 'Zone sécurisée' : 'Hors zone'}
                pulse
            />
          </div>
        </div>

        {/* Location Details */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Position actuelle</h3>
              <p className="text-sm text-muted-foreground mt-1">{locationData.address}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Mise à jour</p>
              <p className="text-sm font-medium text-foreground">{locationData.lastUpdate}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Find My Pet */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <button className="w-full flex items-center gap-4 py-2">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <Navigation className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-semibold text-foreground">Trouver {pet.name}</h3>
            <p className="text-sm text-muted-foreground">Obtenir l'itinéraire vers sa position</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </motion.div>

      {/* Safe Zones */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-health-green" />
            <h3 className="font-semibold text-foreground">Zones sécurisées</h3>
          </div>
          <button className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/80 transition-colors">
            <Plus className="w-4 h-4 text-foreground" />
          </button>
        </div>

        <div className="space-y-3">
          {safeZones.map((zone) => {
            const ZoneIcon = zoneIcons[zone.name] || MapPin;
            return (
              <motion.div
                key={zone.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                className={`ios-card cursor-pointer transition-all ${
                  selectedZone === zone.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    zone.active ? 'bg-health-green/15' : 'bg-secondary'
                  }`}>
                    <ZoneIcon className={`w-5 h-5 ${zone.active ? 'text-health-green' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{zone.name}</h4>
                    <p className="text-sm text-muted-foreground">Rayon: {zone.radius}m</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${zone.active ? 'bg-health-green' : 'bg-muted-foreground'}`} />
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Location History */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Historique des déplacements</h3>
        </div>

        <div className="ios-card">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
            
            <div className="space-y-0">
              {locationHistory.map((point, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center gap-4 py-3 ${
                    index !== locationHistory.length - 1 ? '' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-10 flex items-center justify-center`}>
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`} />
                  </div>
                  
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{point.time}</span>
                    <span className="text-xs text-muted-foreground">
                      {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MapPage;
