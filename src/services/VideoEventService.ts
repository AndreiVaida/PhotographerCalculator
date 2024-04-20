import { VideoEvent } from "../model/Event";
import { VideoTask } from "../model/Task";
import { TaskType } from "../model/TaskType";

const HOURS_DOWNLOAD_1_MINUTE = 0.007;

export class VideoEventService {
    // getDemoVideoEvent(): VideoEvent {
    //     const church = new VideoTask(TaskType.CHURCH, "la mire");
    //     church.hoursForPreparing = 1;
    //     church.hoursInLocation = 1;
    //     church.minutes = 60;
    //     church.hoursDownload = 0.3;
    //     church.hoursEditing = 5;
    //     church.hoursExport = 5;
    //     church.laborPrice = 500;
    //     church.equipmentWearCost = 50;
    //     church.softwareCost = 20;
    //     church.transportCost = 50;
    //     church.totalPrice = 600;
    //
    //     const rows: VideoTask[] = [
    //         new VideoTask(TaskType.HOME, "la mire"),
    //         new VideoTask(TaskType.HOME, "la mireasă"),
    //         church,
    //         new VideoTask(TaskType.RESTAURANT),
    //     ];
    //
    //     const shortMovie = new VideoTask(TaskType.SUMMARY);
    //     shortMovie.minutes = 6;
    //     shortMovie.hoursEditing = 6;
    //     shortMovie.hoursExport = 1;
    //     shortMovie.laborPrice = 600;
    //     shortMovie.equipmentWearCost = 50;
    //     shortMovie.softwareCost = 20;
    //
    //     return new VideoEvent("Nuntă", rows, new VideoTask(TaskType.TOTAL), shortMovie);
    // }
}