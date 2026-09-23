export interface IsUserTaskPort {
    isUserTask(userId: string, taskId: string): Promise<boolean>;
}
