import { useEffect } from "react";

export interface PageMetadata {
  title?: string;
  description?: string;
}

export default function usePageMetadata({ title, description }: PageMetadata) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let metaElement = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );

      if (!metaElement) {
        metaElement = document.createElement("meta");
        metaElement.setAttribute("name", "description");
        document.head.appendChild(metaElement);
      }

      metaElement.setAttribute("content", description);
    }
  }, [title, description]);
}
