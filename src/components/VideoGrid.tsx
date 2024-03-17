import { AgGridReact } from '@ag-grid-community/react';
import React, { useContext, useRef, useState } from "react";
import { videoColumnDefs, VideoGridProps } from "../model/GridDefinition";
import { ColDef } from "@ag-grid-community/core";
import { EventService } from "../services/EventService";
import { EventServiceContext } from "../helpers/ApplicationContext";
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { VideoTask } from "../model/Task";

export const VideoGrid = (props: VideoGridProps) => {
    const calculatorService: EventService = useContext<EventService>(EventServiceContext);
    const videoGridRef = useRef<AgGridReact<VideoTask>>(null);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>(videoColumnDefs);
    const [rowData, setRowData] = useState<VideoTask[]>([...props.event.tasks, props.event.total]);

    function onGridReady() {
        // autoSizeAll();
    }

    return (
        <div className="ag-theme-alpine" style={{height: props.height}}>
            <AgGridReact
                ref={videoGridRef}
                columnDefs={columnDefs}
                rowData={rowData}
                suppressRowTransform={true}
                onGridReady={onGridReady}
            />
        </div>
    )
}