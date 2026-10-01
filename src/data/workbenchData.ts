export interface TableRow {
  [key: string]: any;
}

export interface RelationalTable {
  name: string;
  columns: { name: string; type: string; key?: 'PK' | 'FK' | 'IDX'; description: string }[];
  rows: TableRow[];
}

export interface SqlPreset {
  id: string;
  name: string;
  category: 'Joins' | 'Aggregations' | 'Window/Subquery' | 'Transactions';
  sql: string;
  description: string;
  explainPlan: {
    selectType: string;
    table: string;
    type: string;
    possibleKeys: string;
    keyUsed: string;
    rowsExamined: number;
    extra: string;
    cost: string;
  }[];
}

export const SAMPLE_DATABASE: Record<string, RelationalTable> = {
  customers: {
    name: 'customers',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary auto-increment identifier' },
      { name: 'name', type: 'VARCHAR(100)', description: 'Customer legal or contact name' },
      { name: 'email', type: 'VARCHAR(150)', key: 'IDX', description: 'Unique customer email (Indexed)' },
      { name: 'tier', type: 'ENUM', description: 'Enterprise, Pro, Standard' },
      { name: 'country', type: 'VARCHAR(50)', description: 'Customer billing region' },
      { name: 'created_at', type: 'DATETIME', description: 'Account creation timestamp' },
    ],
    rows: [
      { id: 101, name: 'Acme Logistics Corp', email: 'ops@acmelogistics.com', tier: 'Enterprise', country: 'United States', created_at: '2023-01-15 10:20:00' },
      { id: 102, name: 'Starlight Retailers', email: 'buyer@starlight.io', tier: 'Pro', country: 'Germany', created_at: '2023-03-22 14:45:00' },
      { id: 103, name: 'Vertex Health Systems', email: 'procurement@vertex.org', tier: 'Enterprise', country: 'United Kingdom', created_at: '2023-04-10 09:12:00' },
      { id: 104, name: 'Nova Dynamics', email: 'it@novadynamics.co', tier: 'Standard', country: 'Canada', created_at: '2023-07-01 16:30:00' },
      { id: 105, name: 'Kigali Tech Hub', email: 'admin@kigalitech.rw', tier: 'Enterprise', country: 'Rwanda', created_at: '2023-08-19 11:00:00' },
      { id: 106, name: 'Helios Media Group', email: 'finance@heliosmedia.fr', tier: 'Pro', country: 'France', created_at: '2023-11-05 13:15:00' },
    ],
  },
  products: {
    name: 'products',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary product SKU ID' },
      { name: 'name', type: 'VARCHAR(120)', description: 'Product title' },
      { name: 'sku', type: 'VARCHAR(50)', key: 'IDX', description: 'Unique stock keeping unit' },
      { name: 'price', type: 'DECIMAL(10,2)', description: 'Unit selling price (USD)' },
      { name: 'stock_quantity', type: 'INT', description: 'Available warehouse inventory' },
      { name: 'category', type: 'VARCHAR(60)', description: 'Hardware, Cloud, Telemetry' },
    ],
    rows: [
      { id: 501, name: 'High-Throughput Gateway v2', sku: 'GTW-900', price: 450.00, stock_quantity: 84, category: 'Hardware' },
      { id: 502, name: 'Spatial Sensor Node LTE-M', sku: 'SNS-204', price: 125.50, stock_quantity: 190, category: 'Telemetry' },
      { id: 503, name: 'Enterprise Cluster License (Annual)', sku: 'LIC-ENT-YR', price: 2400.00, stock_quantity: 999, category: 'Cloud' },
      { id: 504, name: 'Edge Micro-Server Rack unit', sku: 'SRV-EDG-4U', price: 1850.00, stock_quantity: 12, category: 'Hardware' },
      { id: 505, name: 'Sub-meter GNSS Receiver', sku: 'GPS-RTK-01', price: 680.00, stock_quantity: 45, category: 'Telemetry' },
      { id: 506, name: 'High-Speed NVMe Storage Module', sku: 'STO-NVME-2T', price: 290.00, stock_quantity: 6, category: 'Hardware' },
    ],
  },
  orders: {
    name: 'orders',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Unique order ID' },
      { name: 'customer_id', type: 'INT', key: 'FK', description: 'Foreign key -> customers.id' },
      { name: 'order_number', type: 'VARCHAR(30)', key: 'IDX', description: 'Order reference number' },
      { name: 'status', type: 'ENUM', description: 'PAID, SHIPPED, PROCESSING, PENDING' },
      { name: 'total_amount', type: 'DECIMAL(10,2)', description: 'Sum total of order line items' },
      { name: 'created_at', type: 'DATETIME', key: 'IDX', description: 'Order placement timestamp' },
    ],
    rows: [
      { id: 1001, customer_id: 101, order_number: 'ORD-2024-001', status: 'SHIPPED', total_amount: 3250.00, created_at: '2024-02-14 09:30:00' },
      { id: 1002, customer_id: 103, order_number: 'ORD-2024-002', status: 'PAID', total_amount: 7200.00, created_at: '2024-02-18 11:20:00' },
      { id: 1003, customer_id: 102, order_number: 'ORD-2024-003', status: 'PROCESSING', total_amount: 875.00, created_at: '2024-02-20 16:40:00' },
      { id: 1004, customer_id: 105, order_number: 'ORD-2024-004', status: 'SHIPPED', total_amount: 4900.00, created_at: '2024-02-22 08:15:00' },
      { id: 1005, customer_id: 101, order_number: 'ORD-2024-005', status: 'PAID', total_amount: 5550.00, created_at: '2024-02-25 14:10:00' },
      { id: 1006, customer_id: 104, order_number: 'ORD-2024-006', status: 'PENDING', total_amount: 1850.00, created_at: '2024-02-26 10:00:00' },
      { id: 1007, customer_id: 106, order_number: 'ORD-2024-007', status: 'SHIPPED', total_amount: 2710.00, created_at: '2024-02-27 15:55:00' },
    ],
  },
  order_items: {
    name: 'order_items',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Line item primary ID' },
      { name: 'order_id', type: 'INT', key: 'FK', description: 'Foreign key -> orders.id' },
      { name: 'product_id', type: 'INT', key: 'FK', description: 'Foreign key -> products.id' },
      { name: 'quantity', type: 'INT', description: 'Units purchased' },
      { name: 'unit_price', type: 'DECIMAL(10,2)', description: 'Snapshot price at purchase' },
    ],
    rows: [
      { id: 1, order_id: 1001, product_id: 501, quantity: 4, unit_price: 450.00 },
      { id: 2, order_id: 1001, product_id: 502, quantity: 10, unit_price: 125.00 },
      { id: 3, order_id: 1002, product_id: 503, quantity: 3, unit_price: 2400.00 },
      { id: 4, order_id: 1003, product_id: 502, quantity: 7, unit_price: 125.00 },
      { id: 5, order_id: 1004, product_id: 503, quantity: 2, unit_price: 2400.00 },
      { id: 6, order_id: 1004, product_id: 502, quantity: 8, unit_price: 125.00 },
      { id: 7, order_id: 1005, product_id: 504, quantity: 3, unit_price: 1850.00 },
      { id: 8, order_id: 1006, product_id: 504, quantity: 1, unit_price: 1850.00 },
      { id: 9, order_id: 1007, product_id: 505, quantity: 3, unit_price: 680.00 },
      { id: 10, order_id: 1007, product_id: 506, quantity: 2, unit_price: 290.00 },
    ],
  },
};

export const SQL_PRESETS: SqlPreset[] = [
  {
    id: 'customer-ltv',
    name: 'Customer Lifetime Value (LTV) & Order Frequency',
    category: 'Joins',
    description: 'Calculates total spend, order count, and average order value per client using INNER JOIN and GROUP BY.',
    sql: `SELECT 
  c.id AS customer_id,
  c.name AS customer_name,
  c.tier,
  COUNT(o.id) AS total_orders,
  ROUND(SUM(o.total_amount), 2) AS total_spent,
  ROUND(AVG(o.total_amount), 2) AS avg_order_value
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
WHERE o.status IN ('PAID', 'SHIPPED')
GROUP BY c.id, c.name, c.tier
ORDER BY total_spent DESC;`,
    explainPlan: [
      {
        selectType: 'SIMPLE',
        table: 'o (orders)',
        type: 'index_merge',
        possibleKeys: 'fk_orders_customer, idx_orders_status',
        keyUsed: 'idx_orders_status',
        rowsExamined: 6,
        extra: 'Using intersect(idx_orders_status); Using where',
        cost: '1.25',
      },
      {
        selectType: 'SIMPLE',
        table: 'c (customers)',
        type: 'eq_ref',
        possibleKeys: 'PRIMARY',
        keyUsed: 'PRIMARY',
        rowsExamined: 1,
        extra: 'Using where',
        cost: '0.35',
      },
    ],
  },
  {
    id: 'inventory-reorder-alert',
    name: 'Low Stock Critical Threshold & Reorder Exposure',
    category: 'Aggregations',
    description: 'Finds products where stock is below 20 units and calculates potential lost revenue.',
    sql: `SELECT 
  p.id AS sku_id,
  p.name AS product_name,
  p.category,
  p.stock_quantity,
  p.price,
  CASE 
    WHEN p.stock_quantity <= 10 THEN 'CRITICAL'
    WHEN p.stock_quantity <= 25 THEN 'WARNING'
    ELSE 'HEALTHY'
  END AS inventory_health,
  ROUND(p.stock_quantity * p.price, 2) AS current_inventory_value
FROM products p
WHERE p.stock_quantity < 50
ORDER BY p.stock_quantity ASC;`,
    explainPlan: [
      {
        selectType: 'SIMPLE',
        table: 'p (products)',
        type: 'range',
        possibleKeys: 'idx_products_stock',
        keyUsed: 'idx_products_stock',
        rowsExamined: 3,
        extra: 'Using index condition; Using filesort',
        cost: '0.85',
      },
    ],
  },
  {
    id: 'order-line-item-deep-dive',
    name: 'Detailed Order Line Item Breakdown & Margin',
    category: 'Joins',
    description: 'Deep dive joining 3 tables: Orders, Order Items, and Products to show line item fulfillment.',
    sql: `SELECT 
  o.order_number,
  o.status,
  c.name AS customer_name,
  p.name AS item_purchased,
  oi.quantity,
  oi.unit_price,
  ROUND(oi.quantity * oi.unit_price, 2) AS line_subtotal
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
ORDER BY o.id DESC, oi.id ASC
LIMIT 10;`,
    explainPlan: [
      {
        selectType: 'SIMPLE',
        table: 'o (orders)',
        type: 'ALL',
        possibleKeys: 'PRIMARY, fk_orders_customer',
        keyUsed: 'PRIMARY',
        rowsExamined: 7,
        extra: 'Using temporary; Using filesort',
        cost: '2.10',
      },
      {
        selectType: 'SIMPLE',
        table: 'c (customers)',
        type: 'eq_ref',
        possibleKeys: 'PRIMARY',
        keyUsed: 'PRIMARY',
        rowsExamined: 1,
        extra: '',
        cost: '0.35',
      },
      {
        selectType: 'SIMPLE',
        table: 'oi (order_items)',
        type: 'ref',
        possibleKeys: 'fk_order_items_order',
        keyUsed: 'fk_order_items_order',
        rowsExamined: 2,
        extra: '',
        cost: '0.70',
      },
    ],
  },
  {
    id: 'atomic-transaction-simulation',
    name: 'ACID Transaction Simulation (Row Lock & Atomic Commit)',
    category: 'Transactions',
    description: 'Simulates InnoDB isolation level REPEATABLE READ with SELECT ... FOR UPDATE to eliminate concurrency race conditions.',
    sql: `START TRANSACTION;

-- 1. Acquire exclusive write-lock on SKU 504 (Edge Micro-Server)
SELECT id, name, stock_quantity, price 
FROM products 
WHERE id = 504 
FOR UPDATE;

-- 2. Deduct inventory if stock >= requested (2 units)
UPDATE products 
SET stock_quantity = stock_quantity - 2 
WHERE id = 504 AND stock_quantity >= 2;

-- 3. Insert guaranteed order record
INSERT INTO orders (customer_id, order_number, status, total_amount, created_at)
VALUES (105, 'ORD-TX-9901', 'PAID', 3700.00, NOW());

COMMIT;`,
    explainPlan: [
      {
        selectType: 'TRANSACTION_ISOLATION',
        table: 'InnoDB Engine',
        type: 'REPEATABLE_READ',
        possibleKeys: 'Row-Level Locks',
        keyUsed: 'PRIMARY Key Mutex',
        rowsExamined: 1,
        extra: 'Lock wait timeout = 5s; Deadlock detection: ACTIVE',
        cost: '0.00',
      },
    ],
  },
];

export interface ApiEndpoint {
  method: 'GET' | 'POST';
  path: string;
  name: string;
  description: string;
  requestBody?: Record<string, any>;
  responsePayload: Record<string, any>;
  sqlGenerated: string;
  statusCode: number;
}

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/v1/orders/summary?status=SHIPPED',
    name: 'Get Shipped Orders Summary',
    description: 'Queries MySQL with composite index and returns customer-enriched order summaries with calculation aggregates.',
    responsePayload: {
      status: 'success',
      meta: {
        timestamp: '2026-09-25T06:41:00Z',
        executionTimeMs: 14.2,
        poolConnection: 'active-worker-3',
      },
      data: {
        count: 3,
        totalRevenue: 10860.00,
        orders: [
          { orderNumber: 'ORD-2024-001', customer: 'Acme Logistics Corp', total: 3250.00, status: 'SHIPPED' },
          { orderNumber: 'ORD-2024-004', customer: 'Kigali Tech Hub', total: 4900.00, status: 'SHIPPED' },
          { orderNumber: 'ORD-2024-007', customer: 'Helios Media Group', total: 2710.00, status: 'SHIPPED' },
        ],
      },
    },
    sqlGenerated: `SELECT o.order_number, c.name AS customer_name, o.total_amount, o.status 
FROM orders o 
INNER JOIN customers c ON o.customer_id = c.id 
WHERE o.status = 'SHIPPED' 
ORDER BY o.created_at DESC;`,
    statusCode: 200,
  },
  {
    method: 'POST',
    path: '/api/v1/orders/checkout',
    name: 'Execute Atomic Checkout',
    description: 'Executes an atomic checkout inside a MySQL transaction with row-level locks and automatic inventory deduction.',
    requestBody: {
      customerId: 101,
      items: [
        { productId: 501, quantity: 2 },
        { productId: 506, quantity: 1 },
      ],
      paymentToken: 'tok_live_9921_secured',
    },
    responsePayload: {
      status: 'success',
      message: 'Transaction committed successfully with ACID guarantees',
      data: {
        orderId: 1008,
        orderNumber: 'ORD-2026-1008',
        status: 'PAID',
        itemsProcessed: 2,
        totalCharged: 1190.00,
        inventoryUpdated: true,
      },
      telemetry: {
        lockWaitMs: 0.8,
        totalDurationMs: 24.5,
      },
    },
    sqlGenerated: `START TRANSACTION;
SELECT stock_quantity FROM products WHERE id IN (501, 506) FOR UPDATE;
UPDATE products SET stock_quantity = stock_quantity - 2 WHERE id = 501;
UPDATE products SET stock_quantity = stock_quantity - 1 WHERE id = 506;
INSERT INTO orders (customer_id, order_number, status, total_amount) VALUES (101, 'ORD-2026-1008', 'PAID', 1190.00);
COMMIT;`,
    statusCode: 201,
  },
  {
    method: 'GET',
    path: '/api/v1/mysql/pool-metrics',
    name: 'MySQL Connection Pool Diagnostics',
    description: 'Real-time telemetry from Node.js mysql2 connection pool manager.',
    responsePayload: {
      status: 'healthy',
      engine: 'MySQL 8.0.36 Community (InnoDB)',
      poolConfig: {
        connectionLimit: 30,
        waitForConnections: true,
        queueLimit: 0,
        idleTimeoutMs: 60000,
      },
      currentMetrics: {
        activeConnections: 4,
        idleConnections: 16,
        totalCreated: 20,
        queuedRequests: 0,
        averageAcquisitionTimeMs: 1.15,
        p99LatencyMs: 38.2,
      },
      statusCheck: 'OPTIMAL',
    },
    sqlGenerated: `SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Innodb_buffer_pool_read_requests';
SHOW STATUS LIKE 'Slow_queries';`,
    statusCode: 200,
  },
];
