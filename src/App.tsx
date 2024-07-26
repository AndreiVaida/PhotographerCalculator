import React, { useMemo, useState } from 'react';
import './App.css';
import { PhotoGrid } from "./components/PhotoGrid";
import { EventServiceContext } from "./helpers/ApplicationContext";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { VideoGrid } from "./components/VideoGrid";
import { PhotoEventService } from "./services/PhotoEventService";
import { PhotoEvent } from "./model/Event";

function App() {
    ModuleRegistry.registerModules([ClientSideRowModelModule]);
    const photoEventService = useMemo<PhotoEventService>(() => new PhotoEventService(), []);
    const [photoEvent, setPhotoEvent] = useState<PhotoEvent>(photoEventService.getNewWeddingEvent());

    return (
        <div className="App">
            <header className="App-header">
                Calculator eveniment
            </header>
            <EventServiceContext.Provider value={photoEventService}>
                <PhotoGrid height={"490px"} event={photoEvent}/>
                {/*<VideoGrid height={"300px"} event={eventService.getDemoVideoEvent()}/>*/}
            </EventServiceContext.Provider>
        </div>
    );
}

export default App;
