import { useTranslation } from "react-i18next";
import usePageMetadata from "@/hooks/usePageMetadata/usePageMetadata";
import ContactsSection from "@/components/ui/ContactsSection/ContactsSection";

import styles from "./ContactsPage.module.scss";

function ContactsPage() {
  const { t } = useTranslation();
  usePageMetadata({
    title: t("ContactsPage.metadata.title"),
    description: t("ContactsPage.metadata.description"),
  });

  return (
    <div className={styles["contacts-page"]}>
      <ContactsSection />
    </div>
  );
}

export default ContactsPage;
