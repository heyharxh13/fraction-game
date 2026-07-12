/**
 * Game Logic for Fraction Learning Game
 * Handles fraction generation, comparison, and state management
 */

export interface GameState {
  totalPieces: number;
  shadedPieces: number;
  targetNumerator: number;
  targetDenominator: number;
  level: number;
  score: number;
  isCorrect: boolean;
  message: string;
}

/**
 * Generate a random valid fraction
 * Returns numerator and denominator where numerator < denominator
 */
export function generateTargetFraction(
  denominator: number = 8
): { numerator: number; denominator: number } {
  const validNumerators = Array.from(
    { length: denominator - 1 },
    (_, i) => i + 1
  );
  const randomIndex = Math.floor(Math.random() * validNumerators.length);
  const numerator = validNumerators[randomIndex];

  return {
    numerator,
    denominator,
  };
}

/**
 * Check if current fraction matches target fraction
 */
export function checkFraction(
  shadedPieces: number,
  totalPieces: number,
  targetNumerator: number,
  targetDenominator: number
): boolean {
  // Cross multiply to check if fractions are equal
  // a/b = c/d if a*d = b*c
  return shadedPieces * targetDenominator === totalPieces * targetNumerator;
}

/**
 * Get feedback message based on comparison
 */
export function getFeedbackMessage(
  shadedPieces: number,
  totalPieces: number,
  targetNumerator: number,
  targetDenominator: number
): string {
  if (checkFraction(shadedPieces, totalPieces, targetNumerator, targetDenominator)) {
    return "Correct! Great Job!";
  }

  // Provide hints
  const currentFraction = shadedPieces / totalPieces;
  const targetFraction = targetNumerator / targetDenominator;

  if (currentFraction < targetFraction) {
    return "Keep Trying! You need more pieces.";
  } else {
    return "Keep Trying! You have too many pieces.";
  }
}

/**
 * Calculate current fraction percentage
 */
export function calculatePercentage(
  shadedPieces: number,
  totalPieces: number
): number {
  return (shadedPieces / totalPieces) * 100;
}
