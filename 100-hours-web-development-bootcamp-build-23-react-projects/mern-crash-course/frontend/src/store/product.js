import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return {
        success: false,
        message: 'Please fill in all fields',
      };
    }

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      return {
        success: false,
        message: 'Internal server error',
      };
    }

    const data = await res.json();

    set((state) => ({
      products: [...state.products, data],
    }));

    return {
      success: true,
      message: 'Product created successfully',
    };
  },
  fetchProducts: async () => {
    const res = await fetch('/api/products');

    if (!res.ok) {
      return {
        success: false,
        message: 'Internal server error',
      };
    }

    const data = await res.json();

    set({ products: data.data });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      return {
        success: false,
        message: 'Internal server error',
      };
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));

    return {
      success: true,
      message: 'Product successfully deleted',
    };
  },
  updateProduct: async (product) => {
    const res = await fetch(`/api/products/${product._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      return {
        success: false,
        message: 'Internal server error',
      };
    }

    set((state) => {
      const products = structuredClone(state.products);
      const productIndex = products.findIndex((p) => p._id === product._id);

      products[productIndex] = product;

      return {
        products,
      };
    });

    return {
      success: true,
      message: 'Product successfully updated',
    };
  },
}));
