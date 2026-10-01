export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Backend API' | 'Database Architecture' | 'Developer Tools';
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  architectureOverview: string;
  schemaHighlights: string[];
  sampleCodeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
  demoUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; proficiency: number; experience: string; note: string }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Aristide Manzi',
    title: 'Full-Stack Software Engineer',
    specialty: 'React · Node.js · MySQL Relational Systems',
    bio: 'Software engineer focused on architecting resilient web applications, robust Node.js backend services, and high-performance MySQL databases. Passionate about clean code, normalized relational schemas, and ergonomic user interfaces.',
    email: 'alistidemanzi@gmail.com',
    location: 'Available Globally / Remote',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    status: 'Open to High-Impact Full-Time & Contract Roles',
    avatar: '/src/assets/images/avatar_aristide_engineer_1790343721809.jpg',
  },
  stats: [
    { value: '5+', label: 'Years Engineering Experience', detail: 'Designing production full-stack systems' },
    { value: '99.98%', label: 'Service Uptime Record', detail: 'Across high-traffic Node microservices' },
    { value: '<45ms', label: 'Average MySQL Query p95', detail: 'Optimized through composite B-Tree indexes' },
    { value: '40+', label: 'Shipped Production Endpoints', detail: 'With strict schema validation & ACID guarantees' },
  ],
  skills: [
    {
      title: 'Frontend Engineering',
      description: 'Building accessible, fast, and responsive user interfaces with modern React paradigms.',
      skills: [
        { name: 'React 19 & Next.js', proficiency: 96, experience: '4+ yrs', note: 'Hooks, Suspense, Server Actions, Virtual DOM' },
        { name: 'TypeScript', proficiency: 94, experience: '4+ yrs', note: 'Strict typing, Generics, Discriminated Unions' },
        { name: 'Tailwind CSS', proficiency: 98, experience: '4+ yrs', note: 'Zero-runtime utility design, responsive systems' },
        { name: 'State Management', proficiency: 90, experience: '4 yrs', note: 'Zustand, TanStack Query, Context API' },
        { name: 'Web Performance & A11y', proficiency: 88, experience: '3+ yrs', note: 'Core Web Vitals, WCAG AA, bundle optimization' },
      ],
    },
    {
      title: 'Backend & APIs',
      description: 'Designing high-throughput, secure, and observable RESTful & real-time backends in Node.js.',
      skills: [
        { name: 'Node.js & Express', proficiency: 95, experience: '5+ yrs', note: 'Event loop tuning, async patterns, middleware pipelines' },
        { name: 'REST API Architecture', proficiency: 96, experience: '5+ yrs', note: 'Idempotency, versioning, OpenAPI/Swagger, rate limiting' },
        { name: 'Authentication & Security', proficiency: 92, experience: '4 yrs', note: 'JWT, OAuth2, Argon2 hashing, CORS, RBAC' },
        { name: 'Worker Queues & Streams', proficiency: 87, experience: '3 yrs', note: 'BullMQ, Node Stream API, backpressure handling' },
        { name: 'WebSockets & Real-time', proficiency: 85, experience: '3 yrs', note: 'Socket.io, Server-Sent Events (SSE), event emitter' },
      ],
    },
    {
      title: 'Relational Database & MySQL',
      description: 'Mastery over schema design, transaction isolation levels, indexing, and query optimization.',
      skills: [
        { name: 'MySQL 8.0 & SQL Mastery', proficiency: 95, experience: '5+ yrs', note: 'Complex JOINs, subqueries, CTEs, Window Functions' },
        { name: 'Index Optimization', proficiency: 94, experience: '4+ yrs', note: 'B-Tree indexes, composite keys, EXPLAIN ANALYZE' },
        { name: 'ACID & Transactions', proficiency: 92, experience: '4 yrs', note: 'InnoDB engine, row-level locks, dead-lock prevention' },
        { name: 'Database Normalization', proficiency: 96, experience: '5 yrs', note: '3NF schema design, foreign keys, cascade constraints' },
        { name: 'Connection Pooling & Caching', proficiency: 90, experience: '4 yrs', note: 'Generic-pool, mysql2 pool, Redis query caching' },
      ],
    },
    {
      title: 'DevOps & System Architecture',
      description: 'Packaging, deploying, and maintaining continuous delivery pipelines and containerized apps.',
      skills: [
        { name: 'Docker & Compose', proficiency: 90, experience: '3+ yrs', note: 'Multi-stage builds, isolated dev environments' },
        { name: 'Git & GitHub Actions', proficiency: 92, experience: '5 yrs', note: 'Automated CI/CD workflows, semantic release, PR checks' },
        { name: 'Linux / Bash Scripting', proficiency: 86, experience: '4 yrs', note: 'Server management, systemd, log inspection' },
        { name: 'Nginx & Reverse Proxies', proficiency: 88, experience: '3 yrs', note: 'SSL termination, gzip, load balancing, proxy pass' },
        { name: 'Testing & QA', proficiency: 89, experience: '4 yrs', note: 'Jest, Supertest, Vitest, integration tests' },
      ],
    },
  ] as SkillCategory[],
  projects: [
    {
      id: 'scale-commerce',
      title: 'ScaleCommerce Engine',
      subtitle: 'High-Concurrency E-Commerce Order & Inventory Pipeline',
      category: 'Full-Stack',
      description: 'Distributed commerce engine processing real-time checkouts with MySQL ACID transaction safety, connection pooling, and a dynamic React dashboard.',
      longDescription: 'ScaleCommerce was engineered to solve race conditions during flash sales. By implementing InnoDB row-level locking (`SELECT ... FOR UPDATE`), transaction isolation, and connection pool clustering in Node.js, the system successfully eliminated double-booking while sustaining 1,800+ requests/sec with sub-50ms p95 latency.',
      image: '/src/assets/images/project_scale_commerce_1790343737406.jpg',
      technologies: ['React 19', 'Node.js', 'Express', 'MySQL 8.0', 'Redis', 'Tailwind CSS', 'Docker'],
      metrics: [
        { label: 'Throughput', value: '1,850 req/sec' },
        { label: 'Query Latency (p95)', value: '38ms' },
        { label: 'Zero Over-Sells', value: '100% ACID' },
        { label: 'Checkout Time', value: '-62% vs legacy' },
      ],
      architectureOverview: 'Client React app talks to an Express API gateway with rate-limiting. Inventory updates run inside MySQL atomic transactions with row locks, backed by a Redis read-through cache for product catalogs.',
      schemaHighlights: [
        'Normalized 3NF relational structure (orders, order_items, products, inventory_pools)',
        'Composite B-Tree index on (customer_id, created_at) for 4ms customer order history lookups',
        'Foreign key cascade constraints maintaining referential integrity with audit log triggers',
      ],
      sampleCodeSnippet: {
        filename: 'orderService.ts',
        language: 'typescript',
        code: `// Atomic checkout transaction handling race conditions in Node + MySQL
export async function processCheckout(userId: string, items: CartItem[]) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Lock and verify inventory rows to prevent race condition over-selling
    for (const item of items) {
      const [rows] = await connection.execute(
        \`SELECT stock_quantity FROM products WHERE id = ? FOR UPDATE\`,
        [item.productId]
      );
      if (!rows[0] || rows[0].stock_quantity < item.quantity) {
        throw new Error(\`Insufficient inventory for SKU: \${item.productId}\`);
      }
    }

    // 2. Decrement stock atomically
    for (const item of items) {
      await connection.execute(
        \`UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?\`,
        [item.quantity, item.productId]
      );
    }

    // 3. Create order header and line items
    const [orderResult] = await connection.execute(
      \`INSERT INTO orders (user_id, status, total_amount) VALUES (?, 'CONFIRMED', ?)\`,
      [userId, calculateTotal(items)]
    );

    await connection.commit();
    return { orderId: orderResult.insertId, status: 'SUCCESS' };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}`,
      },
      demoUrl: '#interactive-lab',
      githubUrl: 'https://github.com',
    },
    {
      id: 'nexus-crm',
      title: 'NexusRelational CRM',
      subtitle: 'Multi-Tenant Sales Pipeline & Analytical Reporting',
      category: 'Enterprise Application',
      description: 'Enterprise CRM web application handling multi-tenant sales pipelines, contact interaction graphs, and dynamic reporting powered by indexed MySQL queries.',
      longDescription: 'NexusRelational provides sales teams with real-time pipeline velocity metrics and relationship timeline histories. The backend utilizes complex SQL window functions, CTEs (Common Table Expressions), and JSON aggregation to generate live pipeline forecasts directly in the database layer, drastically reducing Node server memory overhead.',
      image: '/src/assets/images/project_mysql_engine_1790343749840.jpg',
      technologies: ['React', 'TypeScript', 'Node.js', 'MySQL 8.0', 'Tailwind CSS', 'Chart.js'],
      metrics: [
        { label: 'Active Contacts', value: '120,000+' },
        { label: 'Report Generation', value: '180ms avg' },
        { label: 'Storage Footprint', value: '-35% normalized' },
        { label: 'Tenants Supported', value: '500+ orgs' },
      ],
      architectureOverview: 'Multi-tenant architecture with tenant isolation keys, composite primary indexes, and automated weekly partition rotations for historical communication logs.',
      schemaHighlights: [
        'CTEs for multi-touch attribution and deal stage velocity calculation',
        'Partitioned audit_logs table by RANGE (YEAR(created_at)) for fast analytical maintenance',
        'Strict RBAC enforcement at both API middleware and SQL row-security layers',
      ],
      sampleCodeSnippet: {
        filename: 'pipelineAnalytics.sql',
        language: 'sql',
        code: `-- High-performance deal stage velocity using CTE and Window Functions in MySQL 8.0
WITH DealMovements AS (
  SELECT 
    d.id AS deal_id,
    d.title,
    d.amount,
    h.stage_name,
    h.changed_at,
    LAG(h.changed_at) OVER (
      PARTITION BY d.id ORDER BY h.changed_at
    ) AS previous_stage_time
  FROM deals d
  INNER JOIN deal_stage_history h ON d.id = h.deal_id
  WHERE d.tenant_id = :tenantId
)
SELECT 
  stage_name,
  COUNT(DISTINCT deal_id) AS total_deals,
  ROUND(AVG(TIMESTAMPDIFF(HOUR, previous_stage_time, changed_at)), 1) AS avg_hours_in_stage,
  SUM(amount) AS pipeline_value
FROM DealMovements
WHERE previous_stage_time IS NOT NULL
GROUP BY stage_name
ORDER BY avg_hours_in_stage ASC;`,
      },
      demoUrl: '#interactive-lab',
      githubUrl: 'https://github.com',
    },
    {
      id: 'logitrace-fleet',
      title: 'LogiTrace Fleet & Telemetry API',
      subtitle: 'Real-Time Spatial Tracking & Warehouse Logistics Service',
      category: 'Backend API',
      description: 'Distributed Node.js telemetry ingestion service utilizing MySQL Spatial indexes (ST_Distance_Sphere) to calculate geofencing, route deviations, and delivery ETAs.',
      longDescription: 'LogiTrace tracks moving cargo across hundreds of distribution hubs. By leveraging MySQL spatial data types (POINT, POLYGON) with Spatial Indexes, proximity and boundary breach queries run in milliseconds without relying on external GIS servers.',
      image: '/src/assets/images/project_fleet_api_1790343762393.jpg',
      technologies: ['Node.js', 'Express', 'MySQL Spatial', 'React', 'Tailwind CSS', 'WebSockets'],
      metrics: [
        { label: 'Telemetry Ingest', value: '4,500 events/sec' },
        { label: 'Spatial Query Latency', value: '18ms' },
        { label: 'Geofence Checks', value: 'Real-time' },
        { label: 'Active Vehicles', value: '1,200 fleet' },
      ],
      architectureOverview: 'UDP/HTTP ingestion workers batch telematics into memory, flushing in chunks to MySQL using multi-row INSERTs to minimize disk I/O and transaction lock duration.',
      schemaHighlights: [
        'SPATIAL INDEX on location_point for sub-20ms bounding-box vehicle searches',
        'Batch ingestion pipeline with transactional staging tables',
        'Automatic alert dispatching on geofence entry/exit events',
      ],
      sampleCodeSnippet: {
        filename: 'spatialQuery.ts',
        language: 'typescript',
        code: `// Finding nearest active logistics hubs within radius using MySQL Spatial functions
export async function findNearbyHubs(longitude: number, latitude: number, radiusKm: number) {
  const query = \`
    SELECT 
      hub_id,
      hub_name,
      ST_X(coordinates) AS lng,
      ST_Y(coordinates) AS lat,
      ROUND(ST_Distance_Sphere(coordinates, POINT(?, ?)) / 1000, 2) AS distance_km
    FROM logistics_hubs
    WHERE ST_Distance_Sphere(coordinates, POINT(?, ?)) <= ? * 1000
    ORDER BY distance_km ASC
    LIMIT 10;
  \`;

  const [results] = await pool.execute(query, [
    longitude, latitude,
    longitude, latitude,
    radiusKm
  ]);

  return results;
}`,
      },
      demoUrl: '#interactive-lab',
      githubUrl: 'https://github.com',
    },
    {
      id: 'devquery-studio',
      title: 'DevQuery SQL Studio',
      subtitle: 'Visual Query Planner & MySQL Index Advisor for Node Developers',
      category: 'Developer Tools',
      description: 'Developer workspace that parses MySQL EXPLAIN queries, visualizes table vs index scans, and recommends composite index keys for Node.js ORMs and raw queries.',
      longDescription: 'DevQuery was built to bridge the gap between application code and database performance. It inspects raw queries, identifies N+1 antipatterns and missing indexes, and renders visual bottleneck heatmaps for developers writing backend queries.',
      image: '/src/assets/images/project_mysql_engine_1790343749840.jpg',
      technologies: ['React 19', 'TypeScript', 'Node.js', 'MySQL Parser', 'Tailwind CSS'],
      metrics: [
        { label: 'Queries Analyzed', value: '50,000+' },
        { label: 'Indexing Accuracies', value: '98%' },
        { label: 'Latency Cut', value: 'Up to 90%' },
        { label: 'Client Bundle', value: 'Zero bloat' },
      ],
      architectureOverview: 'Client-side AST parser paired with server-side query profiling sandbox that safely explains query plans without running destructive DML statements.',
      schemaHighlights: [
        'Dynamic query plan tree graph generator',
        'Composite index order advisor prioritizing equality then range predicates',
        'Cost estimation and temporary table creation warning system',
      ],
      demoUrl: '#interactive-lab',
      githubUrl: 'https://github.com',
    },
  ] as Project[],
  experiences: [
    {
      role: 'Senior Full-Stack Software Engineer',
      company: 'Apex Cloud Solutions',
      location: 'Remote',
      period: '2023 — Present',
      summary: 'Leading development of scalable web applications, Node microservices, and database tuning for high-traffic SaaS products.',
      achievements: [
        'Architected core transactional checkout and billing service using Node.js and MySQL, sustaining 250k+ daily transactions with 99.99% uptime.',
        'Audited and refactored relational database schemas; added composite B-Tree indexes and materialized views, dropping p95 query latency by 45%.',
        'Standardized frontend architecture with React 19, TypeScript, and a unified Tailwind CSS component library used by 18 engineers.',
        'Mentored junior engineers on SQL query profiling, transaction isolation safety, and clean API design principles.',
      ],
      stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MySQL 8.0', 'Redis', 'Docker', 'Tailwind CSS'],
    },
    {
      role: 'Full-Stack Software Engineer',
      company: 'Nexus Tech Systems',
      location: 'Hybrid',
      period: '2021 — 2023',
      summary: 'Developed real-time customer engagement pipelines and internal analytics tools using modern JavaScript/TypeScript stacks.',
      achievements: [
        'Engineered responsive React single-page applications with real-time WebSocket feeds and stateful workflow management.',
        'Built secure RESTful APIs in Node.js with JWT authentication, role-based access control (RBAC), and strict input validation.',
        'Migrated fragmented legacy data stores into a normalized MySQL relational architecture with zero downtime and automated rollback scripts.',
        'Introduced end-to-end integration testing using Supertest and Jest, elevating test coverage from 42% to 88%.',
      ],
      stack: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS', 'Jest', 'Git'],
    },
    {
      role: 'Software Engineer & Database Developer',
      company: 'DataCore Labs',
      location: 'On-site',
      period: '2019 — 2021',
      summary: 'Collaborated on database architecture, web portals, and API integrations for enterprise logistics clients.',
      achievements: [
        'Designed relational schemas in 3NF for logistics tracking, order fulfillment, and client billing.',
        'Created customer-facing portal components in React with Tailwind CSS, improving mobile conversion rates by 28%.',
        'Authored optimized MySQL stored procedures and scheduled event triggers for end-of-day reconciliation reports.',
      ],
      stack: ['React', 'JavaScript', 'Node.js', 'MySQL', 'HTML5/CSS3', 'REST APIs'],
    },
  ] as Experience[],
  education: [
    {
      degree: 'B.S. in Computer Science / Software Engineering',
      institution: 'University School of Computing & Technology',
      year: 'Graduated with Honors',
      details: 'Focus on Distributed Systems, Relational Database Theory, Algorithms & Data Structures, and Software Architecture.',
    },
  ],
  certifications: [
    { name: 'MySQL Certified Database Developer', issuer: 'Oracle / MySQL', year: '2023' },
    { name: 'Node.js Application Developer Certification', issuer: 'OpenJS Foundation', year: '2022' },
    { name: 'Advanced React & TypeScript Architecture', issuer: 'Frontend Masters', year: '2023' },
  ],
};
