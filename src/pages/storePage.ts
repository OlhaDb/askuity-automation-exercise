import ProductCard from './components/productCard';
import { TestData } from '../data/testData';

class StorePage {
  async open(url: string = TestData.urls.base): Promise<void> {
    await browser.url(url);
  }

  private get sizesFilterTitle() {
    return $('h4=Sizes:');
  }

  private get sizesFilterBox() {
    return this.sizesFilterTitle.parentElement();
  }

  private get productsFoundLabel() {
    return $('//p[contains(normalize-space(), "Product(s) found")]');
  }

  private get cardRoots() {
    return $$('//main//div[@tabindex="1"][.//button[normalize-space()="Add to cart"]]');
  }

  private get cartButton() {
    return $('div[title="Products in cart quantity"]');
  }

  private sizeOption(size: string) {
    return this.sizesFilterBox.$(`//*[normalize-space()="${size}"]`);
  }

  async isSizesFilterVisible(): Promise<boolean> {
    return await this.sizesFilterTitle.isDisplayed();
  }

  async selectSize(size: string): Promise<void> {
    const option = await this.sizeOption(size);

    await option.scrollIntoView();
    await option.waitForClickable();
    await option.click();

    await browser.waitUntil(async () => {
      const found = await this.getProductsFoundCount();
      const grid = await this.getVisibleProductsCount(); 
      return found === grid;
    });
  }

  async getVisibleProductsCount(): Promise<number> {
    const roots = await this.cardRoots;

    let visible = 0;
    for (const r of roots) {
      if (await r.isDisplayed()) visible++;
    }

    return visible;
  }

  async getProductsFoundCount(): Promise<number> {
    await this.productsFoundLabel.waitForDisplayed();

    const text = await this.productsFoundLabel.getText();
    const match = text.match(/\d+/);

    if (!match) {
      throw new Error(`Cannot extract number from text: "${text}"`);
    }

    return Number(match[0]);
  }

  async addProductToCart(productName: string): Promise<void> {
    const roots = await this.cardRoots;

    for (const root of roots) {
      const card = new ProductCard(root);
      const title = (await card.getTitle()).trim();

      if (title === productName) {
        await card.addToCart();
        return;
      }
    }

    throw new Error(`Product "${productName}" not found on the grid`);
  }

  async openCartPage(): Promise<void> {
    await this.cartButton.waitForClickable();
    await this.cartButton.click();
  }
}

export default new StorePage();
