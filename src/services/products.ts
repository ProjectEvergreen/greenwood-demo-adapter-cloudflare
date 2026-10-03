export interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

function getProducts(): Promise<Product[]>;
function getProducts(id: string): Promise<Product>;
async function getProducts(id?: string): Promise<Product | Product[]> {
  const idSuffix = id ? `/${id}` : '';
  const data = (await fetch(`https://dummyjson.com/products${idSuffix}`)
    .then(resp => resp.json()));

  if (id) {
    return data as Product;
  }

  return data.products as Product[];
}

export { getProducts };
