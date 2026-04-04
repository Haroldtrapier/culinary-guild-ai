interface ScanResultCardProps {
  topMatch: string;
  confidenceScore: number;
  safetyRisk: string;
  warning: string | null;
}

export function ScanResultCard({
  topMatch,
  confidenceScore,
  safetyRisk,
  warning,
}: ScanResultCardProps) {
  const riskColor =
    safetyRisk === "high"
      ? "border-red-500/30 bg-red-500/10 text-red-100"
      : safetyRisk === "medium"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-100"
        : "border-emerald-500/30 bg-emerald-500/10 text-emerald-100";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="text-lg font-semibold">{topMatch}</div>
      <div className="mt-2 text-sm text-zinc-400">
        Confidence: {(confidenceScore * 100).toFixed(0)}%
      </div>
      <div className={`mt-3 rounded-xl border p-3 text-sm ${riskColor}`}>
        {warning ?? "No safety flags triggered."}
      </div>
    </div>
  );
}
