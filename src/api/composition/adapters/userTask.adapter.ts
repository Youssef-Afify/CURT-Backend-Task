import { UserTaskService } from "../../../business/services/userTask.service";
import { IsUserTaskPort } from "../../../core/ports/userTask.port";

export class IsUserTaskAdapter implements IsUserTaskPort {
    constructor(private readonly userTaskService: UserTaskService) {}

    async isUserTask(userId: string, taskId: string): Promise<boolean> {
        const result = await this.userTaskService.isUserTask(userId, taskId);
        return result;
    }
}
