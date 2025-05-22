import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import {
  Page,
  Button,
  Card,
  ResourceList,
  ResourceItem,
  Avatar,
  Text,
  Filters,
} from '@shopify/polaris';
import { useCallback, useState } from 'react';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';

  const query = `
    query getProducts($first: Int!, $query: String) {
      products(first: $first, query: $query) {
        edges {
          node {
            id
            title
            variants(first: 1) {
              edges {
                node {
                  price
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    first: 5,
    query: search ? `title:*${search}*` : undefined,
  };

  const response = await fetch('https://tuan-dev-store.myshopify.com/admin/api/2025-04/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();

  const parsedProducts = result.data.products.edges.map((edge: any) => ({
    id: edge.node.id,
    title: edge.node.title,
    price: edge.node.variants.edges[0]?.node.price ?? '$0.00',
  }));

  return ({ products: parsedProducts, search });
}

export default function Products() {
  const { products, search } = useLoaderData<typeof loader>();
  const [queryValue, setQueryValue] = useState(search);
  const [, setSearchParams] = useSearchParams();

  const handleQueryChange = useCallback((value: string) => setQueryValue(value), []);
  const handleQueryClear = useCallback(() => {
    setQueryValue('');
    setSearchParams({});
  }, [setSearchParams]);

  const handleSearchSubmit = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (queryValue) {
        params.set('search', queryValue);
      } else {
        params.delete('search');
      }
      return params;
    });
  };

  const filterControl = (
    <Filters
      queryValue={queryValue}
      filters={[]}
      onQueryChange={handleQueryChange}
      onQueryClear={handleQueryClear}
      onClearAll={handleQueryClear}
    >
      <div style={{ paddingLeft: 8 }}>
        <Button onClick={handleSearchSubmit}>Search</Button>
      </div>
    </Filters>
  );

  return (
    <Page
      backAction={{ content: 'Settings', url: '/app' }}
      title="Products"
      primaryAction={<Button variant="primary">Add Product</Button>}
      secondaryActions={[{ content: 'Delete Product' }]}
    >
      <Card>
        <Text as="h2" variant="headingSm">
          Products List (Filtered)
        </Text>

        <ResourceList
          resourceName={{ singular: 'product', plural: 'products' }}
          items={products}
          renderItem={(item) => {
            const { id, title, price } = item;
            const media = <Avatar customer size="md" name={title} />;

            return (
              <ResourceItem
                id={id}
                url="#"
                media={media}
                accessibilityLabel={`View details for ${title}`}
              >
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  {title}
                </Text>
                <div>Price: {price} ($)</div>
              </ResourceItem>
            );
          }}
          filterControl={filterControl}
        />
      </Card>
    </Page>
  );
}
