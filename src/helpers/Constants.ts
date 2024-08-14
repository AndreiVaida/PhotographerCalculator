export const HOURS_FOR_DISCUSSIONS: number = 1;
export const HOURS_FOR_TEAR_UP: number = 1;
export const HOURS_FOR_TEAR_DOWN: number = 1;

export const CURRENCY = "Lei";
export const LABOR_PRICE_FOR_ONE_HOUR: number = 100;

// Photography default data
export const PhotosDelivered = {
    HOME_GROOM: 70,
    HOME_GODPARENTS: 40,
    HOME_BRIDE: 170,
    MARITAL_STATUS: 180,
    CHURCH_BAPTISM: 200,
    CHURCH_WEDDING: 210,
    PHOTO_SHOOT: 80,
    PHOTO_SHOOT_BIG: 160,
    RESTAURANT_BAPTISM: 370,
    RESTAURANT_WEDDING: 570, // TODO: also consider the number of guests!
}

export const PhotosMadeFor1Picture = {
    HOME: 2.7,
    MARITAL_STATUS: 3.5,
    CHURCH: 2.8,
    PHOTO_SHOOT: 2.6,
    RESTAURANT: 2.9,
}

export const PhotosEditedIn1Hour = {
    HOME: 60,
    MARITAL_STATUS: 70,
    CHURCH: 60,
    PHOTO_SHOOT: 35,
    RESTAURANT: 80,
}

export const LOADING_PHOTOS_IN_LIGHTROOM_MULTIPLE = 1.3;
export const HOURS_DOWNLOAD_1_PHOTO = 0.001 * LOADING_PHOTOS_IN_LIGHTROOM_MULTIPLE;
export const ACTUAL_EQUIPMENT_WEAR_COST_1_PHOTO = 0.16; // Lei
export const NEW_EQUIPMENT_COST_MULTIPLE = 2;
export const EQUIPMENT_WEAR_COST_1_PHOTO = ACTUAL_EQUIPMENT_WEAR_COST_1_PHOTO * NEW_EQUIPMENT_COST_MULTIPLE;

// Videography default data