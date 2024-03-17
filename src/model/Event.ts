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
    shortMovie: VideoTask;
    isAlsoPhotographing: boolean;

    constructor(name: string, tasks: VideoTask[], total: VideoTask, shortMovie: VideoTask, isAlsoPhotographing = false) {
        super(name, tasks, total);
        this.shortMovie = shortMovie;
        this.isAlsoPhotographing = isAlsoPhotographing;
    }
}