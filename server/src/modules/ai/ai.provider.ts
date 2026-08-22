export interface ComplaintAIResult {
  category: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  urgencyScore: number;
  priorityScore: number;
  reason: string;
}

export interface ComplaintSummaryResult {
  summary: string;
  hotTopics: Array<{ topic: string; count: number; severity: string }>;
}

export interface AIProvider {
  classifyComplaint(input: { title: string; description: string }): Promise<ComplaintAIResult>;
  summarizeComplaints(
    input: Array<{ title: string; description: string; category: string; severity: string }>,
  ): Promise<ComplaintSummaryResult>;
}
