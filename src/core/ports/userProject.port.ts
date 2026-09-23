export interface IsUserProjectPort {
    isUserProject(userId: string, projectId: string): Promise<boolean>;
}
