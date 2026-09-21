import { useTranslation } from "react-i18next";
import usePageMetadata from "@/hooks/usePageMetadata/usePageMetadata";
import Hero from "@/components/ui/Hero/Hero";
import MaterialsSection from "@/components/ui/MaterialsSection/MaterialsSection";

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
      <MaterialsSection />
    </main>
  );
}

export default HomePage;
