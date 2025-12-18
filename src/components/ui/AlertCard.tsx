import { motion } from 'framer-motion';
import { AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

interface AlertCardProps {
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  time: string;
  onDismiss?: () => void;
}

const severityConfig = {
  info: {
    icon: Info,
    bgClass: 'bg-primary/10',
    borderClass: 'border-primary/20',
    iconColor: 'text-primary',
  },
  warning: {
    icon: AlertTriangle,
    bgClass: 'bg-health-orange/10',
    borderClass: 'border-health-orange/20',
    iconColor: 'text-health-orange',
  },
  critical: {
    icon: AlertCircle,
    bgClass: 'bg-health-red/10',
    borderClass: 'border-health-red/20',
    iconColor: 'text-health-red',
  },
};

const AlertCard = ({ severity, title, message, time, onDismiss }: AlertCardProps) => {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`rounded-2xl p-4 ${config.bgClass} border ${config.borderClass}`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${config.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-foreground">{title}</h4>
            {onDismiss && (
              <button 
                onClick={onDismiss}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{message}</p>
          <p className="text-xs text-muted-foreground/70 mt-2">{time}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AlertCard;
