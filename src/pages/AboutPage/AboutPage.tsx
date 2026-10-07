import { useTranslation } from "react-i18next";
import { usePageMetadata } from "@/shared/lib/hooks";
import AboutSection from "@/components/ui/AboutSection/AboutSection";
import OurWorksSection from "@/components/ui/OurWorksSection/OurWorksSection";
import QuestionsSection from "@/components/ui/QuestionsSection/QuestionsSection";

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
