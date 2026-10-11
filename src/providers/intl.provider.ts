import { type Container, ServiceProvider } from "@veap/kernel";
import { INTL_MESSAGE_LOADERS } from "../common/constants";
import type { MessageLoaderFn, MessageLoaderRecord } from "../common/types";
import { IntlService } from "../services/intl.service";

export interface IntlProviderOptions {
  loaders?: (MessageLoaderRecord | MessageLoaderFn)[];
}

export class IntlServiceProvider extends ServiceProvider {
  constructor(
    container: Container,
    private readonly options: IntlProviderOptions = {},
  ) {
    super(container);
  }

  register(): void {
    this.container.register({
      token: INTL_MESSAGE_LOADERS,
      useValue: this.options.loaders || [],
    });

    this.container.register({
      token: IntlService,
      useClass: IntlService,
      singleton: true,
    });
  }
}
