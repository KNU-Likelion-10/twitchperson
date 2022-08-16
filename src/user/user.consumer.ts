import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { UserService } from "./user.service";

@Processor('streamer')
export class UserConsumer {
    constructor(
        private readonly userService: UserService
    ) {}

    @Process('create')
    handleTranscode(job: Job) {
        this.userService.getStreamer(job.data.user, job.data.info);
    }
}