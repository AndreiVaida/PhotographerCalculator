import { AgGridReact } from '@ag-grid-community/react';
import React, { useContext, useRef, useState } from "react";
import { photoColumnDefs, PhotoGridProps } from "../model/GridDefinition";
import { ColDef } from "@ag-grid-community/core";
import { EventService } from "../services/EventService";
import { EventServiceContext } from "../helpers/ApplicationContext";
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { PhotoTask } from "../model/Task";
import { RowClassParams } from "@ag-grid-community/core/dist/esm/es6/entities/gridOptions";
import { TaskType } from "../model/TaskType";

export const PhotoGrid = (props: PhotoGridProps) => {
    const calculatorService: EventService = useContext<EventService>(EventServiceContext);
    const photoGridRef = useRef<AgGridReact<PhotoTask>>(null);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>(photoColumnDefs);
    const [rowData, setRowData] = useState<PhotoTask[]>([...props.event.tasks, props.event.total]);

    const gridOptions = {
        rowClassRules: {
            "total": (params: RowClassParams): boolean => params.node.data.taskType == TaskType.TOTAL
        },
    }

    return (
        <div className="ag-theme-quartz-dark" style={{height: props.height}}>
            <AgGridReact
                ref={photoGridRef}
                columnDefs={columnDefs}
                rowData={rowData}
                suppressRowTransform={true}
                gridOptions={gridOptions}
            />
        </div>
    )
}