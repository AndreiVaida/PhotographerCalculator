import { PhotoEvent, VideoEvent } from "../model/Event";
import { PhotoRow } from "../model/GridDefinition";
import { PhotoTask, VideoTask } from "../model/Task";
import { Location } from "../model/Location";

export class EventService {

    getDemoPhotoEvent(): PhotoEvent {
        const home1 = new PhotoTask(Location.HOME, "la mire");
        home1.hoursForPreparing = 1;
        home1.hoursInLocation = 1;
        home1.photosDelivered = 70;
        home1.hoursDownload = 0.3;
        home1.hoursEditing = 3;
        home1.hoursExport = 0.5;
        home1.laborPrice = 200;
        home1.equipmentWearCost = 50;
        home1.softwareCost = 10;
        home1.transportCost = 50;
        home1.totalPrice = 300;

        const rows: PhotoTask[] = [
            home1,
            new PhotoRow(Location.HOME, "la mireasă"),
            new PhotoRow(Location.CHURCH),
            new PhotoRow(Location.RESTAURANT),
        ];

        return new PhotoEvent("Nuntă", rows, new PhotoTask(Location.TOTAL));
    }

    getDemoVideoEvent(): VideoEvent {
        const church = new VideoTask(Location.CHURCH, "la mire");
        church.hoursForPreparing = 1;
        church.hoursInLocation = 1;
        church.minutes = 60;
        church.hoursDownload = 0.3;
        church.hoursEditing = 5;
        church.hoursExport = 5;
        church.laborPrice = 500;
        church.equipmentWearCost = 50;
        church.softwareCost = 20;
        church.transportCost = 50;
        church.totalPrice = 600;

        const rows: VideoTask[] = [
            new VideoTask(Location.HOME, "la mire"),
            new VideoTask(Location.HOME, "la mireasă"),
            church,
            new VideoTask(Location.RESTAURANT),
        ];

        const shortMovie = new VideoTask(Location.SUMMARY);
        shortMovie.minutes = 6;
        shortMovie.hoursEditing = 6;
        shortMovie.hoursExport = 1;
        shortMovie.laborPrice = 600;
        shortMovie.equipmentWearCost = 50;
        shortMovie.softwareCost = 20;

        return new VideoEvent("Nuntă", rows, new VideoTask(Location.TOTAL), shortMovie);
    }
}