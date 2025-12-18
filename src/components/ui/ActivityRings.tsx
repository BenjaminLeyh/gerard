import { motion } from 'framer-motion';

interface RingData {
  value: number;
  goal: number;
  color: string;
  label: string;
}

interface ActivityRingsProps {
  rings: RingData[];
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const ActivityRings = ({ rings, size = 120, strokeWidth = 12, className = '' }: ActivityRingsProps) => {
  const center = size / 2;
  const baseRadius = (size - strokeWidth * 2) / 2;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {rings.map((ring, index) => {
          const radius = baseRadius - index * (strokeWidth + 4);
          const circumference = 2 * Math.PI * radius;
          const progress = Math.min(ring.value / ring.goal, 1);
          const offset = circumference * (1 - progress);

          return (
            <g key={ring.label}>
              {/* Background ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-muted/30"
              />
              {/* Progress ring */}
              <motion.circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={ring.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: index * 0.2 }}
                style={{ filter: `drop-shadow(0 0 6px ${ring.color}40)` }}
              />
            </g>
          );
        })}
      </svg>
      
    </div>
  );
};

export default ActivityRings;
