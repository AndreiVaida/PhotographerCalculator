import React, { useMemo } from 'react';
import './App.css';
import { PhotoGrid } from "./components/PhotoGrid";
import { EventService } from "./services/EventService";
import { EventServiceContext } from "./helpers/ApplicationContext";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { VideoGrid } from "./components/VideoGrid";

function App() {
    ModuleRegistry.registerModules([ClientSideRowModelModule]);
    const calculatorService = useMemo<EventService>(() => new EventService(), []);

    return (
        <div className="App">
            <header className="App-header">
                Calculator preț eveniment
            </header>
            <EventServiceContext.Provider value={calculatorService}>
                <PhotoGrid height={"300px"} event={calculatorService.getDemoPhotoEvent()}/>
                <VideoGrid height={"300px"} event={calculatorService.getDemoVideoEvent()}/>
            </EventServiceContext.Provider>
        </div>
    );
}

export default App;
