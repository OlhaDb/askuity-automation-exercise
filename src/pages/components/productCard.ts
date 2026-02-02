export default class ProductCard {
  constructor(private root: WebdriverIO.Element) {}

  private get addToCartButton() {
    return this.root.$('.//button[normalize-space()="Add to cart"]');
  }

  async getTitle(): Promise<string> {
    await this.root.waitForDisplayed();

    const paragraphs = await this.root.$$('p');

    for (const p of paragraphs) {
      const text = (await p.getText()).trim();

      if (text && !text.includes('$') && !text.toLowerCase().startsWith('or')) {
        return text;
      }
    }

    throw new Error('ProductCard: title not found');
  }

  async addToCart(): Promise<void> {
    await this.root.waitForDisplayed();

    const btn = await this.addToCartButton;
    await btn.scrollIntoView();
    await btn.waitForClickable();
    await btn.click();
  }
}
