"use client";
import SwipeableDrawer from "@/components/SwipeableDrawer";
import Navigation from "@/components/Navigation";
import { LocationTrackingMap } from "@/components/maps";
import { BottomControl } from "@/components/BottomControl";

const Page = () => {
    return (
        <>
            <div className="absolute top-5 right-5 left-5 flex items-center justify-end z-10">
                <Navigation />
            </div>
            <LocationTrackingMap />
            <BottomControl />
            <SwipeableDrawer />
        </>
    );
};

export default Page;
