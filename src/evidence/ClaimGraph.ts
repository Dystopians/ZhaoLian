import { claimRecords, getClaim } from '../content/content';
import type { ClaimRecord } from '../types/content';

export class ClaimGraph {
  all(): ClaimRecord[] {
    return claimRecords;
  }

  conflictsFor(claimId: string): ClaimRecord[] {
    return getClaim(claimId).conflictingClaimIds.map((id) => getClaim(id));
  }

  supportingClaimsForEvidence(evidenceId: string): ClaimRecord[] {
    return claimRecords.filter((claim) => claim.supportingEvidenceIds.includes(evidenceId));
  }
}
