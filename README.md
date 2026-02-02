# WebdriverIO E2E Test Framework

This project contains end-to-end tests written using WebdriverIO for the e-commerce application at https://automation-interview.vercel.app/

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher, which includes npm)

## Setup

1.  **Clone the repository:**

```bash
    git clone <repository-url>
```

2.  **Navigate to the project directory:**

```bash
    cd interview_framework
```

3.  **Install the dependencies:**

```bash
    npm install
```

## Running the Tests

To run the tests, execute the following command from the root of the project:

```bash
npm run wdio
```

This command will start the WebdriverIO test runner, which will execute the spec files located in the `src/specs` directory.

---

## Test Cases

### **HIGH PRIORITY**

#### **TC-01: Sizes filter block validation**

**Description:** Verify that the Sizes filter block is displayed correctly and contains all expected elements.

**Preconditions:** Application is loaded successfully.

**Steps:**

1. Open the application URL
2. Locate the Sizes filter section in the left sidebar
3. Verify all size options are present

**Expected Result:**

- The "Sizes" title is displayed
- All size options are visible and clickable: XS, S, M, ML, L, XL, XXL

**Priority:** High

---

#### **TC-02: Size filter deselection**

**Description:** Verify size deselection removes the applied filter.

**Preconditions:** A size filter is already applied.

**Steps:**

1. Click the currently selected size option again
2. Observe the size indicator
3. Observe the product grid

**Expected Result:**

- Selected size circle becomes unhighlighted
- Product grid displays all products again
- Product count returns to the original number

**Priority:** High

---

#### **TC-03: Product card content validation**

**Description:** Verify product card displays all required information correctly.

**Preconditions:** Application is loaded with products visible.

**Steps:**

1. Locate the product "Cropped Stay Groovy off white"
2. Verify all product information is displayed

**Expected Result:**
Product card displays:

- Product image
- Product name: "Cropped Stay Groovy off white"
- Price: "$10.90"
- Installment text: "or 9 x $1.21"
- "Add to cart" button
- Free shipping label (if applicable)

**Priority:** High

---

#### **TC-04: Cart icon initial state**

**Description:** Verify cart icon displays correctly when empty.

**Preconditions:** Application is loaded, no products added to cart.

**Steps:**

1. Locate the cart icon in the top navigation
2. Observe the badge counter on the cart icon

**Expected Result:**

- Cart icon is visible in the header
- Badge displays "0"
- Cart panel is closed by default

**Priority:** High

---

#### **TC-05: Empty cart panel display**

**Description:** Verify empty cart panel content and behavior.

**Preconditions:** Cart is empty.

**Steps:**

1. Click the cart icon to open the panel
2. Observe the cart panel content
3. Click the close button (X) or outside the panel

**Expected Result:**

- Cart panel slides open from the right
- Message "Add some products in the cart :)" is displayed
- No product list is shown
- No subtotal or checkout button
- Panel closes when clicking X or outside the panel

**Priority:** High

---

#### **TC-06: Add single product to cart**

**Description:** Verify adding a product to cart updates all relevant UI elements.

**Preconditions:** Cart is empty.

**Steps:**

1. Note the cart badge count (should be 0)
2. Click "Add to cart" on any product
3. Observe the cart badge
4. Open the cart panel

**Expected Result:**

- Cart badge increments to 1
- Product appears in cart with correct details:
  - Product image
  - Product name
  - Quantity: 1
  - Price per item
- Subtotal shows the product price

**Priority:** High

---

#### **TC-07: Add same product multiple times**

**Description:** Verify adding the same product multiple times increments quantity.

**Preconditions:** Cart is empty.

**Steps:**

1. Add a specific product to cart
2. Add the same product again
3. Open cart panel
4. Check product quantity

**Expected Result:**

- Cart badge reflects total quantity
- Product appears once in cart
- Quantity shows "2" or higher
- Subtotal = price × quantity

**Priority:** High

---

#### **TC-08: Decrease product quantity using minus button**

**Description:** Verify quantity decrease functionality in cart.

**Preconditions:** Product is in cart with quantity > 1.

**Steps:**

1. Open cart panel
2. Note current quantity (e.g., 3)
3. Click the minus (-) button once
4. Observe quantity and subtotal

**Expected Result:**

- Quantity decreases by 1
- Cart badge updates accordingly
- Subtotal recalculates correctly
- Product remains in cart
- Minus button is enabled if quantity > 1
- Minus button is disabled when quantity = 1

**Priority:** High

---

#### **TC-09: Checkout button availability**

**Description:** Verify checkout button behavior.

**Preconditions:** None.

**Steps:**

1. Verify checkout button behavior when cart is empty
2. Add a product to cart
3. Open cart panel
4. Verify checkout button behavior when cart contains items

**Expected Result:**

- Button is enabled and clickable
- Button has clear "Checkout" label

**Priority:** High

---

#### **TC-10: Filter and add to cart workflow**

**Description:** Verify filtering products and adding to cart works seamlessly.

**Preconditions:** Application loaded, cart empty.

**Steps:**

1. Select size filter "M"
2. Add a filtered product to cart
3. Change filter to "L"
4. Add another product
5. Clear filters
6. Open cart

**Expected Result:**

- Both products appear in cart regardless of current filter
- Cart maintains products from different filter states

**Priority:** High

---

### **MEDIUM PRIORITY**

#### **TC-11: Cart panel close with products**

**Description:** Verify closing cart panel doesn't affect cart contents.

**Preconditions:** Products in cart.

**Steps:**

1. Add products to cart
2. Open cart panel
3. Close cart panel using X button
4. Open cart panel again

**Expected Result:**

- Products remain in cart
- Quantities unchanged
- Subtotal consistent
- Cart badge unchanged

**Priority:** Medium

---

#### **TC-12: Browser refresh with items in cart**

**Description:** Verify cart persistence after browser refresh.

**Preconditions:** Products added to cart.

**Steps:**

1. Add multiple products to cart
2. Note cart contents and quantities
3. Refresh browser
4. Check cart state

**Expected Result:**

- If persistence implemented: Cart retains all products
- If not implemented: Cart resets to empty (document expected behavior)
- No console errors
- Application loads successfully

**Priority:** Medium

---

### **LOW PRIORITY**

#### **TC-13: Product image interaction**

**Description:** Verify product image changes on hover.

**Preconditions:** Application is loaded with products visible.

**Steps:**

1. Locate any product card
2. Note the initial product image
3. Hover over the product image
4. Move cursor away from the image

**Expected Result:**

- Product image changes to a different view on hover
- Image returns to original state when hover ends

**Priority:** Low

---

#### **TC-14: Add to cart button hover state**

**Description:** Verify "Add to cart" button visual feedback on hover.

**Preconditions:** Application is loaded with products visible.

**Steps:**

1. Locate any product's "Add to cart" button
2. Hover over the button
3. Move cursor away

**Expected Result:**

- Button background changes to yellow on hover
- Button returns to original state when hover ends
- Cursor changes to pointer on hover

**Priority:** Low

---

#### **TC-15: Maximum quantity handling**

**Description:** Verify system behavior with very high quantities.

**Preconditions:** Product in cart.

**Steps:**

1. Open cart panel
2. Click plus (+) button 50+ times
3. Observe quantity display and performance

**Expected Result:**

- Quantity increases appropriately (or caps at max if limit exists)
- UI remains responsive
- Subtotal calculates correctly
- No browser console errors

**Priority:** Low

**Total:** 15 test cases
