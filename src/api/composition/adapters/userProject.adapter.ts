import { UserProjectService } from "../../../business/services/userProject.service";
import { IsUserProjectPort } from "../../../core/ports/userProject.port";

export class IsUserProjectAdapter implements IsUserProjectPort {
    constructor(private readonly userProjectService: UserProjectService) {}

    async isUserProject(userId: string, projectId: string): Promise<boolean> {
        const result = await this.userProjectService.isUserProject(userId, projectId);
        return result;
    }
}
