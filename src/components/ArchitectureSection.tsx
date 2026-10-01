import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  RefreshCw,
  Zap,
  Globe,
  HardDrive
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ArchitectureNode {
  id: string;
  name: string;
  tag: string;
  technology: string;
  role: string;
  invariants: string[];
  snippet: string;
}

const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'client',
    name: 'Client Presentation Tier',
    tag: 'Frontend Layer',
    technology: 'React 19 · TypeScript · Tailwind CSS · TanStack Query',
    role: 'Renders accessible, responsive UI with optimistic state updates, client-side route caching, and zero layout shift.',
    invariants: [
      'Strict WCAG AA accessibility compliance and keyboard navigation',
      'Normalized client state with automatic background query refetching',
      'JWT token storage in secure HTTP-only cookies with CSRF defense',
    ],
    snippet: `// React optimistic state hook with TanStack Query
const useUpdateInventory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => api.post('/inventory/adjust', payload),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['inventory'] });
      const previous = queryClient.getQueryData(['inventory']);
      queryClient.setQueryData(['inventory'], (old: any) => [...old, newItem]);
      return { previous };
    },
    onError: (err, item, context) => {
      queryClient.setQueryData(['inventory'], context?.previous);
    },
  });
};`,
  },
  {
    id: 'gateway',
    name: 'Gateway & Reverse Proxy',
    tag: 'Edge Routing',
    technology: 'Nginx · Docker · SSL/TLS · Token Bucket Rate Limiter',
    role: 'Performs SSL termination, HTTP/2 multiplexing, static asset caching, and protects Node backend from DDoS and burst traffic.',
    invariants: [
      'Strict rate-limiting: 100 req/min per IP with burst allowances',
      'Automated gzip/brotli compression saving ~70% network payload',
      'Security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options',
    ],
    snippet: `# Nginx upstream reverse proxy block for Node cluster
upstream node_backend {
  least_conn;
  server app_instance_1:3000 max_fails=3 fail_timeout=10s;
  server app_instance_2:3000 max_fails=3 fail_timeout=10s;
  keepalive 32;
}

server {
  listen 443 ssl http2;
  server_name api.aristidemanzi.dev;

  location /api/ {
    proxy_pass http://node_backend;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_set_header X-Forwarded-For $remote_addr;
  }
}`,
  },
  {
    id: 'node-app',
    name: 'Node.js Core Microservices',
    tag: 'Application Tier',
    technology: 'Node.js · Express · TypeScript · Zod Validation',
    role: 'Stateless application service running business domain logic, input sanitization, and orchestration of MySQL transactions.',
    invariants: [
      'All requests validated against strict Zod runtime schemas before DB entry',
      'Global structured logging with correlation IDs for distributed tracing',
      'Graceful shutdown handling SIGTERM with 10s drain window for pending DB queries',
    ],
    snippet: `// Express controller with Zod validation & transaction boundary
app.post('/api/v1/orders', async (req, res, next) => {
  try {
    const validatedData = OrderPayloadSchema.parse(req.body);
    const result = await orderService.createAtomicOrder(
      req.user.id, 
      validatedData
    );
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err); // Centralized error middleware
  }
});`,
  },
  {
    id: 'cache',
    name: 'In-Memory Cache & Session Store',
    tag: 'Caching Tier',
    technology: 'Redis 7.0 · Standalone Cluster · LRU Eviction',
    role: 'Shields MySQL from repetitive read queries, handles distributed user sessions, and implements real-time sliding window rate-limiting.',
    invariants: [
      'Read-through cache pattern with strict TTL (Time-To-Live) expirations',
      'Event-driven cache invalidation on MySQL product updates',
      'Reduces MySQL read pressure by 65–80% during high-traffic events',
    ],
    snippet: `// Redis cache-aside wrapper for Node.js
async function getCachedProduct(productId: number): Promise<Product> {
  const cacheKey = \`product:\${productId}\`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Cache miss: Query MySQL
  const [product] = await db.query(
    'SELECT * FROM products WHERE id = ?', 
    [productId]
  );
  if (product) {
    await redis.setex(cacheKey, 3600, JSON.stringify(product));
  }
  return product;
}`,
  },
  {
    id: 'mysql-db',
    name: 'Primary Relational Database',
    tag: 'Persistence Tier',
    technology: 'MySQL 8.0 InnoDB · Connection Pooling · B-Tree Indexes',
    role: 'Source of truth for transactions, customers, and inventory. Enforces ACID guarantees, 3NF normalization, and referential integrity.',
    invariants: [
      'InnoDB row-level locking for critical atomic checkout paths',
      'Composite B-Tree indexes tailored to exact API query WHERE / ORDER BY clauses',
      'Connection pool size bounded to 25–40 connections to prevent thread thrashing',
    ],
    snippet: `-- Production MySQL 8.0 InnoDB table with composite indexing
CREATE TABLE orders (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  customer_id INT UNSIGNED NOT NULL,
  order_number VARCHAR(32) NOT NULL UNIQUE,
  status ENUM('PENDING', 'PAID', 'SHIPPED', 'CANCELLED') NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_customer_created (customer_id, created_at DESC),
  INDEX idx_status_created (status, created_at DESC),
  CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) 
    REFERENCES customers(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
  },
];

export const ArchitectureSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<ArchitectureNode>(ARCHITECTURE_NODES[2]);

  return (
    <section id="architecture" className="py-20 md:py-28 border-b border-slate-800/80 bg-[#0B0F17]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="space-y-3 max-w-2xl mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="font-semibold uppercase tracking-wider">03. Systems Design</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span className="text-slate-400">Full-Stack Blueprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
              Production System Architecture
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              How I architect scalable systems with React, Node.js, and MySQL. Click any layer below to inspect invariants, concurrency guarantees, and implementation code.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Architecture Topology Flow */}
        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Topology diagram columns (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider pb-1">
              Select Architecture Layer
            </div>

            <div className="space-y-2.5">
              {ARCHITECTURE_NODES.map((node, idx) => {
                const isSelected = activeNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-cyan-500/70 bg-[#131D2E] text-white shadow-lg shadow-cyan-950/20'
                        : 'border-slate-800/90 bg-[#0E1524] text-slate-300 hover:border-slate-700 hover:bg-[#11192B]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${
                        isSelected 
                          ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300' 
                          : 'border-slate-800 bg-[#0A0F1A] text-slate-400'
                      }`}>
                        {idx === 0 && <Globe className="w-4 h-4" />}
                        {idx === 1 && <ShieldCheck className="w-4 h-4" />}
                        {idx === 2 && <Cpu className="w-4 h-4" />}
                        {idx === 3 && <Zap className="w-4 h-4" />}
                        {idx === 4 && <Database className="w-4 h-4" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-cyan-400 font-medium">0{idx + 1}.</span>
                          <span className="text-sm font-bold text-white">{node.name}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-400 block truncate mt-0.5">
                          {node.technology}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Quick architectural principles note */}
            <div className="p-4 rounded-xl border border-slate-800 bg-[#070A11] text-xs text-slate-400 space-y-1.5 font-mono">
              <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Engineering Invariants
              </span>
              <p className="font-sans leading-relaxed text-slate-300">
                Stateless compute in Node.js allows horizontal autoscaling behind Nginx, while database connection pooling prevents connection saturation during traffic spikes.
              </p>
            </div>
          </div>

          {/* Node detail display (Right 7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0E1524] p-6 sm:p-7 space-y-6">
            
            {/* Header info */}
            <div className="border-b border-slate-800/80 pb-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                <span className="text-cyan-400 font-semibold">{activeNode.tag}</span>
                <span>Active Component Inspector</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {activeNode.name}
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Technology: <span className="text-slate-200">{activeNode.technology}</span>
              </p>
            </div>

            {/* Role & responsibilities */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Responsibilities
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeNode.role}
              </p>
            </div>

            {/* Key Invariants */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Reliability &amp; Performance Invariants
              </span>
              <ul className="space-y-2">
                {activeNode.invariants.map((inv, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <span className="text-cyan-400 font-mono mt-0.5">•</span>
                    <span>{inv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Implementation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-slate-300 font-semibold">Implementation Blueprint</span>
                <span>TypeScript / Configuration</span>
              </div>
              <pre className="p-4 rounded-xl border border-slate-800 bg-[#070A10] text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                <code>{activeNode.snippet}</code>
              </pre>
            </div>

          </div>
        </div>
      </ScrollReveal>

    </div>
  </section>
  );
};
