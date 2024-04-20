import React, { useMemo } from 'react';
import './App.css';
import { PhotoGrid } from "./components/PhotoGrid";
import { EventServiceContext } from "./helpers/ApplicationContext";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { VideoGrid } from "./components/VideoGrid";
import { PhotoEventService } from "./services/PhotoEventService";

function App() {
    ModuleRegistry.registerModules([ClientSideRowModelModule]);
    const eventService = useMemo<PhotoEventService>(() => new PhotoEventService(), []);

    return (
        <div className="App">
            <header className="App-header">
                Calculator preț eveniment
            </header>
            <EventServiceContext.Provider value={eventService}>
                <PhotoGrid height={"500px"} event={eventService.getNewWeddingEvent()}/>
                {/*<VideoGrid height={"300px"} event={eventService.getDemoVideoEvent()}/>*/}
            </EventServiceContext.Provider>
        </div>
    );
}

export default App;
