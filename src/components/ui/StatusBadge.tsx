import { motion } from 'framer-motion';

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'danger' | 'info';
  label: string;
  pulse?: boolean;
}

const statusStyles = {
  success: 'bg-health-green/15 text-health-green',
  warning: 'bg-health-orange/15 text-health-orange',
  danger: 'bg-health-red/15 text-health-red',
  info: 'bg-primary/15 text-primary',
};

const StatusBadge = ({ status, label, pulse = false }: StatusBadgeProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusStyles[status]}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            status === 'success' ? 'bg-health-green' : 
            status === 'warning' ? 'bg-health-orange' : 
            status === 'danger' ? 'bg-health-red' : 'bg-primary'
          }`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${
            status === 'success' ? 'bg-health-green' : 
            status === 'warning' ? 'bg-health-orange' : 
            status === 'danger' ? 'bg-health-red' : 'bg-primary'
          }`} />
        </span>
      )}
      {label}
    </motion.span>
  );
};

export default StatusBadge;
