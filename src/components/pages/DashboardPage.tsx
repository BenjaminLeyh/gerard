import { motion } from 'framer-motion';
import { Heart, Footprints, Moon, MapPin, Battery, Bell, ChevronRight } from 'lucide-react';
import PetAvatar from '@/components/ui/PetAvatar';
import StatusBadge from '@/components/ui/StatusBadge';
import MetricCard from '@/components/ui/MetricCard';
import AlertCard from '@/components/ui/AlertCard';
import ActivityRings from '@/components/ui/ActivityRings';
import { pet, healthMetrics, locationData, alerts, statusLabels } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const DashboardPage = () => {
  const activityRings = [
    { value: healthMetrics.calories, goal: healthMetrics.caloriesGoal, color: '#FF3B30', label: 'Calories' },
    { value: healthMetrics.activeMinutes, goal: healthMetrics.activeMinutesGoal, color: '#30D158', label: 'Activité' },
    { value: healthMetrics.steps, goal: healthMetrics.stepsGoal, color: '#0A84FF', label: 'Pas' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-4 pb-24 pt-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Bonjour 👋</p>
            <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
          </div>
          <button className="relative p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            {alerts.filter(a => !a.read).length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-health-red rounded-full" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Alerts */}
      {alerts.filter(a => !a.read).length > 0 && (
        <motion.div variants={itemVariants} className="mb-6 space-y-3">
          {alerts.filter(a => !a.read).map((alert) => (
            <AlertCard
              key={alert.id}
              severity={alert.severity}
              title={alert.title}
              message={alert.message}
              time={alert.time}
            />
          ))}
        </motion.div>
      )}

      {/* Pet Card */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <div className="flex items-center gap-4">
          <PetAvatar name={pet.name} imageUrl={pet.avatar} size="lg" showRing />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">{pet.name}</h2>
            <p className="text-sm text-muted-foreground">{pet.breed}</p>
            <div className="flex items-center gap-2 mt-2">
              <StatusBadge 
                status={pet.status === 'healthy' ? 'success' : pet.status === 'alert' ? 'danger' : 'info'} 
                label={statusLabels[pet.status]}
                pulse
              />
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Battery className="w-4 h-4" />
              <span>{pet.collarBattery}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Activity Rings */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-4">Activité du jour</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-health-red" />
                <span className="text-sm text-muted-foreground">Calories</span>
                <span className="text-sm font-medium ml-auto">{healthMetrics.calories}/{healthMetrics.caloriesGoal}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-health-green" />
                <span className="text-sm text-muted-foreground">Activité</span>
                <span className="text-sm font-medium ml-auto">{healthMetrics.activeMinutes}/{healthMetrics.activeMinutesGoal} min</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Pas</span>
                <span className="text-sm font-medium ml-auto">{healthMetrics.steps.toLocaleString()}/{healthMetrics.stepsGoal.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <ActivityRings rings={activityRings} size={130} strokeWidth={10} />
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-6">
        <MetricCard
          icon={Heart}
          iconColor="#FF3B30"
          label="Fréquence cardiaque"
          value={healthMetrics.heartRate}
          unit="BPM"
          subtitle={`${healthMetrics.heartRateMin}-${healthMetrics.heartRateMax} aujourd'hui`}
        />
        <MetricCard
          icon={Footprints}
          iconColor="#30D158"
          label="Distance"
          value={healthMetrics.distance}
          unit="km"
          subtitle="Parcourue aujourd'hui"
        />
        <MetricCard
          icon={Moon}
          iconColor="#5856D6"
          label="Sommeil"
          value={healthMetrics.sleepHours}
          unit="h"
          subtitle={`Qualité: ${healthMetrics.sleepQuality}%`}
        />
        <MetricCard
          icon={MapPin}
          iconColor="#0A84FF"
          label="Position"
          value="Maison"
          subtitle={locationData.lastUpdate}
        />
      </motion.div>

      {/* Location Card */}
      <motion.div variants={itemVariants} className="ios-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Localisation actuelle</h3>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="relative h-32 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          {/* Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-4 h-4 bg-primary rounded-full shadow-lg"
              style={{ boxShadow: '0 0 0 8px rgba(10, 132, 255, 0.2)' }}
            />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm text-foreground font-medium">{locationData.address}</p>
          <div className="flex items-center gap-1 mt-1">
            <StatusBadge 
              status={locationData.isInSafeZone ? 'success' : 'warning'} 
              label={locationData.isInSafeZone ? 'Dans la zone sécurisée' : 'Hors zone'} 
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
