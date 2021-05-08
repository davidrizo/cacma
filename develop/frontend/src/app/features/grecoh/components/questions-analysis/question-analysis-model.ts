export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export interface Answer {
  email: string;
  answer: string;
  coherence: string;
}

export interface LevelQuestionAnswers {
  ordering: number;
  questions: Map<number, Question>; // key = question id
}

export interface LevelsQuestionAnswers {
  levels: Map<number, LevelQuestionAnswers>; // key = ordering
}
