import type { ComponentType } from "react";
import type { TranslationKey } from "@/shared/types/locales";
import { PhoneCallSvg, GeoSvg } from "@/shared/ui/icons";

const CONTACTS: {
  Icon: ComponentType;
  label: TranslationKey;
  value: TranslationKey;
}[] = [
  {
    Icon: PhoneCallSvg,
    label: "ContactsSection.contacts.phone.label",
    value: "ContactsSection.contacts.phone.value",
  },
  {
    Icon: GeoSvg,
    label: "ContactsSection.contacts.address.label",
    value: "ContactsSection.contacts.address.value",
  },
];

const MAP_HEIGHTS = {
  mobile: "230px",
  tablet: "400px",
  desktop: "400px",
};

export { CONTACTS, MAP_HEIGHTS };
