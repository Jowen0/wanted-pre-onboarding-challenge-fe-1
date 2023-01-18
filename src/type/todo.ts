export const TODO_STATUS = {
    READ: 'read',
    UPDATE: 'update',
} as const;
export type TodoStatus = typeof TODO_STATUS[keyof typeof TODO_STATUS];

export type TodoType = {
    title: string,
    content: string,
    id: string,
    createdAt: string,
    updatedAt: string
};