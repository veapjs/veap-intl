import { cookies } from "next/headers";
import { getIntlConfig } from "../common/config.js";
import { detectLocale } from "../common/detection.js";
import { getMessages } from "../services/loader.js";
import { createTranslator } from "../services/translator.js";

export async function getTranslation(
  localeOverride?: string,
  timeZoneOverride?: string,
) {
  const {
    cookie: cookieName,
    default: defaultLocale,
    locales,
    timeZone: defaultTimeZone,
  } = await getIntlConfig();

  let locale = localeOverride;
  const timeZone = timeZoneOverride || defaultTimeZone;

  if (!locale) {
    try {
      const cookieStore = await cookies();
      const cookieValue = cookieStore.get(cookieName)?.value;

      if (cookieValue && locales.includes(cookieValue)) {
        locale = cookieValue;
      } else {
        locale = await detectLocale(locales, defaultLocale);
      }
    } catch (_e) {
      locale = defaultLocale;
    }
  }

  const activeLocale = locale || defaultLocale || "en";

  const messages = await getMessages(activeLocale);

  return createTranslator({ messages, locale: activeLocale, timeZone });
}
