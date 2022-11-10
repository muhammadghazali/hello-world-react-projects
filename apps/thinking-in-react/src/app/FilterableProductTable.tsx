import React from "react";

interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

const SearchBar = () => {
  return (
    <form>
      <input type="text" placeholder="Search product" />
      <label>
        <input type="checkbox" />
        Only show products in stock
      </label>
    </form>
  );
};

interface ProductRowIProps {
  product: Product;
}
const ProductRow = (props: ProductRowIProps) => {
  const { product } = props;
  const name = product.stocked ? (
    product.name
  ) : (
    <span
      style={{
        color: "red",
      }}
    >
      {product.name}
    </span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

interface ProductCategoryRowIProps {
  category: string;
}
const ProductCategoryRow = (props: ProductCategoryRowIProps) => {
  const { category } = props;

  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
};

interface ProductTableIProps {
  products: Product[];
}
const ProductTable = (props: ProductTableIProps) => {
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  props.products.forEach((product: Product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Price</th>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

interface FilterableProductTableIProps {
  products: Product[];
}
const FilterableProductTable = (props: FilterableProductTableIProps) => {
  const { products } = props;

  return (
    <>
      <SearchBar />
      <ProductTable products={products} />
    </>
  );
};

export default FilterableProductTable;
