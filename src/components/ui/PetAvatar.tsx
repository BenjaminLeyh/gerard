import { motion } from 'framer-motion';
import { Dog } from 'lucide-react';

interface PetAvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showRing?: boolean;
  ringColor?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
};

const iconSizes = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const PetAvatar = ({ 
  name, 
  imageUrl, 
  size = 'md', 
  showRing = false,
  ringColor = 'hsl(var(--primary))'
}: PetAvatarProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      {showRing && (
        <div 
          className={`absolute -inset-1 rounded-full opacity-50`}
          style={{ 
            background: `conic-gradient(from 0deg, ${ringColor}, transparent 70%)`,
            animation: 'spin 3s linear infinite'
          }}
        />
      )}
      <div 
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden relative`}
        style={showRing ? { border: `3px solid ${ringColor}` } : {}}
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Dog className={`${iconSizes[size]} text-muted-foreground`} />
        )}
      </div>
    </motion.div>
  );
};

export default PetAvatar;
