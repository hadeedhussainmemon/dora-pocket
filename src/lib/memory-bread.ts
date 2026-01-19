export interface BreadSlice {
    id: string;
    question: string;
    answer: string;
    isEaten: boolean;
    createdAt: string;
}

export const INITIAL_BREADS: BreadSlice[] = [
    {
        id: "1",
        question: "What is the capital of France?",
        answer: "Paris",
        isEaten: false,
        createdAt: new Date().toISOString()
    },
    {
        id: "2",
        question: "What is 7 x 8?",
        answer: "56",
        isEaten: false,
        createdAt: new Date().toISOString()
    },
];
