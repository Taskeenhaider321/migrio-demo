"use client";

import { useState } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";
import { Icon } from "./Icon";

export type VideoEmbedProps = {
  src: string;
  poster: string;
  posterAlt: string;
  captionsSrc: string;
  title: string;
  /** Reported with the `video_play` event. */
  videoId: string;
};

/**
 * Poster-first facade. Nothing but the poster image loads until the visitor
 * presses play, which keeps the video off the LCP path; the aspect-ratio box
 * reserves space up front so nothing shifts when it swaps in.
 */
export function VideoEmbed({
  src,
  poster,
  posterAlt,
  captionsSrc,
  title,
  videoId,
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  function play() {
    trackEvent("video_play", {
      video_id: videoId,
      video_title: title,
      page_path: window.location.pathname,
    });
    setPlaying(true);
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-primary-dark shadow-lift">
      {playing ? (
        <video
          className="size-full"
          controls
          autoPlay
          playsInline
          preload="auto"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
          <track
            src={captionsSrc}
            kind="captions"
            srcLang="en"
            label="English"
            default
          />
          Your browser does not support embedded video.{" "}
          <a href={src}>Download the video</a> instead.
        </video>
      ) : (
        <button
          type="button"
          onClick={play}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          <Image
            src={poster}
            alt={posterAlt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            // The placeholder poster is an SVG; real raster posters get
            // optimised normally.
            unoptimized={poster.endsWith(".svg")}
            className="object-cover"
          />
          <span className="absolute inset-0 bg-primary-dark/25 transition-colors group-hover:bg-primary-dark/15" />
          <span className="absolute left-1/2 top-1/2 flex size-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-float transition-transform group-hover:scale-105">
            <Icon
              name="play"
              filled
              className="size-7 translate-x-0.5 text-primary"
            />
          </span>
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-darkest/80 to-transparent p-5 text-left">
            <span className="block text-base font-semibold text-white">
              {title}
            </span>
            <span className="mt-0.5 block text-sm text-primary-light">
              Play video · captions available
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
