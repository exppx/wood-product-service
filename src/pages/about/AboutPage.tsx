import { useTranslation } from "react-i18next";
import { usePageMetadata } from "@/shared/lib/hooks";
import { AboutSection } from "@/widgets/about-section";
import { OurWorksSection } from "@/widgets/our-works-section";
import { QuestionsSection } from "@/widgets/questions-section";

import styles from "./AboutPage.module.scss";

function AboutPage() {
  const { t } = useTranslation();
  usePageMetadata({
    title: t("AboutPage.metadata.title"),
    description: t("AboutPage.metadata.description"),
  });

  return (
    <main className={styles["about-page"]}>
      <AboutSection isMainSection={true} />
      <OurWorksSection />
      <QuestionsSection />
    </main>
  );
}

export default AboutPage;
