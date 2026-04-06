
## How i handle data from api
### product
After fetching data from the API, I perform an upsert for the product data to ensure that existing records are updated while new ones are inserted.

For product reviews, I use a delete-all-and-insert-from-scratch approach. I chose this method to avoid duplication and maintain database efficiency for the products table.

I opted for this approach for reviews because the current number of reviews is still relatively small. Once the dataset grows to thousands of entries, we can scale and implement a more optimized algorithm to handle the data.


### order

In this system, an order is treated as immutable once created. This means that all order-related data — including order items and other attributes — should not be modified after the order is initially created.

The only field that is allowed to change is the order status.

Therefore, the upsert logic is designed with the following rules:

- Create: Insert a new order with all required data when it does not exist.
- Update: Only update the status field if the order already exists.

This ensures data consistency and prevents unintended modifications to finalized order records.

## Variant Generation Strategy

### order

To generate order variants, a new order will be created on each trigger run.

The data for the new order is derived from an existing order, specifically reusing fields such as user_id and product_id. This approach ensures consistency while allowing the system to simulate or create variations of orders.

For the order_id, a random number is generated using a range between 1 and 100. This is intended to ensure uniqueness within a single process execution, where only one generated ID is expected to be used per run.

This design assumes:

- Each trigger execution creates exactly one new order.
- The randomly generated order_id will not collide within the same process.
- Long-term global uniqueness is not guaranteed and should be handled separately if required.

### product

For products, only minor variations will be introduced. The primary modification applied is to the price, while all other product attributes remain unchanged.


1. fe interagtif
2. more variant