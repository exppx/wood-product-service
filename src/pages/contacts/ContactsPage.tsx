import { useTranslation } from "react-i18next";
import { usePageMetadata } from "@/shared/lib/hooks";
import { ContactsSection } from "@/widgets/contacts-section";

import s from "./ContactsPage.module.scss";

function ContactsPage() {
  const { t } = useTranslation();
  usePageMetadata({
    title: t("ContactsPage.metadata.title"),
    description: t("ContactsPage.metadata.description"),
  });

  return (
    <div className={s["contacts-page"]}>
      <ContactsSection />
    </div>
  );
}

export default ContactsPage;
