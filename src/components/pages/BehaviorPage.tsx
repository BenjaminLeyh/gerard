import { motion } from 'framer-motion';
import { Brain, Volume2, Zap, Calendar, TrendingUp, AlertCircle, Smile, Activity, Clock, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import StatusBadge from '@/components/ui/StatusBadge';
import { behaviorData, stressHistory, behaviorEvents, moodLabels, activityLabels } from '@/data/mockData';

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

const eventIcons: Record<string, string> = {
  activity: '🏃',
  bark: '🗣️',
  sleep: '😴',
  walk: '🚶',
  play: '🎾',
  meal: '🍖',
};

const BehaviorPage = () => {
  const stressPercentage = behaviorData.stressLevel;
  const moodEmoji = behaviorData.mood === 'happy' ? '😊' : 
                    behaviorData.mood === 'calm' ? '😌' : 
                    behaviorData.mood === 'anxious' ? '😟' : '🤩';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-4 pb-24 pt-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Comportement</h1>
        <p className="text-muted-foreground text-sm">Analyse émotionnelle de Luna</p>
      </motion.div>

      {/* Mood Card */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{moodEmoji}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Humeur actuelle</h3>
            <p className="text-2xl font-bold text-foreground">{moodLabels[behaviorData.mood]}</p>
            <div className="flex items-center gap-2 mt-2">
              <StatusBadge status="success" label={`Activité ${activityLabels[behaviorData.activityLevel].toLowerCase()}`} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stress Level */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-health-orange/15 flex items-center justify-center">
            <Zap className="w-5 h-5 text-health-orange" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Niveau de stress</h3>
            <p className="text-sm text-muted-foreground">Mesuré en temps réel</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-foreground">{stressPercentage}%</span>
          </div>
        </div>

        {/* Stress Gauge */}
        <div className="relative h-4 bg-secondary rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stressPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute h-full rounded-full"
            style={{
              background: stressPercentage < 30 
                ? 'hsl(var(--health-green))' 
                : stressPercentage < 60 
                  ? 'hsl(var(--health-orange))' 
                  : 'hsl(var(--health-red))',
            }}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground mb-4">
          <span>Calme</span>
          <span>Modéré</span>
          <span>Élevé</span>
        </div>

        {/* Stress History Chart */}
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stressHistory}>
              <defs>
                <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF9500" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF9500" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <YAxis hide domain={[0, 100]} />
              <Area
                type="monotone"
                dataKey="level"
                stroke="#FF9500"
                strokeWidth={2}
                fill="url(#stressGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Barking Detection */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Détection des aboiements</h3>
            <p className="text-sm text-muted-foreground">Dernières 24 heures</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-secondary/50">
            <p className="text-xs text-muted-foreground">Fréquence</p>
            <p className="text-xl font-bold text-foreground">{behaviorData.barkingFrequency}</p>
            <p className="text-xs text-muted-foreground">aboiements</p>
          </div>
          <div className="p-3 rounded-xl bg-secondary/50">
            <p className="text-xs text-muted-foreground">Dernier</p>
            <p className="text-xl font-bold text-foreground">{behaviorData.lastBarkTime}</p>
            <p className="text-xs text-muted-foreground">enregistré</p>
          </div>
        </div>
      </motion.div>

      {/* Behavior Insights */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 text-health-purple" />
            <h3 className="font-semibold text-foreground">Insights comportementaux</h3>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-health-green/10">
            <TrendingUp className="w-5 h-5 text-health-green mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Tendance positive</p>
              <p className="text-xs text-muted-foreground">Le niveau de stress a diminué de 20% cette semaine</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 rounded-xl bg-primary/10">
            <Activity className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Activité régulière</p>
              <p className="text-xs text-muted-foreground">Luna maintient un bon niveau d'activité quotidienne</p>
            </div>
          </div>

          {behaviorData.unusualBehavior && (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-health-orange/10">
              <AlertCircle className="w-5 h-5 text-health-orange mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Comportement inhabituel détecté</p>
                <p className="text-xs text-muted-foreground">Une consultation vétérinaire est recommandée</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Behavior Journal */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Journal du jour</h3>
        </div>
        
        <div className="ios-card">
          <div className="space-y-0">
            {behaviorEvents.map((event, index) => (
              <div 
                key={index}
                className={`flex items-center gap-4 py-3 ${
                  index !== behaviorEvents.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-[70px]">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{event.time}</span>
                </div>
                <span className="text-xl">{eventIcons[event.type] || '📝'}</span>
                <span className="text-sm font-medium text-foreground">{event.event}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BehaviorPage;
