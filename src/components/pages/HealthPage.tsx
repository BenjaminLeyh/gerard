import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Wind, Thermometer, Moon, Flame, Footprints, Clock, TrendingUp, Lightbulb, ChevronRight } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import ActivityRings from '@/components/ui/ActivityRings';
import { 
  healthMetrics, heartRateHistory, weeklyHeartRate, 
  sleepData, activityHistory, healthTips 
} from '@/data/mockData';

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

type TimeRange = '24h' | '7j' | '30j';

const HealthPage = () => {
  const [heartRateRange, setHeartRateRange] = useState<TimeRange>('24h');

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
        <h1 className="text-2xl font-bold text-foreground">Santé</h1>
        <p className="text-muted-foreground text-sm">Suivi complet de Luna</p>
      </motion.div>

      {/* Heart Rate Section */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-health-red/15 flex items-center justify-center">
              <Heart className="w-5 h-5 text-health-red" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Fréquence cardiaque</h3>
              <p className="text-sm text-muted-foreground">Dernière mesure</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-foreground">{healthMetrics.heartRate}</span>
            <span className="text-sm text-muted-foreground ml-1">BPM</span>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-4">
          {(['24h', '7j', '30j'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setHeartRateRange(range)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                heartRateRange === range
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={heartRateRange === '24h' ? heartRateHistory : weeklyHeartRate}>
              <defs>
                <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF3B30" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF3B30" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey={heartRateRange === '24h' ? 'time' : 'day'} 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
              <Area
                type="monotone"
                dataKey={heartRateRange === '24h' ? 'value' : 'avg'}
                stroke="#FF3B30"
                strokeWidth={2}
                fill="url(#heartRateGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Min</p>
            <p className="font-semibold text-foreground">{healthMetrics.heartRateMin} BPM</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Moyenne</p>
            <p className="font-semibold text-foreground">{healthMetrics.heartRate} BPM</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Max</p>
            <p className="font-semibold text-foreground">{healthMetrics.heartRateMax} BPM</p>
          </div>
        </div>
      </motion.div>

      {/* Vital Signs Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-6">
        <div className="ios-card">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-4 h-4 text-health-blue" />
            <span className="text-sm text-muted-foreground">Respiration</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{healthMetrics.respiratoryRate}</p>
          <p className="text-xs text-muted-foreground">resp/min</p>
        </div>
        <div className="ios-card">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-4 h-4 text-health-orange" />
            <span className="text-sm text-muted-foreground">Température</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{healthMetrics.temperature}°</p>
          <p className="text-xs text-muted-foreground">Normale</p>
        </div>
      </motion.div>

      {/* Sleep Section */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-health-purple/15 flex items-center justify-center">
            <Moon className="w-5 h-5 text-health-purple" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Sommeil</h3>
            <p className="text-sm text-muted-foreground">Cette nuit</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-foreground">{healthMetrics.sleepHours}</span>
            <span className="text-sm text-muted-foreground ml-1">h</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                    data={sleepData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    dataKey="hours"
                    stroke="none"
                >
                  {sleepData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color}/>
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {sleepData.map((phase) => (
              <div key={phase.phase} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.color }} />
                  <span className="text-sm text-muted-foreground">{phase.phase}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{phase.hours}h</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-health-green" />
            <span className="text-sm text-foreground font-medium">
              Qualité du sommeil : {healthMetrics.sleepQuality}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Activity Section */}
      <motion.div variants={itemVariants} className="ios-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Activité physique</h3>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-6 mb-6">
          <ActivityRings rings={activityRings} size={100} strokeWidth={8} />
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-health-red" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="font-semibold text-foreground">{healthMetrics.calories} / {healthMetrics.caloriesGoal} kcal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-health-green" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Temps actif</p>
                <p className="font-semibold text-foreground">{healthMetrics.activeMinutes} / {healthMetrics.activeMinutesGoal} min</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Footprints className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Pas</p>
                <p className="font-semibold text-foreground">{healthMetrics.steps.toLocaleString()} / {healthMetrics.stepsGoal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityHistory}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <Bar dataKey="steps" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Health Tips */}
      <motion.div variants={itemVariants}>
        <h3 className="font-semibold text-foreground mb-3">Conseils personnalisés</h3>
        <div className="space-y-3">
          {healthTips.map((tip) => (
            <div key={tip.id} className="ios-card flex items-start gap-3">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h4 className="font-medium text-foreground">{tip.title}</h4>
                <p className="text-sm text-muted-foreground">{tip.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HealthPage;
