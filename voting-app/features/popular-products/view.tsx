import ProductList from '@/components/product';
import { Separator } from '@/components/ui/separator';

export default function ViewPopularProducts() {
  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-center text-2xl font-bold">Popular Products</h1>
      <Separator className="mt-4 mb-8" />
      <ProductList />
    </main>
  );
}
