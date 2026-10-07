import { useEffect, useState } from "react";
import { BREAKPOINTS } from "./useMedia.config";

export interface MediaState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function getMediaState(): MediaState {
  return {
    isMobile: window.matchMedia(`(max-width: ${BREAKPOINTS.mobileEnd})`)
      .matches,
    isTablet: window.matchMedia(
      `(min-width: ${BREAKPOINTS.tabletStart}) and (max-width: ${BREAKPOINTS.tabletEnd})`,
    ).matches,
    isDesktop: window.matchMedia(`(min-width: ${BREAKPOINTS.desktopStart})`)
      .matches,
  };
}

export default function useMedia(): MediaState {
  const [media, setMedia] = useState<MediaState>(getMediaState);

  useEffect(() => {
    function handleResize() {
      const newMedia = getMediaState();

      setMedia((prevMedia) => {
        if (
          newMedia.isMobile === prevMedia.isMobile &&
          newMedia.isTablet === prevMedia.isTablet &&
          newMedia.isDesktop === prevMedia.isDesktop
        ) {
          return prevMedia;
        } else {
          return newMedia;
        }
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return media;
}
