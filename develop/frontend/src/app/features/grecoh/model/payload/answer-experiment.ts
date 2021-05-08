export interface AnswerExperiment {
  levelOrdering?: number;
  questionID: number;
  questionOrdering?: number;
  question?: string;
  email: string;
  answer?: string;
  coherence?: string;
}
// use optional values for reuse the same object for several actions
