export interface TrustMetrics {
  isVerified: boolean;
  successfulTrades: number;
  responseRate: number; // 0 to 1
  accountAgeDays: number;
  positiveReviewsCount: number;
  spamReportsCount: number;
}

/**
 * Calculates a dynamic trust score (0-100) based on user activity and verification.
 * Inspired by Uber/Amazon risk scoring systems.
 */
export function calculateTrustScore(metrics: TrustMetrics): number {
  let score = 0;

  // 1. Email Verification (Base Trust)
  if (metrics.isVerified) score += 20;

  // 2. Successful Transactions (Experience)
  // Max 30 points: 3 points per trade, capped at 10 trades
  score += Math.min(metrics.successfulTrades * 3, 30);

  // 3. Positive Reviews (Social Proof)
  // Max 20 points: 2 points per positive review, capped at 10 reviews
  score += Math.min(metrics.positiveReviewsCount * 2, 20);

  // 4. Response Rate (Reliability)
  // Max 15 points
  score += Math.floor(metrics.responseRate * 15);

  // 5. Account Age (Longevity)
  // Max 15 points: 1 point per 30 days, capped at 15 months
  score += Math.min(Math.floor(metrics.accountAgeDays / 30), 15);

  // 6. Penalties (Risk)
  // -10 points per spam report
  score -= metrics.spamReportsCount * 10;

  // Ensure score is within 0-100
  return Math.max(0, Math.min(100, score));
}

export function getTrustLevel(score: number): {
  label: string;
  color: string;
  badge: string;
} {
  if (score >= 90) return { label: "Elite", color: "text-success", badge: "Trusted Seller" };
  if (score >= 75) return { label: "High", color: "text-primary", badge: "Verified Student" };
  if (score >= 50)
    return { label: "Standard", color: "text-muted-foreground", badge: "Active Member" };
  return { label: "New/Low", color: "text-warning", badge: "Under Review" };
}
