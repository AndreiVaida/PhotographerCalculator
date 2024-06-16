import { Event, PhotoEvent, VideoEvent } from "./Event";
import {
    applyColumnStyle,
    currencyValueFormatter,
    decimalValueFormatter,
    rowSpanFirstRow
} from "../helpers/GridHelpers";
import { ColDef, ValueGetterParams } from "@ag-grid-community/core";
import { PhotoTask, Task } from "./Task";

/**
 * Fields of {@link Task}
 */
enum Column {
    // Task
    Participate = "isPresent",
    HoursForPreparing = "hoursForPreparing",
    HoursForTransport = "hoursForTransport",
    HoursInLocation = "hoursInLocation",
    HoursDownload = "hoursDownload",
    HoursEditing = "hoursEditing",
    HoursExport = "hoursExport",
    HoursOnComputer = "totalHoursOnComputer",
    HoursTotalWork = "totalHoursWorked",
    LaborPrice = "laborPrice",
    EquipmentWearCost = "equipmentWearCost",
    SoftwareCost = "softwareCost",
    TotalPrice = "totalPrice",
}

const taskNameValueGetter = (params: ValueGetterParams<PhotoTask>) => `${params.data?.taskType} ${params.data?.description ?? ""}`

/**
 * Fields of {@link PhotoRow}
 */
enum PhotoColumn {
    PhotosMade = "photosMade",
    PhotosDelivered = "photosDelivered",
}

/**
 * Fields of {@link VideoRow}
 */
enum VideoColumn {
    IsPhotoAndVideo = "videoEvent.isAlsoPhotographing",
    Minutes = "minutes",
    HoursGeneralEditing = "videoEvent.hoursGeneralEditing",
    TotalFullMovie = "totalFullMovie",
}

const columnTaskName: ColDef = { headerName: 'Activitate', valueGetter: taskNameValueGetter, width: 150, headerClass: "ag-left-aligned-header", cellStyle: { justifyContent: "left" } };
const columnParticipate: ColDef = { headerName: 'Particip', field: Column.Participate, width: 60, cellRenderer: 'agCheckboxCellRenderer', cellEditor: 'agCheckboxCellEditor', cellStyle: { justifyContent: "center" }, editable: true };
const columnHoursForPreparing: ColDef = { headerName: 'Ore pregătiri', field: Column.HoursForPreparing, valueFormatter: decimalValueFormatter, editable: true };
const columnHoursForTransport: ColDef = { headerName: 'Ore transport', field: Column.HoursForTransport, valueFormatter: decimalValueFormatter, editable: true };
const columnHoursInLocation: ColDef = { headerName: 'Ore acolo', field: Column.HoursInLocation, valueFormatter: decimalValueFormatter, cellStyle: { fontWeight: "bold" }, editable: true };
const columnHoursDownload: ColDef = { headerName: 'Ore descărcare', field: Column.HoursDownload, valueFormatter: decimalValueFormatter };
const columnHoursEditing: ColDef = { headerName: 'Ore editare', field: Column.HoursEditing, valueFormatter: decimalValueFormatter };
const columnHoursExport: ColDef = { headerName: 'Ore export', field: Column.HoursExport, valueFormatter: decimalValueFormatter };
const columnHoursOnComputer: ColDef = { headerName: 'Ore pe calculator', field: Column.HoursOnComputer, valueFormatter: decimalValueFormatter, cellStyle: { fontWeight: "bold" } };
const columnHoursTotalWork: ColDef = { headerName: 'Total ore lucrate', field: Column.HoursTotalWork, valueFormatter: decimalValueFormatter, cellStyle: { fontWeight: "bold" } };
const columnLaborPrice: ColDef = { headerName: 'Preț manoperă', field: Column.LaborPrice, valueFormatter: currencyValueFormatter };
const columnEquipmentWearCost: ColDef = { headerName: 'Cost uzură aparatură', field: Column.EquipmentWearCost, valueFormatter: currencyValueFormatter };
const columnSoftwareCost: ColDef = { headerName: 'Cost software', field: Column.SoftwareCost, valueFormatter: currencyValueFormatter };
const columnTotalPrice: ColDef = { headerName: 'Preț total', field: Column.TotalPrice, valueFormatter: currencyValueFormatter, cellStyle: { fontWeight: "bold" } };

/**
 * Fields of {@link PhotoRow}
 */
export const photoColumnDefs: ColDef[] = [
    columnTaskName,
    columnParticipate,
    columnHoursForPreparing,
    columnHoursForTransport,
    columnHoursInLocation,
    { headerName: 'Fotografii realizate', field: PhotoColumn.PhotosMade, editable: true },
    columnHoursDownload,
    columnHoursEditing,
    { headerName: 'Fotografii livrate', field: PhotoColumn.PhotosDelivered, cellStyle: { fontWeight: "bold" } },
    columnHoursExport,
    columnHoursOnComputer,
    columnHoursTotalWork,
    columnLaborPrice,
    columnEquipmentWearCost,
    columnTotalPrice,
].map(applyColumnStyle);


export const videoColumnDefs: ColDef[] = [
    columnTaskName,
    columnParticipate,
    { headerName: 'Foto + Video', field: VideoColumn.IsPhotoAndVideo, width: 60, rowSpan: rowSpanFirstRow },
    columnHoursForPreparing,
    columnHoursForTransport,
    columnHoursInLocation,
    columnHoursDownload,
    columnHoursEditing,
    { headerName: 'Ore editare intro, final etc.', field: VideoColumn.HoursGeneralEditing },
    columnHoursExport,
    columnHoursOnComputer,
    columnHoursTotalWork,
    columnLaborPrice,
    columnEquipmentWearCost,
    columnSoftwareCost,
    columnTotalPrice,
].map(applyColumnStyle);

export abstract class GridProps<T extends Event<Task>> {
    height: string;
    event: T;

   protected constructor(height: string, event: T) {
        this.height = height;
        this.event = event;
    }
}

export class PhotoGridProps extends GridProps<PhotoEvent> {
    constructor(height: string, event: PhotoEvent) {
        super(height, event);
    }
}

export class VideoGridProps extends GridProps<VideoEvent> {
    constructor(height: string, event: VideoEvent) {
        super(height, event);
    }
}