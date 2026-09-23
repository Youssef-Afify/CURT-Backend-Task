import { UserTeamService } from "../../../business/services/userTeam.service";
import { IsUserTeamPort } from "../../../core/ports/userTeam.port";

export class IsUserTeamAdapter implements IsUserTeamPort {
    constructor(private readonly userTeamService: UserTeamService) {}

    async isUserTeam(userId: string, teamId: string): Promise<boolean> {
        const result = await this.userTeamService.isUserTeam(userId, teamId);
        return result;
    }
}
