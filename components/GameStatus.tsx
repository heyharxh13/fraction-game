/**
 * GameStatus Component
 * Displays game feedback, score, and level information
 */

import { motion, AnimatePresence } from 'framer-motion';

interface GameStatusProps {
  message: string;
  isCorrect: boolean;
  score: number;
  level: number;
}

export default function GameStatus({
  message,
  isCorrect,
  score,
  level,
}: GameStatusProps) {
  return (
    <div className="space-y-6">
      {/* Score and Level Display */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-4 border border-blue-200"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
            Score
          </p>
          <p className="text-3xl font-bold text-primary">{score}</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg p-4 border border-pink-200"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
            Level
          </p>
          <p className="text-3xl font-bold text-secondary">{level}</p>
        </motion.div>
      </div>

      {/* Feedback Message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className={`p-4 rounded-lg font-bold text-center text-lg ${
            isCorrect
              ? 'bg-green-100 text-green-800 border-2 border-green-400 shadow-lg'
              : 'bg-amber-100 text-amber-800 border-2 border-amber-400'
          }`}
        >
          {isCorrect && <span className="text-2xl mr-2">✨</span>}
          {message}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
