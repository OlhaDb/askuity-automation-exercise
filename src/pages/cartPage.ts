class CartPage {
  private get closeCartButton() {
    return $('//span[normalize-space()="Cart"]/preceding::button[1]');
  }

  private get cartItemsBadge() {
    return $('//span[normalize-space()="Cart"]/../div[1]//div');
  }

  private get subtotalValue() {
    return $('(//p[normalize-space()="SUBTOTAL"]/following-sibling::div//p)[1]');
  }

  private get emptyCartMessage() {
    return $('//p[contains(normalize-space(), "Add some products in the cart")]');
  }

  private get removeButtons() {
    return $$('button[title="remove product from cart"]');
  }

  private plusButtonFor(productName: string) {
    return $(
      `//p[normalize-space()="${productName}"]/ancestor::*[.//button[@title="remove product from cart"]][1]//button[normalize-space()="+"]`,
    );
  }

  private quantityLabelFor(productName: string) {
    return $(
      `//p[normalize-space()="${productName}"]/ancestor::*[.//button[@title="remove product from cart"]][1]//p[contains(normalize-space(),"Quantity")]`,
    );
  }

  async getDistinctItemsCount(): Promise<number> {
    const buttons = await this.removeButtons;
    return buttons.length;
  }

  async closeCart(): Promise<void> {
    await this.closeCartButton.waitForClickable();
    await this.closeCartButton.click();
  }

  async increaseQuantity(productName: string, times: number): Promise<void> {
    const plus = await this.plusButtonFor(productName);
    const qtyEl = await this.quantityLabelFor(productName);

    await plus.waitForClickable();

    for (let i = 0; i < times; i++) {
      const before = await qtyEl.getText();
      await plus.click();
      await browser.waitUntil(async () => (await qtyEl.getText()) !== before);
    }
  }

  async getItemQuantity(productName: string): Promise<number> {
    const qtyEl = await this.quantityLabelFor(productName);
    await qtyEl.waitForDisplayed();

    const text = await qtyEl.getText();
    const match = text.match(/Quantity[^0-9]*(\d+)/);

    if (!match) {
      throw new Error(`Cannot parse quantity from "${text}"`);
    }

    return Number(match[1]);
  }

  async getTotalItemsInCart(): Promise<number> {
    await this.cartItemsBadge.waitForDisplayed();

    const text = (await this.cartItemsBadge.getText()).trim();
    const match = text.match(/\d+/);

    if (!match) {
      throw new Error(`Cannot parse total items badge from "${text}"`);
    }

    return Number(match[0]);
  }

  async getSubtotal(): Promise<number> {
    await this.subtotalValue.waitForDisplayed();

    const text = await this.subtotalValue.getText();
    return Number(text.replace(/[^0-9.]/g, ''));
  }

  async clearCart(): Promise<void> {
    let buttons = await this.removeButtons;
    let count = (buttons as any).length;

    while (count > 0) {
      await buttons[0].waitForClickable();
      await buttons[0].click();

      await browser.waitUntil(async () => {
        const currentButtons = await this.removeButtons;
        return (currentButtons as any).length < count;
      });

      buttons = await this.removeButtons;
      count = (buttons as any).length;
    }
  }

  async isEmptyCartMessageDisplayed(): Promise<boolean> {
    await this.emptyCartMessage.waitForDisplayed();
    return this.emptyCartMessage.isDisplayed();
  }
}

export default new CartPage();
