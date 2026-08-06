import type { SecurityAnalyzer } from "../analyzers/base-analyzer";

import type { SecurityContext, SecurityAnalysis } from "../types/security";

export class SecurityEngine {
  private analyzers: SecurityAnalyzer[];

  constructor(analyzers: SecurityAnalyzer[]) {
    this.analyzers = analyzers;
  }

  async analyze(context: SecurityContext): Promise<SecurityAnalysis> {
    const threats = [];

    for (const analyzer of this.analyzers) {
      const result = analyzer.analyze(context);

      if (result) {
        threats.push(result);
      }
    }

    const riskScore = threats.reduce(
      (total, threat) => total + threat.score,
      0,
    );

    return {
      riskScore,

      threats,
    };
  }
}
