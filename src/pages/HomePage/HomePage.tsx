import { useTranslation } from "react-i18next";
import usePageMetadata from "@/hooks/usePageMetadata/usePageMetadata";
import Hero from "@/components/ui/Hero/Hero";

import styles from "./HomePage.module.scss";

function HomePage() {
  const { t } = useTranslation();
  usePageMetadata({
    title: t("HomePage.metadata.title"),
    description: t("HomePage.metadata.description"),
  });

  return (
    <main className={styles["home-page"]}>
      <Hero />
    </main>
  );
}

export default HomePage;
