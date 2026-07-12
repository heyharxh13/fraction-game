/**
 * FractionCircle Component
 * Renders an interactive circle divided into equal slices
 * with animated shading transitions
 */

import { motion } from 'framer-motion';

interface FractionCircleProps {
  totalPieces: number;
  shadedPieces: number;
}

export default function FractionCircle({
  totalPieces,
  shadedPieces,
}: FractionCircleProps) {
  const slices = Array.from({ length: totalPieces }, (_, i) => i);
  const anglePerSlice = 360 / totalPieces;

  // Color palette for shaded pieces
  const shadeColor = '#3b82f6'; // Primary blue
  const unshadeColor = '#e2e8f0'; // Muted light gray

  return (
    <div className="flex justify-center items-center">
      <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-lg">
        {/* Background circle */}
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="white"
          stroke="#cbd5e1"
          strokeWidth="2"
        />

        {/* Slices */}
        {slices.map((index) => {
          const isShaded = index < shadedPieces;
          const startAngle = (anglePerSlice * index - 90) * (Math.PI / 180);
          const endAngle = (anglePerSlice * (index + 1) - 90) * (Math.PI / 180);

          const radius = 140;
          const x1 = 150 + radius * Math.cos(startAngle);
          const y1 = 150 + radius * Math.sin(startAngle);
          const x2 = 150 + radius * Math.cos(endAngle);
          const y2 = 150 + radius * Math.sin(endAngle);

          const largeArc = anglePerSlice > 180 ? 1 : 0;

          const pathData = [
            `M 150 150`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
            'Z',
          ].join(' ');

          return (
            <motion.path
              key={index}
              d={pathData}
              fill={isShaded ? shadeColor : unshadeColor}
              stroke="#cbd5e1"
              strokeWidth="2"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: isShaded ? 1 : 0.6 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              style={{ filter: isShaded ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none' }}
            />
          );
        })}

        {/* Center circle for visual appeal */}
        <circle
          cx="150"
          cy="150"
          r="30"
          fill="white"
          stroke="#3b82f6"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
