import { Icon } from "@iconify/react";
import { Link } from "@inertiajs/react";
import React from "react";
const NewsCard = ({img,date,title,body,to}) => {

    return (
        <div className="bg-white rounded-lg p-5 flex flex-col gap-4 group">
            <div className="w-full aspect-video overflow-hidden">
                
            <img
                src={`${img}`}
                className="size-full group-hover:scale-105 scale-100 duration-300 ease-in-out object-cover"
                alt="img-card"
                draggable='false'
            />

            </div>
            <div className="flex-col gap-1 flex ">
                <small className="text-text-dark-gray">{date}</small>
                <h3 className="text-xl font-medium text-text-black h-14  line-clamp-2">
                    {title}
                </h3>
                <div className="line-clamp-3 text-sm  h-20 prose-sm" dangerouslySetInnerHTML={{__html:body}}>
                
                </div>
                <Link  href={to}  className="text-primary-orange font-semibold text-xs mt-4 flex items-center gap-1 group-hover:gap-2 duration-150 ease-in-out">
                    Baca selengkapnya
                    <Icon icon={"ic:round-play-arrow"} />
                </Link>
            </div>
        </div>
    );
};

export default NewsCard;
