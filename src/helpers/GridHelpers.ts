import { ColDef, RowSpanParams } from "@ag-grid-community/core";

export const rowSpanFirstRow = (params: RowSpanParams) => {
    return 1;
};

export const applyStyle = (colDef: ColDef): ColDef => {
    colDef.sortable = false;
    colDef.wrapHeaderText = true;
    colDef.autoHeaderHeight = true;
    colDef.cellStyle = { ...colDef?.cellStyle, padding: 5 }

    if (!colDef.width)
        colDef.width = 100;

    if (!colDef.headerClass) {
        colDef.headerClass = "ag-right-aligned-header"
        colDef.cellStyle = { ...colDef.cellStyle, textAlign: "right" }
    }

    return colDef;
}