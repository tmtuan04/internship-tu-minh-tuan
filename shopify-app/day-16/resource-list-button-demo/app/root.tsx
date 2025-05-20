import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import enTranslations from '@shopify/polaris/locales/en.json';
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

import { authenticate } from "./shopify.server";

// i18n là viết tắt của internationalization — nghĩa là "đa ngôn ngữ hóa" hay "quốc tế hóa"
// Trong Shopify Polaris, i18n là một object chứa các chuỗi văn bản để hiển thị trong giao diện UI
// Như label, button text, error messages... bằng ngôn ngữ mà bạn chọn.
// Tóm lại: i18n là object chứa bản dịch

export const links = () => [{
  rel: "stylesheet", href: polarisStyles
}];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticate.admin(request);
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
}

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        
        <AppProvider apiKey={apiKey} i18n={enTranslations}>
          <Outlet />
        </AppProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
