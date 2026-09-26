import type { ComponentProps } from "react";
import type { TranslationKey } from "@/types/locales";
import Contact from "@/components/ui/Contact/Contact";
import GeoSvg from "@/components/svg/GeoSvg";
import PhoneCallSvg from "@/components/svg/PhoneCallSvg";

const CONTACTS: {
  Icon: ComponentProps<typeof Contact>["Icon"];
  contact: TranslationKey;
  nowrap?: ComponentProps<typeof Contact>["nowrap"];
}[] = [
  {
    Icon: GeoSvg,
    contact: "Footer.contacts.address",
  },
  {
    Icon: PhoneCallSvg,
    contact: "Footer.contacts.phone",
    nowrap: true,
  },
];

const COPYRIGHT: { year: number; company: string } = {
  year: 2026,
  company: "BIO CWT",
};

export { CONTACTS, COPYRIGHT };
