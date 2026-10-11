[![CI](https://github.com/veapjs/veap-intl/actions/workflows/ci.yml/badge.svg)](https://github.com/veapjs/veap-intl/actions/workflows/ci.yml)
[![Release](https://github.com/veapjs/veap-intl/actions/workflows/release.yml/badge.svg)](https://github.com/veapjs/veap-intl/actions/workflows/release.yml)

# @veap/intl

Internationalization, ICU message formatting, and request locale detection for
Veap and Next.js applications.

## Overview

`@veap/intl` provides a complete localization toolkit designed for modern Next.js
and React 19 architectures. It supports React Server Components (RSC) with zero
client bundle overhead, client-side dynamic switching, ICU message syntax
(pluralization, variables, formatting via `intl-messageformat`), and automated
locale negotiation from HTTP `Accept-Language` headers and cookies.

## Features

- **Full RSC & Client Support**: Seamless translation access in both Server
  Components (`getTranslations`) and Client Components (`useTranslations`).
- **ICU Message Syntax**: Dynamic variables, complex plural rules, numbers,
  and date formatting powered by `intl-messageformat`.
- **Automatic locale detection**: Intelligent locale negotiation based on
  request headers (`negotiator`), path segments, and cookies.
- **Strongly typed keys**: Type-safe dictionary structures and nested key
  traversal (for example, `t("auth.login.title")`).
- **IoC-integrated lifecycle**: `IntlServiceProvider` handles localization
  setup inside the Veap application builder.

## Installation

```bash
# Using bun
bun add @veap/intl @veap/kernel

# Using pnpm
pnpm add @veap/intl @veap/kernel

# Using npm
npm install @veap/intl @veap/kernel
```

## Usage

### Register in Application Builder

Include `IntlServiceProvider` in your application composition root:

```ts
import { Application } from "@veap/kernel";
import { IntlServiceProvider } from "@veap/intl/server";

export const app = Application.configure().use(IntlServiceProvider).create();
```

### Server Components

Fetch translations asynchronously in Next.js Server Components:

```tsx
import { getTranslations, getLocale } from "@veap/intl/server";

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <main>
      <h1>{t("welcome.title", { name: "Developer" })}</h1>
      <p>{t("welcome.current_locale", { locale })}</p>
    </main>
  );
}
```

### Client Components

Use the `useTranslations` hook inside interactive client components:

```tsx
"use client";

import { useTranslations, useLocale } from "@veap/intl/client";

export function CounterButton() {
  const t = useTranslations();
  const { locale, setLocale } = useLocale();

  return (
    <div>
      <p>{t("actions.click_to_continue")}</p>
      <button onClick={() => setLocale(locale === "en" ? "pl" : "en")}>
        {t("actions.switch_language")}
      </button>
    </div>
  );
}
```

### Root Layout Setup

Wrap your application with `IntlProvider` or `IntlServerProvider`:

```tsx
import { IntlServerProvider } from "@veap/intl/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <IntlServerProvider>{children}</IntlServerProvider>
      </body>
    </html>
  );
}
```

## Subpath Exports

| Export Path         | Content                                                                         |
| ------------------- | ------------------------------------------------------------------------------- |
| `@veap/intl`        | Core types, constants, and translator functions                                 |
| `@veap/intl/server` | `getTranslations`, `getLocale`, `IntlServerProvider`, and `IntlServiceProvider` |
| `@veap/intl/client` | `IntlProvider`, `useTranslations`, and `useLocale` hooks                        |

## Documentation

For full guides and ICU translation formatting options, visit:

- **Official Website**: [https://veap.pl](https://veap.pl)
- **Documentation**: [https://veap.pl/docs](https://veap.pl/docs)
- **GitHub Repository**: [https://github.com/veapjs/veap-intl](https://github.com/veapjs/veap-intl)

## License

MIT
