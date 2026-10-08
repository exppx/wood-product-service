import { useTranslation } from "react-i18next";
import { usePageMetadata } from "@/shared/lib/hooks";
import { Reveal } from "@/shared/ui";
import { Hero } from "@/widgets/hero";
import { MaterialsSection } from "@/widgets/materials-section";
import { OurWorksSection } from "@/widgets/our-works-section";
import { AdvantagesSection } from "@/widgets/advantages-section";
import { AboutSection } from "@/widgets/about-section";
import { QuestionsSection } from "@/widgets/questions-section";

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

      <Reveal>
        <MaterialsSection />
      </Reveal>

      <Reveal>
        <OurWorksSection />
      </Reveal>

      <Reveal>
        <AdvantagesSection />
      </Reveal>

      <Reveal>
        <AboutSection />
      </Reveal>

      <Reveal>
        <QuestionsSection />
      </Reveal>
    </main>
  );
}

export default HomePage;
