import { expect } from '@wdio/globals';
import { TestData } from '../data/testData';
import StorePage from '../pages/storePage';
import CartPage from '../pages/cartPage';

describe('Shopping Cart Logic and Validation', () => {
  it('should display Sizes filter menu', async () => {
    await StorePage.open();

    const isVisible = await StorePage.isSizesFilterVisible();
    expect(isVisible).toBe(true);
  });

  it('should filter products by size (XS, ML)', async () => {
    await StorePage.selectSize(TestData.sizes.xs);
    await StorePage.selectSize(TestData.sizes.ml);
  });

  it('should show correct products count in grid and "Products found" header', async () => {
    const gridCount = await StorePage.getVisibleProductsCount();
    expect(gridCount).toBe(TestData.expectedCounts.productsAfterFilter);

    const headerCount = await StorePage.getProductsFoundCount();
    expect(headerCount).toBe(TestData.expectedCounts.productsAfterFilter);

    // reset filters
    await StorePage.selectSize(TestData.sizes.xs);
    await StorePage.selectSize(TestData.sizes.ml);
  });

  it('should add required products to cart', async () => {
    await StorePage.addProductToCart(TestData.products.blue);
    await CartPage.closeCart();
    await StorePage.addProductToCart(TestData.products.black);
  });

  it('should show correct number of distinct items in cart', async () => {
    const distinct = await CartPage.getDistinctItemsCount();
    expect(distinct).toBe(TestData.expectedCounts.distinctItemsInCart);
  });

  it('should update "Blue T-Shirt" quantity to 3', async () => {
    await CartPage.increaseQuantity(TestData.products.blue, TestData.quantities.blueIncreaseClicks);

    const qty = await CartPage.getItemQuantity(TestData.products.blue);
    expect(qty).toBe(TestData.quantities.blueFinal);
  });

  it('should update total number of items in cart', async () => {
    const total = await CartPage.getTotalItemsInCart();
    expect(total).toBe(TestData.expectedCounts.totalItemsInCart);
  });

  it('should calculate subtotal price correctly', async () => {
    const expected =
      TestData.pricing.blue * TestData.quantities.blueFinal +
      TestData.pricing.black * TestData.quantities.blackFinal;

    const actual = await CartPage.getSubtotal();
    expect(actual).toBe(expected);
  });

  it('should clear the cart', async () => {
    await CartPage.clearCart();
  });

  it('should show empty cart message and subtotal 0', async () => {
    const subtotal = await CartPage.getSubtotal();
    expect(subtotal).toBe(TestData.expectedCounts.emptySubtotal);

    expect(await CartPage.isEmptyCartMessageDisplayed()).toBe(true);
  });
});
