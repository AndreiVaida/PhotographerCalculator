import { createContext } from "react";
import { EventService } from "../services/EventService";

export const EventServiceContext = createContext<EventService>(new EventService())