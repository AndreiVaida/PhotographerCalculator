import { ColDef, RowSpanParams, ValueFormatterFunc, ValueFormatterParams } from "@ag-grid-community/core";
import { VideoTask } from "../model/Task";

export const rowSpanFirstRow = (params: RowSpanParams<VideoTask>) => {
    return 1;
};

const isNumber = (value: object) => typeof value === "number" && !isNaN(value);

export const decimalValueFormatter: ValueFormatterFunc = (params: ValueFormatterParams) =>
    isNumber(params.value)
        ? Number(params.value.toFixed(1)) === Number(params.value.toFixed()) ? params.value.toFixed() : params.value.toFixed(1).replace(".", ",")
        : params.value

export const integerValueFormatter: ValueFormatterFunc = (params: ValueFormatterParams) => formatInteger(params.value)
const formatInteger = (value: any) =>
    isNumber(value)
        ? value.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : value;

export const currencyValueFormatter: ValueFormatterFunc = (params: ValueFormatterParams) => `${formatInteger(params.value)} Lei`
export const applyColumnStyle = (colDef: ColDef): ColDef => {
    colDef.sortable = false;
    colDef.wrapHeaderText = true;
    colDef.autoHeaderHeight = true;
    colDef.cellStyle = { ...colDef?.cellStyle, padding: 5 };

    if (!colDef.width)
        colDef.width = 100;

    if (!colDef.headerClass) {
        colDef.headerClass = "ag-right-aligned-header";
        colDef.cellStyle = { ...colDef.cellStyle, textAlign: "right" };
    }

    if (!colDef.valueFormatter) {
        colDef.valueFormatter = integerValueFormatter;
    }

    if (colDef.editable) {
        colDef.cellClass = "editableCell";
    }

    return colDef;
}