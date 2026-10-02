import type { ComponentProps } from "react";
import type { TranslationKey } from "@/types/locales";
import Contact from "@/components/ui/Contact/Contact";
import GeoSvg from "@/components/svg/GeoSvg";
import PhoneCallSvg from "@/components/svg/PhoneCallSvg";

const CONTACTS: {
  Icon: ComponentProps<typeof Contact>["Icon"];
  contact: TranslationKey;
  label: TranslationKey;
  nowrap?: boolean;
}[] = [
  {
    Icon: GeoSvg,
    contact: "Footer.contacts.address.value",
    label: "Footer.contacts.address.label",
  },
  {
    Icon: PhoneCallSvg,
    contact: "Footer.contacts.phone.value",
    label: "Footer.contacts.phone.label",
    nowrap: true,
  },
];

const COPYRIGHT: { year: number; company: string } = {
  year: 2026,
  company: "BIO CWT",
};

export { CONTACTS, COPYRIGHT };
