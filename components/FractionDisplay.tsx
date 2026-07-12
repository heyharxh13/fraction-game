/**
 * FractionDisplay Component
 * Shows the target fraction and current fraction in mathematical notation
 */

import { motion } from 'framer-motion';

interface FractionDisplayProps {
  targetNumerator: number;
  targetDenominator: number;
  currentNumerator: number;
  currentDenominator: number;
  isCorrect: boolean;
}

export default function FractionDisplay({
  targetNumerator,
  targetDenominator,
  currentNumerator,
  currentDenominator,
  isCorrect,
}: FractionDisplayProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Current Fraction */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Your Fraction
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md border border-border">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-primary">
                {currentNumerator}
              </span>
              <div className="w-12 h-1 bg-primary my-2"></div>
              <span className="text-4xl font-bold text-primary">
                {currentDenominator}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Target Fraction */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Target Fraction
        </p>
        <div className="flex justify-center items-center gap-4">
          <motion.div
            className="bg-gradient-to-br from-accent to-yellow-300 rounded-lg p-4 shadow-lg border-2 border-accent"
            animate={isCorrect ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-accent-foreground">
                {targetNumerator}
              </span>
              <div className="w-12 h-1 bg-accent-foreground my-2"></div>
              <span className="text-4xl font-bold text-accent-foreground">
                {targetDenominator}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
