import React, { ChangeEventHandler, useState } from 'react';

interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface SearchBarIProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (filterText: string) => void;
  onInStockOnlyChange: (stockStatus: boolean) => void;
}
const SearchBar = (props: SearchBarIProps) => {
  const { filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange } =
    props;

  return (
    <form>
      <input
        type="text"
        placeholder="Search product"
        value={filterText}
        onChange={(event) => onFilterTextChange(event.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(event) => onInStockOnlyChange(event.target.checked)}
        />
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
        color: 'red',
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
  filterText: string;
  inStockOnly: boolean;
  products: Product[];
}
const ProductTable = (props: ProductTableIProps) => {
  const { inStockOnly, products } = props;
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  // if the stock checkbox is not checked, return all items
  const productsInStock = products.filter((product) =>
    !inStockOnly ? true : product.stocked === inStockOnly
  );

  productsInStock.forEach((product: Product) => {
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
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

interface FilterableProductTableIProps {
  products: Product[];
}
const FilterableProductTable = (props: FilterableProductTableIProps) => {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const { products } = props;

  return (
    <>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  );
};

export default FilterableProductTable;
