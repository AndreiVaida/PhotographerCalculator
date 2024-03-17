import { Location } from "./Location";
import { PhotoTask, VideoTask } from "./Task";
import { PhotoEvent, VideoEvent } from "./Event";
import { applyStyle, rowSpanFirstRow } from "../helpers/GridHelpers";
import { ColDef } from "@ag-grid-community/core";

export class PhotoRow extends PhotoTask {
}

export class VideoRow extends VideoTask {
    videoEvent: VideoEvent;

    constructor(location: Location, description: string, isPresent: boolean, totalPrice: number, videoEvent: VideoEvent) {
        super(location, description, isPresent, totalPrice);
        this.videoEvent = videoEvent;
    }
}

/**
 * Fields of {@link Task}
 */
enum Column {
    // Task
    Location = "location",
    Participate = "isPresent",
    HoursForPreparing = "hoursForPreparing",
    HoursInLocation = "hoursInLocation",
    HoursDownload = "hoursDownload",
    HoursEditing = "hoursEditing",
    HoursExport = "hoursExport",
    LaborPrice = "laborPrice",
    EquipmentWearCost = "equipmentWearCost",
    SoftwareCost = "softwareCost",
    TransportCost = "transportCost",
    TotalPrice = "totalPrice",
}

/**
 * Fields of {@link PhotoRow}
 */
enum PhotoColumn {
    PhotosDelivered = "photosDelivered",
}

/**
 * Fields of {@link VideoRow}
 */
enum VideoColumn {
    IsPhotoAndVideo = "videoEvent.isAlsoPhotographing",
    Minutes = "minutes",
    HoursGeneralEditing = "videoEvent.hoursGeneralEditing",
    DoShortMovie = "videoEvent.shortMovie.isPresent",
    MinutesShortMovie = "videoEvent.shortMovie.minutes",
    HoursEditingShortMovie = "videoEvent.shortMovie.hoursEditing",
    HoursExportShortMovie = "videoEvent.shortMovie.hoursExport",
    LaborPriceShortMovie = "videoEvent.shortMovie.laborPrice",
}

const columnLocation: ColDef = { headerName: 'Locație', field: Column.Location, width: 150, headerClass: "ag-left-aligned-header", cellStyle: { textAlign: "left" } };
const columnParticipate: ColDef = { headerName: 'Particip', field: Column.Participate, width: 60 };
const columnHoursForPreparing: ColDef = { headerName: 'Ore pregătiri', field: Column.HoursForPreparing };
const columnHoursInLocation: ColDef = { headerName: 'Ore acolo', field: Column.HoursInLocation };
const columnHoursDownload: ColDef = { headerName: 'Ore descărcare', field: Column.HoursDownload };
const columnHoursEditing: ColDef = { headerName: 'Ore editare', field: Column.HoursEditing };
const columnHoursExport: ColDef = { headerName: 'Ore export', field: Column.HoursExport };
const columnLaborPrice: ColDef = { headerName: 'Preț manoperă', field: Column.LaborPrice };
const columnEquipmentWearCost: ColDef = { headerName: 'Cost uzură aparatură', field: Column.EquipmentWearCost };
const columnSoftwareCost: ColDef = { headerName: 'Cost software', field: Column.SoftwareCost };
const columnTransportCost: ColDef = { headerName: 'Cost transport', field: Column.TransportCost };
const columnTotalPrice: ColDef = { headerName: 'Preț total', field: Column.TotalPrice };
/**
 * Fields of {@link PhotoRow}
 */
export const photoColumnDefs: ColDef[] = [
    columnLocation,
    columnParticipate,
    columnHoursForPreparing,
    columnHoursInLocation,
    columnHoursDownload,
    columnHoursEditing,
    columnHoursExport,
    { headerName: 'Fotografii livrate', field: PhotoColumn.PhotosDelivered },
    columnLaborPrice,
    columnEquipmentWearCost,
    columnSoftwareCost,
    columnTransportCost,
    columnTotalPrice,
].map(applyStyle);


export const videoColumnDefs: ColDef[] = [
    columnLocation,
    columnParticipate,
    { headerName: 'Foto + Video', field: VideoColumn.IsPhotoAndVideo, width: 60, rowSpan: rowSpanFirstRow },
    columnHoursForPreparing,
    columnHoursInLocation,
    columnHoursDownload,
    { ...columnHoursEditing, headerName: 'Minute în film complet' },
    { ...columnHoursExport, headerName: 'Ore editare film complet' },
    { headerName: 'Ore editare intro, final etc.', field: VideoColumn.HoursGeneralEditing },
    { headerName: 'Ore export film complet', field: Column.HoursExport },
    { ...columnLaborPrice, headerName: 'Preț manoperă film complet' },
    { headerName: 'Rezumat', field: VideoColumn.DoShortMovie, rowSpan: rowSpanFirstRow },
    { headerName: 'Minute rezumat', field: VideoColumn.MinutesShortMovie, rowSpan: rowSpanFirstRow },
    { headerName: 'Ore editare rezumat', field: VideoColumn.HoursEditingShortMovie, rowSpan: rowSpanFirstRow },
    { headerName: 'Ore export rezumat', field: VideoColumn.HoursExportShortMovie, rowSpan: rowSpanFirstRow },
    { headerName: 'Preț manoperă rezumat', field: VideoColumn.LaborPriceShortMovie, rowSpan: rowSpanFirstRow },
    columnEquipmentWearCost,
    columnSoftwareCost,
    columnTransportCost,
    columnTotalPrice,
].map(applyStyle);

export type GridProps = {
    height: string;
}

export type PhotoGridProps = GridProps & {
    event: PhotoEvent;
}

export type VideoGridProps = GridProps & {
    event: VideoEvent;
}