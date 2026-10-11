import { container } from "@veap/kernel";
import type {
  AbstractIntlMessages,
  MessageLoaderFn,
  MessageLoaderRecord,
} from "../common/types";
import { IntlService } from "./intl.service";

async function getService(): Promise<IntlService> {
  return container.resolve(IntlService);
}

export async function registerMessages(
  locale: string,
  messages: any,
): Promise<void> {
  const service = await getService();
  service.registerMessages(locale, messages);
}

export async function registerMessageLoader(
  loader: MessageLoaderRecord | MessageLoaderFn,
  priority?: number,
): Promise<void> {
  const service = await getService();
  service.registerLoader(loader, priority);
}

export async function getMessages(
  locale: string,
  searchDirectories?: string[],
): Promise<AbstractIntlMessages> {
  const service = await getService();
  return await service.getMessages(locale, searchDirectories);
}
