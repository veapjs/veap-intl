import { Container } from "@veap/kernel";
import { describe, expect, it } from "vitest";
import { IntlServiceProvider } from "../src/providers/intl.provider";
import { IntlService } from "../src/services/intl.service";

describe("IntlService & Loaders (@veap/intl)", () => {
  it("merges messages using registered loaders according to priority", async () => {
    const service = new IntlService();

    // Loader with priority 100 (e.g. plugins)
    service.registerLoader({
      id: "plugin:test",
      priority: 100,
      loader: async (locale) => {
        if (locale === "pl") {
          return {
            plugin: {
              title: "Tytuł wtyczki",
              action: "Akcja bazowa",
            },
          };
        }
        return null;
      },
    });

    // Loader with priority 200 (e.g. app override)
    service.registerLoader({
      id: "app:override",
      priority: 200,
      loader: async (locale) => {
        if (locale === "pl") {
          return {
            plugin: {
              action: "Nadpisana akcja aplikacji",
            },
            app: {
              hello: "Witaj świecie",
            },
          };
        }
        return null;
      },
    });

    const messages = await service.getMessages("pl");

    // Plugin title should remain
    expect((messages as any).plugin?.title).toBe("Tytuł wtyczki");
    // Action should be overridden by app loader
    expect((messages as any).plugin?.action).toBe("Nadpisana akcja aplikacji");
    // App message should be present
    expect((messages as any).app?.hello).toBe("Witaj świecie");
  });

  it("allows registering loaders via IntlServiceProvider options", async () => {
    const container = new Container();
    const provider = new IntlServiceProvider(container, {
      loaders: [
        {
          id: "custom:provider-loader",
          priority: 150,
          loader: () => ({
            custom: { key: "value" },
          }),
        },
      ],
    });

    provider.register();

    const service = await container.resolve(IntlService);
    const messages = await service.getMessages("en");

    expect((messages as any).custom?.key).toBe("value");
  });

  it("prioritizes registerMessages over loaders", async () => {
    const service = new IntlService();

    service.registerLoader({
      id: "loader1",
      priority: 100,
      loader: () => ({ greeting: "From loader" }),
    });

    service.registerMessages("en", { greeting: "From direct register" });

    const messages = await service.getMessages("en");
    expect((messages as any).greeting).toBe("From direct register");
  });
});
