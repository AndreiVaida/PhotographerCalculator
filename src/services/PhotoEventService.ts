import { PhotoEvent } from "../model/Event";
import { PhotoTask } from "../model/Task";
import { TaskType } from "../model/TaskType";
import { EventService } from "./EventService";
import {
    EQUIPMENT_WEAR_COST_1_PHOTO,
    HOURS_DOWNLOAD_1_PHOTO,
    HOURS_FOR_DISCUSSIONS,
    HOURS_FOR_TEAR_DOWN,
    HOURS_FOR_TEAR_UP,
    LABOR_PRICE_FOR_ONE_HOUR, PhotosDelivered, PhotosEditedIn1Hour, PhotosMadeFor1Picture
} from "../helpers/Constants";

export class PhotoEventService extends EventService {
    getNewWeddingEvent(): PhotoEvent {
        const homeAtGroom = this.getHomeTask("la mire", PhotosDelivered.HOME_GROOM);
        const homeAtGoodparents = this.getHomeTask("la nași", PhotosDelivered.HOME_GODPARENTS, 0.5);
        const homeAtGoodparents2 = this.getHomeTask("la nași 2", PhotosDelivered.HOME_GODPARENTS, 0.5);
        const homeAtBride = this.getHomeTask("la mireasă", PhotosDelivered.HOME_BRIDE);
        const maritalStatus = this.getMaritalStatusTask();
        const wedding = this.getChurchTask(PhotosDelivered.CHURCH_WEDDING);
        const photoShoot = this.getPhotoShootTask(PhotosDelivered.PHOTO_SHOOT_BIG);
        const photoShoot2 = this.getPhotoShootTask(PhotosDelivered.PHOTO_SHOOT, "2", 0.5);
        const party = this.getRestaurantTask(PhotosDelivered.RESTAURANT_WEDDING);
        const generalWork = this.getGeneralWorkTask();

        const tasks: PhotoTask[] = [
            homeAtGroom,
            homeAtGoodparents,
            homeAtGoodparents2,
            homeAtBride,
            maritalStatus,
            wedding,
            photoShoot,
            photoShoot2,
            party,
            generalWork
        ];
        const total = this.getTotal(tasks);

        return new PhotoEvent("Nuntă", tasks, total);
    }

    getHoursDownload = (photosMade: number) => photosMade * HOURS_DOWNLOAD_1_PHOTO;
    getHoursEditing = (taskType: TaskType, photosEdited: number) => photosEdited / this.getPhotosEditedInOneHour(taskType);
    getHoursExport = (photosDelivered: number) => photosDelivered * HOURS_DOWNLOAD_1_PHOTO;
    getHoursOnComputer = (hoursDownload: number, hoursEditing: number, hoursExport: number) => hoursDownload + hoursEditing + hoursExport;
    getHoursTotalWork = (hoursForPreparing: number, hoursForTransport: number, hoursInLocation: number, totalHoursOnComputer: number) => hoursForPreparing + hoursForTransport + hoursInLocation + totalHoursOnComputer;

    getLaborPrice = (taskType: TaskType, totalHoursWorked: number): number => LABOR_PRICE_FOR_ONE_HOUR * totalHoursWorked;
    getEquipmentWearCost = (photosMade: number) => photosMade * EQUIPMENT_WEAR_COST_1_PHOTO;
    getSoftwareCost = (photosDelivered: number | undefined) => 0;
    getTotalPrice = (laborPrice: number, equipmentWearCost: number, softwareCost: number) => laborPrice + equipmentWearCost + softwareCost;

    getTotal = (tasks: PhotoTask[]): PhotoTask =>
        tasks.reduce((total, task) => {
            total.hoursForPreparing = this.addNullableNumbers(total.hoursForPreparing, task.hoursForPreparing);
            total.hoursForTransport = this.addNullableNumbers(total.hoursForTransport, task.hoursForTransport);
            total.hoursInLocation = this.addNullableNumbers(total.hoursInLocation, task.hoursInLocation);
            total.hoursDownload = this.addNullableNumbers(total.hoursDownload, task.hoursDownload);
            total.hoursEditing = this.addNullableNumbers(total.hoursEditing, task.hoursEditing);
            total.hoursExport = this.addNullableNumbers(total.hoursExport, task.hoursExport);
            total.totalHoursOnComputer = this.addNullableNumbers(total.totalHoursOnComputer, task.totalHoursOnComputer);
            total.totalHoursWorked = this.addNullableNumbers(total.totalHoursWorked, task.totalHoursWorked);
            total.photosMade = this.addNullableNumbers(total.photosMade, task.photosMade);
            total.photosDelivered = this.addNullableNumbers(total.photosDelivered, task.photosDelivered);
            total.laborPrice = this.addNullableNumbers(total.laborPrice, task.laborPrice);
            total.equipmentWearCost = this.addNullableNumbers(total.equipmentWearCost, task.equipmentWearCost);
            total.softwareCost = this.addNullableNumbers(total.softwareCost, task.softwareCost);
            total.totalPrice = this.addNullableNumbers(total.totalPrice, task.totalPrice);
            return total
        }, new PhotoTask(TaskType.TOTAL))

    private getPhotosEditedInOneHour = (taskType: TaskType): number => {
        switch (taskType) {
            case TaskType.HOME: return PhotosEditedIn1Hour.HOME;
            case TaskType.MARITAL_STATUS: return PhotosEditedIn1Hour.MARITAL_STATUS;
            case TaskType.CHURCH: return PhotosEditedIn1Hour.CHURCH;
            case TaskType.PHOTO_SHOOT: return PhotosEditedIn1Hour.PHOTO_SHOOT;
            case TaskType.RESTAURANT: return PhotosEditedIn1Hour.RESTAURANT;
            default: return 60;
        }
    }

    private getTask = (taskType: TaskType, description: string | undefined, hoursInLocation: number, photosMade: number, photosDelivered: number): PhotoTask => {
        const task = new PhotoTask(taskType, description);
        task.hoursForPreparing = 0.5;
        task.hoursForTransport = 0.5;
        task.hoursInLocation = hoursInLocation;
        task.photosMade = photosMade;
        task.photosDelivered = photosDelivered;
        task.hoursDownload = this.getHoursDownload(photosMade);
        task.hoursEditing = this.getHoursEditing(TaskType.HOME, photosDelivered);
        task.hoursExport = this.getHoursExport(photosDelivered);
        task.totalHoursOnComputer = this.getHoursOnComputer(task.hoursDownload, task.hoursEditing, task.hoursExport);
        task.totalHoursWorked = this.getHoursTotalWork(task.hoursForPreparing, task.hoursForTransport, hoursInLocation, task.totalHoursOnComputer);
        task.laborPrice = this.getLaborPrice(taskType, task.totalHoursWorked);
        task.equipmentWearCost = this.getEquipmentWearCost(task.photosMade);
        task.softwareCost = this.getSoftwareCost(task.photosDelivered);
        task.totalPrice = this.getTotalPrice(task.laborPrice, task.equipmentWearCost, task.softwareCost);
        return task;
    }

    private getHomeTask = (description: string, photosDelivered: number, hoursInLocation = 1) =>
        this.getTask(TaskType.HOME, description, hoursInLocation, photosDelivered * PhotosMadeFor1Picture.HOME, photosDelivered);

    private getMaritalStatusTask = () =>
        this.getTask(TaskType.MARITAL_STATUS, undefined, 1, PhotosDelivered.MARITAL_STATUS * PhotosMadeFor1Picture.MARITAL_STATUS, PhotosDelivered.MARITAL_STATUS);

    private getChurchTask = (photosDelivered: number) =>
        this.getTask(TaskType.CHURCH, undefined, 1, photosDelivered * PhotosMadeFor1Picture.CHURCH, photosDelivered);

    private getPhotoShootTask = (photosDelivered: number, description?: string, hoursInLocation = 1) =>
        this.getTask(TaskType.PHOTO_SHOOT, description, hoursInLocation, photosDelivered * PhotosMadeFor1Picture.PHOTO_SHOOT, photosDelivered);

    private getRestaurantTask = (photosDelivered: number, hoursInLocation = 8) =>
        this.getTask(TaskType.RESTAURANT, undefined, hoursInLocation, photosDelivered * PhotosMadeFor1Picture.RESTAURANT, photosDelivered);

    private getGeneralWorkTask = () => {
        const task = new PhotoTask(TaskType.GENERAL);
        task.hoursForPreparing = HOURS_FOR_DISCUSSIONS + HOURS_FOR_TEAR_UP + HOURS_FOR_TEAR_DOWN;
        return task;
    }

    private addNullableNumbers = (number1: number | undefined, number2: number | undefined): number | undefined => {
        if (number1 && number2) return number1 + number2;
        if (number1) return number1;
        return number2;
    }
}