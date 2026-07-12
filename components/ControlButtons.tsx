/**
 * ControlButtons Component
 * Provides game control buttons with accessibility features
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ControlButtonsProps {
  onAddPiece: () => void;
  onRemovePiece: () => void;
  onNextLevel: () => void;
  onReset: () => void;
  canAddPiece: boolean;
  canRemovePiece: boolean;
  isCorrect: boolean;
  totalPieces: number;
  shadedPieces: number;
}

export default function ControlButtons({
  onAddPiece,
  onRemovePiece,
  onNextLevel,
  onReset,
  canAddPiece,
  canRemovePiece,
  isCorrect,
  totalPieces,
  shadedPieces,
}: ControlButtonsProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {/* Main Control Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: canAddPiece ? 1.05 : 1 }}
          whileTap={{ scale: canAddPiece ? 0.95 : 1 }}
        >
          <Button
            onClick={onAddPiece}
            disabled={!canAddPiece}
            className="w-full bg-primary hover:bg-blue-600 text-primary-foreground font-semibold py-6 text-lg rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Add piece. Currently ${shadedPieces} out of ${totalPieces} pieces shaded.`}
          >
            <span className="text-2xl mr-2">➕</span>
            Add Piece
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: canRemovePiece ? 1.05 : 1 }}
          whileTap={{ scale: canRemovePiece ? 0.95 : 1 }}
        >
          <Button
            onClick={onRemovePiece}
            disabled={!canRemovePiece}
            className="w-full bg-secondary hover:bg-pink-600 text-secondary-foreground font-semibold py-6 text-lg rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Remove piece"
          >
            <span className="text-2xl mr-2">➖</span>
            Remove
          </Button>
        </motion.div>
      </div>

      {/* Next Level Button - appears when correct */}
      {isCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Button
            onClick={onNextLevel}
            className="w-full bg-accent hover:bg-yellow-400 text-accent-foreground font-bold py-6 text-lg rounded-lg shadow-lg transition-all"
            aria-label="Go to next level"
          >
            <span className="text-2xl mr-2">🎉</span>
            Next Level
          </Button>
        </motion.div>
      )}

      {/* Reset Button */}
      <Button
        onClick={onReset}
        variant="outline"
        className="w-full font-semibold py-6 text-lg rounded-lg border-2 border-muted-foreground hover:bg-muted transition-all"
        aria-label="Reset the game"
      >
        <span className="text-2xl mr-2">🔄</span>
        Reset Game
      </Button>
    </div>
  );
}
