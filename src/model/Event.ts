import { PhotoTask, Task, VideoTask } from "./Task";

export abstract class Event<T extends Task> {
    name: string;
    tasks: T[]
    total: T

    constructor(name: string, tasks: T[], totalEstimation: T) {
        this.name = name;
        this.tasks = tasks;
        this.total = totalEstimation;
    }
}

export class PhotoEvent extends Event<PhotoTask> {
}

export class VideoEvent extends Event<VideoTask> {
    hoursGeneralEditing: number | undefined;
    isAlsoPhotographing: boolean;
    totalFullMovie: VideoTask

    constructor(name: string, tasks: VideoTask[], total: VideoTask, totalFullMovie: VideoTask, shortMovie: VideoTask, isAlsoPhotographing = false) {
        super(name, tasks, total);
        this.isAlsoPhotographing = isAlsoPhotographing;
        this.totalFullMovie = totalFullMovie;
    }
}