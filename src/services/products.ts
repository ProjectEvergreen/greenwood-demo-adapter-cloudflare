export interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

export async function getProducts(id?: string): Promise<Product | Product[]> {
  const idSuffix = id ? `/${id}` : '';
  const data = (await fetch(`https://dummyjson.com/products${idSuffix}`)
    .then(resp => resp.json()));

  if (id) {
    return data as Product;
  }

  return data.products as Product[];
}
