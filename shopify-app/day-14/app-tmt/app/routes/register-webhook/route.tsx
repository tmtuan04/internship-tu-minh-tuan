import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  const SHOP = 'tuan-dev-store.myshopify.com';
  const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

  const query = `
    mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
      webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
        userErrors {
          field
          message
        }
        webhookSubscription {
          id
          endpoint {
            __typename
            ... on WebhookHttpEndpoint {
              callbackUrl
            }
          }
        }
      }
    }
  `;

  const variables = {
    topic: "PRODUCTS_UPDATE",
    webhookSubscription: {
      callbackUrl: "https://tuan-dev-store/webhooks/products-update",
      format: "JSON"
    }
  };

  const response = await fetch(`https://${SHOP}/admin/api/2025-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();
  console.log("Webhook GraphQL Response:", data);

  return (data);
};

export default function RegisterWebhook() {
  return <div>Registering webhook...</div>;
}
