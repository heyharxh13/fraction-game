'use client';

/**
 * Fraction Learning Game
 * An interactive educational game to help kids learn fractions
 */

import { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import FractionCircle from '@/components/FractionCircle';
import FractionDisplay from '@/components/FractionDisplay';
import ControlButtons from '@/components/ControlButtons';
import GameStatus from '@/components/GameStatus';
import {
  generateTargetFraction,
  checkFraction,
  getFeedbackMessage,
} from '@/lib/gameLogic';

const TOTAL_PIECES = 8;
const SUCCESS_SOUND_URL = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBg==';

export default function Home() {
  const [shadedPieces, setShadedPieces] = useState(0);
  const [targetNumerator, setTargetNumerator] = useState(1);
  const [targetDenominator] = useState(TOTAL_PIECES);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState('Start by shading pieces to match the target!');
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize first level
  useEffect(() => {
    initializeLevel();
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        handleAddPiece();
      } else if (e.key === '-' || e.key === '_') {
        handleRemovePiece();
      } else if (e.key === 'n' || e.key === 'N') {
        if (isCorrect) {
          handleNextLevel();
        }
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isCorrect, shadedPieces, targetNumerator]);

  // Check fraction whenever shaded pieces change
  useEffect(() => {
    const correct = checkFraction(
      shadedPieces,
      TOTAL_PIECES,
      targetNumerator,
      targetDenominator
    );
    setIsCorrect(correct);

    const feedbackMessage = getFeedbackMessage(
      shadedPieces,
      TOTAL_PIECES,
      targetNumerator,
      targetDenominator
    );
    setMessage(feedbackMessage);

    if (correct) {
      playSuccessSound();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [shadedPieces, targetNumerator, targetDenominator]);

  function initializeLevel() {
    setShadedPieces(0);
    const { numerator } = generateTargetFraction(TOTAL_PIECES);
    setTargetNumerator(numerator);
    setMessage('Start by shading pieces to match the target!');
    setIsCorrect(false);
  }

  function handleAddPiece() {
    if (shadedPieces < TOTAL_PIECES) {
      setShadedPieces(shadedPieces + 1);
    }
  }

  function handleRemovePiece() {
    if (shadedPieces > 0) {
      setShadedPieces(shadedPieces - 1);
    }
  }

  function handleNextLevel() {
    setLevel(level + 1);
    setScore(score + 10);
    initializeLevel();
  }

  function handleReset() {
    setLevel(1);
    setScore(0);
    initializeLevel();
  }

  function playSuccessSound() {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Sound play failed, continue gracefully
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      {/* Confetti animation */}
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 0}
          height={typeof window !== 'undefined' ? window.innerHeight : 0}
          gravity={0.3}
          numberOfPieces={200}
        />
      )}

      {/* Hidden audio element for success sound */}
      <audio ref={audioRef} src={SUCCESS_SOUND_URL} />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            🎓 Fraction Master
          </motion.h1>
          <p className="text-lg text-muted-foreground font-medium">
            Learn fractions by shading circle pieces
          </p>
        </div>

        {/* Main Game Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 space-y-8">
          {/* Game Status */}
          <GameStatus
            message={message}
            isCorrect={isCorrect}
            score={score}
            level={level}
          />

          {/* Fraction Circle */}
          <motion.div
            key={`level-${level}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FractionCircle
              totalPieces={TOTAL_PIECES}
              shadedPieces={shadedPieces}
            />
          </motion.div>

          {/* Fraction Display */}
          <FractionDisplay
            targetNumerator={targetNumerator}
            targetDenominator={targetDenominator}
            currentNumerator={shadedPieces}
            currentDenominator={TOTAL_PIECES}
            isCorrect={isCorrect}
          />

          {/* Control Buttons */}
          <ControlButtons
            onAddPiece={handleAddPiece}
            onRemovePiece={handleRemovePiece}
            onNextLevel={handleNextLevel}
            onReset={handleReset}
            canAddPiece={shadedPieces < TOTAL_PIECES}
            canRemovePiece={shadedPieces > 0}
            isCorrect={isCorrect}
            totalPieces={TOTAL_PIECES}
            shadedPieces={shadedPieces}
          />

          {/* Keyboard Hints */}
          <motion.div
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="font-medium">⌨️ Keyboard Shortcuts</p>
            <p className="mt-1 text-xs">
              <kbd className="bg-white px-2 py-1 rounded border border-border mr-1">+</kbd>
              Add Piece
              <span className="mx-2">•</span>
              <kbd className="bg-white px-2 py-1 rounded border border-border mr-1">-</kbd>
              Remove
              <span className="mx-2">•</span>
              <kbd className="bg-white px-2 py-1 rounded border border-border mr-1">N</kbd>
              Next
              <span className="mx-2">•</span>
              <kbd className="bg-white px-2 py-1 rounded border border-border">R</kbd>
              Reset
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8 text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p>🌟 Keep practicing to become a Fraction Master! 🌟</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
