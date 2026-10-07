import { useTranslation } from "react-i18next";
import { usePageMetadata } from "@/shared/lib/hooks";
import Hero from "@/components/ui/Hero/Hero";
import MaterialsSection from "@/components/ui/MaterialsSection/MaterialsSection";
import OurWorksSection from "@/components/ui/OurWorksSection/OurWorksSection";
import AdvantagesSection from "@/components/ui/AdvantagesSection/AdvantagesSection";
import AboutSection from "@/components/ui/AboutSection/AboutSection";
import QuestionsSection from "@/components/ui/QuestionsSection/QuestionsSection";
import { Reveal } from "@/shared/ui";

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
