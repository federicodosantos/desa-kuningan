import React from "react";
import PlaceCard from "./PlaceCard";

const PlaceList = ({ places }) => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {places.length > 0 ? (
                places.map((item, i) => <PlaceCard key={i} item={item} />)
            ) : (
                <div className="col-span-2 text-center p-2">tidak ada data</div>
            )}
        </section>
    );
};

export default PlaceList;