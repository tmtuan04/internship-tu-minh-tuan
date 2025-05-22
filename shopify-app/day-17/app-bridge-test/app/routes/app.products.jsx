import { useState } from "react";
import { Page, Button, Card, BlockStack, Text, Thumbnail } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { ImageIcon } from "@shopify/polaris-icons";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function openResourcePicker() {
    const result = await window.shopify.resourcePicker({
      type: "product",
      action: "select",
    });

    if (result && result.length > 0) {
      const product = result[0];
      const { images, id, variants, title, handle } = product;

      setSelectedProduct({
        id,
        title,
        handle,
        variantId: variants?.[0]?.id,
        image: images?.[0]?.originalSrc,
        alt: images?.[0]?.altText,
      });
    }
  }

  return (
    <Page>
      <TitleBar title="Products page" />
      <Card>
        <BlockStack gap="300">
          <Button onClick={openResourcePicker}>Select a Product</Button>
          {selectedProduct && (
            <>
              <Text variant="headingMd">{selectedProduct.title}</Text>
              <Thumbnail
                source={selectedProduct.image || ImageIcon}
                alt={selectedProduct.alt || "Selected product"}
              />
              <Text>Handle: {selectedProduct.handle}</Text>
              <Text>ID: {selectedProduct.id}</Text>
            </>
          )}
        </BlockStack>
      </Card>
    </Page>
  );
}
