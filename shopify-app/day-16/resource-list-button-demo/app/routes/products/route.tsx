import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Page, Button, Card, ResourceList, ResourceItem, Avatar, Text } from '@shopify/polaris';

export const loader: LoaderFunction = async () => {
    const query = `
        {
        products(first: 7) {
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

    const response = await fetch('https://tuan-dev-store.myshopify.com/admin/api/2025-04/graphql.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN as string,
        },
        body: JSON.stringify({ query }),
    });

    const result = await response.json();

    const parsedProducts = result.data.products.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        price: edge.node.variants.edges[0]?.node.price ?? '$0.00',
    }));

    return parsedProducts;
};

// LoaderFunction - useLoaderData
export default function Products() {
    // useLoaderData để GETs Data
    const products = useLoaderData<typeof loader>();

    return (
        <Page
            backAction={{ content: 'Settings', url: '/app' }}
            title="General"
            primaryAction={<Button variant="primary">Add Product</Button>}
            secondaryActions={<Button variant="primary" tone="critical">Delete Product</Button>}
        >
            <Card>
                <Text as="h2" variant="headingSm">
                    Products List using ResourceList (7 products)
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
                >
                </ResourceList>
            </Card>
        </Page>
    );
}