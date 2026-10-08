import { useTranslation } from "react-i18next";
import { useMedia } from "@/shared/lib/hooks";
import { Contact, Container, Section } from "@/shared/ui";
import { CONTACTS, MAP_HEIGHTS } from "./model";

import s from "./ContactsSection.module.scss";

function ContactsSection() {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useMedia();

  return (
    <Container width="xl">
      <Section>
        <Container width="lg" className={s["contacts"]}>
          <div className={s["contacts__text"]}>
            <h1>{t("ContactsSection.title")}</h1>

            {CONTACTS.map(({ Icon, label, value }) => (
              <Contact
                key={value}
                Icon={Icon}
                label={t(label)}
                contact={t(value)}
              />
            ))}
          </div>

          <iframe
            className={s["contacts__map"]}
            data-testid="map"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae74d2429802c6fae09766bd0ee67bc84cfd39651649800be084d60e037a36643&amp;source=constructor"
            width="100%"
            height={
              isMobile
                ? MAP_HEIGHTS.mobile
                : isTablet
                  ? MAP_HEIGHTS.tablet
                  : MAP_HEIGHTS.desktop
            }
          ></iframe>
        </Container>
      </Section>
    </Container>
  );
}

export default ContactsSection;
