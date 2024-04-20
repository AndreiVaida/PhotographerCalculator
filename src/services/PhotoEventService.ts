import { PhotoEvent } from "../model/Event";
import { PhotoTask } from "../model/Task";
import { TaskType } from "../model/TaskType";
import { EventService } from "./EventService";

const LOADING_PHOTOS_MULTIPLE = 1.3;
const HOURS_DOWNLOAD_1_PHOTO = 0.001 * LOADING_PHOTOS_MULTIPLE;
const ACTUAL_EQUIPMENT_WEAR_COST_1_PHOTO = 0.16;
const NEW_EQUIPMENT_COST_MULTIPLE = 1.3;
const EQUIPMENT_WEAR_COST_1_PHOTO = ACTUAL_EQUIPMENT_WEAR_COST_1_PHOTO * NEW_EQUIPMENT_COST_MULTIPLE; // Lei

export class PhotoEventService extends EventService{
    getNewWeddingEvent(): PhotoEvent {
        const homeAtGroom = this.getHomeTask("la mire", 70);
        const homeAtGoodparents = this.getHomeTask("la nași", 40, 0.5);
        const homeAtGoodparents2 = this.getHomeTask("la nași 2", 40, 0.5);
        const homeAtBride = this.getHomeTask("la mireasă", 170);
        const maritalStatus = this.getMaritalStatusTask();
        const wedding = this.getChurchTask(200);
        const photoShoot = this.getPhotoShootTask(160);
        const photoShoot2 = this.getPhotoShootTask(80, "2", 0.5);
        const party = this.getRestaurantTask();

        const tasks: PhotoTask[] = [
            homeAtGroom,
            homeAtGoodparents,
            homeAtGoodparents2,
            homeAtBride,
            maritalStatus,
            wedding,
            photoShoot,
            photoShoot2,
            party
        ];
        const total = this.getTotal(tasks);

        return new PhotoEvent("Nuntă", tasks, total);
    }

    getHoursDownload = (photosMade: number) => photosMade * HOURS_DOWNLOAD_1_PHOTO;
    getHoursEditing = (taskType: TaskType, photosEdited: number) => photosEdited / this.getPhotosEditedInOneHour(taskType);
    getHoursExport = (photosDelivered: number) => photosDelivered * HOURS_DOWNLOAD_1_PHOTO;

    getLaborPrice = (taskType: TaskType, hoursForPreparing: number, hoursDownload: number, hoursInLocation: number, hoursEditing: number, hoursExport: number): number =>
        this.getLaborPriceForOneHour(taskType) * (hoursForPreparing + hoursDownload + hoursInLocation + hoursEditing + hoursExport);

    getEquipmentWearCost = (photosMade: number) => photosMade * EQUIPMENT_WEAR_COST_1_PHOTO;
    getSoftwareCost = (photosDelivered: number | undefined) => 0;
    getTotalPrice = (laborPrice: number, equipmentWearCost: number, softwareCost: number, transportCost: number) =>
        laborPrice + equipmentWearCost + softwareCost + transportCost;

    getTotal = (tasks: PhotoTask[]): PhotoTask =>
        tasks.reduce((total, task) => {
            total.hoursForPreparing = this.addNullableNumbers(total.hoursForPreparing, task.hoursForPreparing);
            total.hoursInLocation = this.addNullableNumbers(total.hoursInLocation, task.hoursInLocation);
            total.hoursDownload = this.addNullableNumbers(total.hoursDownload, task.hoursDownload);
            total.hoursEditing = this.addNullableNumbers(total.hoursEditing, task.hoursEditing);
            total.hoursExport = this.addNullableNumbers(total.hoursExport, task.hoursExport);
            total.photosDelivered = this.addNullableNumbers(total.photosDelivered, task.photosDelivered);
            total.laborPrice = this.addNullableNumbers(total.laborPrice, task.laborPrice);
            total.equipmentWearCost = this.addNullableNumbers(total.equipmentWearCost, task.equipmentWearCost);
            total.softwareCost = this.addNullableNumbers(total.softwareCost, task.softwareCost);
            total.transportCost = this.addNullableNumbers(total.transportCost, task.transportCost);
            total.totalPrice = this.addNullableNumbers(total.totalPrice, task.totalPrice);
            return total
        }, new PhotoTask(TaskType.TOTAL))

    private getPhotosEditedInOneHour = (taskType: TaskType): number => {
        switch (taskType) {
            case TaskType.HOME: return 60;
            case TaskType.PHOTO_SHOOT: return 60;
            case TaskType.MARITAL_STATUS: return 70;
            case TaskType.CHURCH: return 60;
            case TaskType.RESTAURANT:  return 70;
            default: return 60;
        }
    }

    private getLaborPriceForOneHour = (taskType: TaskType): number => {
        switch (taskType) {
            case TaskType.RESTAURANT:  return 50;
            default: return 70;
        }
    }

    private getTask = (taskType: TaskType, description: string | undefined, hoursInLocation: number, photosMade: number, photosDelivered: number): PhotoTask => {
        const task = new PhotoTask(taskType, description);
        task.hoursForPreparing = 0.5;
        task.hoursInLocation = hoursInLocation;
        task.photosMade = photosMade;
        task.photosDelivered = photosDelivered;
        task.hoursDownload = this.getHoursDownload(photosMade);
        task.hoursEditing = this.getHoursEditing(TaskType.HOME, photosDelivered);
        task.hoursExport = this.getHoursExport(photosDelivered);
        task.laborPrice = this.getLaborPrice(taskType, task.hoursForPreparing, task.hoursDownload, task.hoursInLocation, task.hoursEditing, task.hoursExport);
        task.equipmentWearCost = this.getEquipmentWearCost(task.photosMade);
        task.softwareCost = this.getSoftwareCost(task.photosDelivered);
        task.transportCost = 25;
        task.totalPrice = this.getTotalPrice(task.laborPrice, task.equipmentWearCost, task.softwareCost, task.transportCost)
        return task;
    }

    private getHomeTask = (description: string, photosDelivered: number, hoursInLocation = 1) =>
        this.getTask(TaskType.HOME, description, hoursInLocation, photosDelivered * 2.5, photosDelivered);

    private getMaritalStatusTask = () =>
        this.getTask(TaskType.MARITAL_STATUS, undefined, 1, 700, 180);

    private getChurchTask = (photosDelivered: number) =>
        this.getTask(TaskType.CHURCH, undefined, 1, photosDelivered * 3, photosDelivered);

    private getPhotoShootTask = (photosDelivered: number, description?: string, hoursInLocation = 1) =>
        this.getTask(TaskType.PHOTO_SHOOT, description, hoursInLocation, photosDelivered * 2.5, photosDelivered);

    private getRestaurantTask = (photosDelivered: number = 500, hoursInLocation = 8) =>
        this.getTask(TaskType.RESTAURANT, undefined, hoursInLocation, photosDelivered * 3, photosDelivered);

    private addNullableNumbers = (number1: number | undefined, number2: number | undefined): number | undefined => {
        if (number1 && number2) return number1 + number2;
        if (number1) return number1;
        return number2;
    }
}