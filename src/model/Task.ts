import { TaskType } from "./TaskType";

export abstract class Task {
    taskType: TaskType;
    description: string | undefined;
    isPresent: boolean;
    hoursForPreparing: number | undefined;
    hoursForTransport: number | undefined;
    hoursInLocation: number | undefined;
    hoursDownload: number | undefined;
    hoursEditing: number | undefined;
    hoursExport: number | undefined;
    totalHoursOnComputer: number | undefined;
    totalHoursWorked: number | undefined;
    laborPrice: number | undefined;
    equipmentWearCost: number | undefined;
    softwareCost: number | undefined;
    totalPrice: number | undefined;

    constructor(taskType: TaskType, description: string | undefined = undefined, isPresent: boolean = true) {
        this.taskType = taskType;
        this.description = description;
        this.isPresent = isPresent;
    }
}

export class PhotoTask extends Task {
    photosMade: number | undefined;
    photosDelivered: number | undefined;
}

export class VideoTask extends Task {
    minutes: number | undefined;
}