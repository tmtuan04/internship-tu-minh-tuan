import { useLoaderData } from "@remix-run/react";
import { Card, Page, ResourceList, Text } from "@shopify/polaris";
import { productsLoader } from "app/loaders/productsLoader";

export const loader = productsLoader;

export default function ProductList() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <Page title="Danh sách sản phẩm">
      <Card>
        <ResourceList
          resourceName={{ singular: "product", plural: "products" }}
          items={products}
          renderItem={(product) => {
            const { id, title, vendor, status } = product;
            return (
              <ResourceList.Item id={id} url="#" accessibilityLabel={`View details for ${title}`}>
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  {title}
                </Text>
                <div>Vendor: {vendor}</div>
                <div>Status: {status}</div>
              </ResourceList.Item>
            );
          }}
        />
      </Card>
    </Page>
  );
}
