interface IProduct {
  id: string
  title: string
  vendor: string
  status: string
}

interface IProductEdge {
  node: IProduct
}

export async function fetchProducts(shop: string, accessToken: string) {
  const endpoint = `https://${shop}/admin/api/2025-04/graphql.json`;

  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            vendor
            status
          }
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  return json.data.products.edges.map((edge: IProductEdge) => edge.node)
}
