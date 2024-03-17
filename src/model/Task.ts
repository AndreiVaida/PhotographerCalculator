import { Location } from "./Location";

export abstract class Task {
    location: Location;
    description: string | undefined;
    isPresent: boolean;
    hoursForPreparing: number | undefined;
    hoursInLocation: number | undefined;
    hoursDownload: number | undefined;
    hoursEditing: number | undefined;
    hoursExport: number | undefined;
    laborPrice: number | undefined;
    equipmentWearCost: number | undefined;
    softwareCost: number | undefined;
    transportCost: number | undefined;
    totalPrice: number;

    constructor(location: Location, description: string | undefined = undefined, isPresent: boolean = true, totalPrice: number = 0) {
        this.location = location;
        this.description = description;
        this.isPresent = isPresent;
        this.totalPrice = totalPrice;
    }
}

export class PhotoTask extends Task {
    photosDelivered: number | undefined;
}

export class VideoTask extends Task {
    minutes: number | undefined;
}