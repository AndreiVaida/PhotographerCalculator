import { AgGridReact } from '@ag-grid-community/react';
import React, { useContext, useRef, useState } from "react";
import { photoColumnDefs, PhotoGridProps, PhotoRow } from "../model/GridDefinition";
import { ColDef } from "@ag-grid-community/core";
import { EventService } from "../services/EventService";
import { EventServiceContext } from "../helpers/ApplicationContext";
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';

export const PhotoGrid = (props: PhotoGridProps) => {
    const calculatorService: EventService = useContext<EventService>(EventServiceContext);
    const photoGridRef = useRef<AgGridReact<PhotoRow>>(null);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>(photoColumnDefs);
    const [rowData, setRowData] = useState<PhotoRow[]>([...props.event.tasks, props.event.total]);

    function onGridReady() {
        // autoSizeAll();
    }

    return (
        <div className="ag-theme-alpine" style={{height: props.height}}>
            <AgGridReact
                ref={photoGridRef}
                columnDefs={columnDefs}
                rowData={rowData}
                suppressRowTransform={true}
                onGridReady={onGridReady}
            />
        </div>
    )
}