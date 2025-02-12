import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./drawerSlice";
import mapReducer from "./mapSlice";

export const store = configureStore({
    reducer: {
        drawer: drawerReducer,
        map: mapReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
