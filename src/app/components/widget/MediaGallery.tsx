'use client'
import React, { useState, useRef } from "react";

const MediaGallery = ({ mediaItems }) => {
    const [activeIndex, setActiveIndex] = useState(0); // Track active media item
    const zoomRef = useRef(null); // Ref for zoom functionality

    const handleMouseMove = (e) => {
        if (zoomRef.current) {
            const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            zoomRef.current.style.backgroundPosition = `${x}% ${y}%`;
        }
    };

    const activeItem = mediaItems[activeIndex];

    return (
        <div className="media-gallery flex flex-col gap-4">
            {/* Main Media Display */}
            <div className="media-display flex-1 relative">
                {activeItem.type === "image" ? (
                    <div
                        className="zoom-container w-full h-96 bg-no-repeat bg-contain bg-center cursor-zoom-in"
                        style={{
                            backgroundImage: `url(${activeItem.src})`,
                        }}
                        ref={zoomRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => {
                            if (zoomRef.current) zoomRef.current.style.backgroundPosition = "center";
                        }}
                    >
                        <img
                            src={activeItem.src}
                            alt="Main display"
                            className="w-full h-full object-contain pointer-events-none"
                        />
                    </div>
                ) : (
                    <video
                        src={activeItem.src}
                        controls
                        className="w-full h-96 rounded-lg"
                    />
                )}
            </div>
            {/* Thumbnail List */}
            <div className="thumbnails flex flex-row gap-2">
                {mediaItems.map((item, index) => (
                    <div
                        key={index}
                        className={`thumbnail w-16 h-16 border-2 ${activeIndex === index ? "border-green-500" : "border-gray-300"
                            } rounded overflow-hidden cursor-pointer`}
                        onClick={() => setActiveIndex(index)}
                    >
                        {item.type === "image" ? (
                            <img
                                src={item.src}
                                alt={`Thumbnail ${index}`}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <video
                                src={item.src}
                                className="object-cover w-full h-full"
                                muted
                            />
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default MediaGallery;
