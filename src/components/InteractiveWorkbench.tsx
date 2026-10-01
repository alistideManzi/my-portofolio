import React, { useState } from 'react';
import { 
  SAMPLE_DATABASE, 
  SQL_PRESETS, 
  API_ENDPOINTS, 
  SqlPreset, 
  ApiEndpoint,
  RelationalTable 
} from '../data/workbenchData';
import { 
  Play, 
  RotateCcw, 
  Database, 
  Server, 
  Code, 
  Table as TableIcon, 
  Sparkles, 
  Check, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Send
} from 'lucide-react';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { ScrollReveal } from './ScrollReveal';

interface InteractiveWorkbenchProps {
  initialPresetId?: string;
}

export const InteractiveWorkbench: React.FC<InteractiveWorkbenchProps> = ({ initialPresetId }) => {
  const [activeTab, setActiveTab] = useState<'sql' | 'node-api'>('sql');

  // SQL Studio State
  const [selectedPreset, setSelectedPreset] = useState<SqlPreset>(
    SQL_PRESETS.find(p => p.id === initialPresetId) || SQL_PRESETS[0]
  );
  const [customSql, setCustomSql] = useState<string>(selectedPreset.sql);
  const [sqlViewMode, setSqlViewMode] = useState<'results' | 'explain' | 'schema'>('results');
  const [executionTime, setExecutionTime] = useState<number>(1.45);
  const [isExecutingSql, setIsExecutingSql] = useState<boolean>(false);
  const [selectedSchemaTable, setSelectedSchemaTable] = useState<string>('customers');

  // Node API Tester State
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(API_ENDPOINTS[0]);
  const [isExecutingApi, setIsExecutingApi] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any>(selectedEndpoint.responsePayload);
  const [apiLatency, setApiLatency] = useState<number>(14.2);

  // Keyboard shortcut to reset workbench view on Esc
  useKeyboardShortcuts([
    {
      key: 'Escape',
      allowInInputs: false,
      handler: () => {
        if (sqlViewMode !== 'results') {
          setSqlViewMode('results');
        }
      },
      description: 'Reset workbench state to results grid',
    },
  ]);

  // Switch preset
  const handleSelectPreset = (preset: SqlPreset) => {
    setSelectedPreset(preset);
    setCustomSql(preset.sql);
    setExecutionTime(Number((Math.random() * 2 + 0.8).toFixed(2)));
  };

  // Run SQL Query
  const handleRunSql = () => {
    setIsExecutingSql(true);
    setTimeout(() => {
      setIsExecutingSql(false);
      setExecutionTime(Number((Math.random() * 1.8 + 0.6).toFixed(2)));
    }, 280);
  };

  // Reset SQL
  const handleResetSql = () => {
    setCustomSql(selectedPreset.sql);
  };

  // Run API Endpoint
  const handleExecuteApi = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    setIsExecutingApi(true);
    setTimeout(() => {
      setIsExecutingApi(false);
      setApiResponse(endpoint.responsePayload);
      setApiLatency(Number((Math.random() * 15 + 12).toFixed(1)));
    }, 320);
  };

  // Derive tabular results based on preset or query context
  const getTabularResults = (): { columns: string[]; rows: Record<string, any>[] } => {
    if (selectedPreset.id === 'customer-ltv') {
      return {
        columns: ['customer_id', 'customer_name', 'tier', 'total_orders', 'total_spent', 'avg_order_value'],
        rows: [
          { customer_id: 101, customer_name: 'Acme Logistics Corp', tier: 'Enterprise', total_orders: 2, total_spent: '$8,800.00', avg_order_value: '$4,400.00' },
          { customer_id: 103, customer_name: 'Vertex Health Systems', tier: 'Enterprise', total_orders: 1, total_spent: '$7,200.00', avg_order_value: '$7,200.00' },
          { customer_id: 105, customer_name: 'Kigali Tech Hub', tier: 'Enterprise', total_orders: 1, total_spent: '$4,900.00', avg_order_value: '$4,900.00' },
          { customer_id: 106, customer_name: 'Helios Media Group', tier: 'Pro', total_orders: 1, total_spent: '$2,710.00', avg_order_value: '$2,710.00' },
        ],
      };
    } else if (selectedPreset.id === 'inventory-reorder-alert') {
      return {
        columns: ['sku_id', 'product_name', 'category', 'stock_quantity', 'price', 'inventory_health', 'current_inventory_value'],
        rows: [
          { sku_id: 506, product_name: 'High-Speed NVMe Storage Module', category: 'Hardware', stock_quantity: 6, price: '$290.00', inventory_health: 'CRITICAL', current_inventory_value: '$1,740.00' },
          { sku_id: 504, product_name: 'Edge Micro-Server Rack unit', category: 'Hardware', stock_quantity: 12, price: '$1,850.00', inventory_health: 'WARNING', current_inventory_value: '$22,200.00' },
          { sku_id: 505, product_name: 'Sub-meter GNSS Receiver', category: 'Telemetry', stock_quantity: 45, price: '$680.00', inventory_health: 'HEALTHY', current_inventory_value: '$30,600.00' },
        ],
      };
    } else if (selectedPreset.id === 'order-line-item-deep-dive') {
      return {
        columns: ['order_number', 'status', 'customer_name', 'item_purchased', 'quantity', 'unit_price', 'line_subtotal'],
        rows: [
          { order_number: 'ORD-2024-001', status: 'SHIPPED', customer_name: 'Acme Logistics Corp', item_purchased: 'High-Throughput Gateway v2', quantity: 4, unit_price: '$450.00', line_subtotal: '$1,800.00' },
          { order_number: 'ORD-2024-001', status: 'SHIPPED', customer_name: 'Acme Logistics Corp', item_purchased: 'Spatial Sensor Node LTE-M', quantity: 10, unit_price: '$125.00', line_subtotal: '$1,250.00' },
          { order_number: 'ORD-2024-002', status: 'PAID', customer_name: 'Vertex Health Systems', item_purchased: 'Enterprise Cluster License', quantity: 3, unit_price: '$2,400.00', line_subtotal: '$7,200.00' },
          { order_number: 'ORD-2024-003', status: 'PROCESSING', customer_name: 'Starlight Retailers', item_purchased: 'Spatial Sensor Node LTE-M', quantity: 7, unit_price: '$125.00', line_subtotal: '$875.00' },
          { order_number: 'ORD-2024-004', status: 'SHIPPED', customer_name: 'Kigali Tech Hub', item_purchased: 'Enterprise Cluster License', quantity: 2, unit_price: '$2,400.00', line_subtotal: '$4,800.00' },
        ],
      };
    } else {
      // Transaction simulation
      return {
        columns: ['step', 'operation', 'table_affected', 'lock_type', 'status'],
        rows: [
          { step: 1, operation: 'START TRANSACTION', table_affected: 'System', lock_type: 'Isolation Snapshot', status: 'ACTIVE' },
          { step: 2, operation: 'SELECT ... FOR UPDATE', table_affected: 'products (SKU: 504)', lock_type: 'Exclusive Row Mutex', status: 'LOCKED' },
          { step: 3, operation: 'UPDATE products SET stock - 2', table_affected: 'products', lock_type: 'Row Write Lock', status: 'APPLIED' },
          { step: 4, operation: 'INSERT INTO orders', table_affected: 'orders', lock_type: 'Auto-Inc Lock', status: 'CREATED (ORD-TX-9901)' },
          { step: 5, operation: 'COMMIT', table_affected: 'InnoDB Redo Log', lock_type: 'Flush to Disk', status: 'COMMITTED (ACID Verified)' },
        ],
      };
    }
  };

  const currentResults = getTabularResults();
  const currentSchemaTable = SAMPLE_DATABASE[selectedSchemaTable];

  return (
    <section id="interactive-lab" className="py-20 md:py-28 border-b border-slate-800/80 bg-[#070A11]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="font-semibold uppercase tracking-wider">02. Hands-on Verification</span>
                <span className="text-slate-600" aria-hidden="true">/</span>
                <span className="text-slate-400">Live Engineering Sandbox</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
                Interactive MySQL &amp; Node.js Workbench
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Verify engineering competency directly. Inspect normalized relational schemas, run optimized SQL queries with execution plans, and test live Node.js REST endpoints.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center p-1 bg-[#121926] border border-slate-800 rounded-lg">
              <button
                onClick={() => setActiveTab('sql')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'sql'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>MySQL Query Studio</span>
              </button>
              <button
                onClick={() => setActiveTab('node-api')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'node-api'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>Node.js REST Runner</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* WORKBENCH BODY: TAB 1 (MySQL QUERY STUDIO) */}
        {activeTab === 'sql' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left sidebar: Presets & Schemas */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Presets Box */}
              <div className="rounded-xl border border-slate-800 bg-[#0E1524] p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800/80">
                  <span className="text-slate-200 font-semibold uppercase tracking-wider">Prepared SQL Scenarios</span>
                  <span>{SQL_PRESETS.length} presets</span>
                </div>

                <div className="space-y-2">
                  {SQL_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`w-full text-left p-3 rounded-lg border transition-all text-xs ${
                        selectedPreset.id === preset.id
                          ? 'border-cyan-500/50 bg-[#142034] text-white shadow-sm'
                          : 'border-slate-800/70 bg-[#0A0F1A] text-slate-300 hover:border-slate-700 hover:bg-[#0D1424]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-200 mb-1">
                        <span>{preset.name}</span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded">
                          {preset.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                        {preset.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Relational Tables Explorer */}
              <div className="rounded-xl border border-slate-800 bg-[#0E1524] p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800/80">
                  <span className="text-slate-200 font-semibold uppercase tracking-wider">In-Memory Schema</span>
                  <span>4 tables</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(SAMPLE_DATABASE).map((tableName) => (
                    <button
                      key={tableName}
                      onClick={() => {
                        setSelectedSchemaTable(tableName);
                        setSqlViewMode('schema');
                      }}
                      className={`p-2.5 rounded-lg border text-left text-xs font-mono transition-colors ${
                        selectedSchemaTable === tableName && sqlViewMode === 'schema'
                          ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-300'
                          : 'border-slate-800 bg-[#0A0F1A] text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-medium">
                        <TableIcon className="w-3.5 h-3.5 text-slate-500" />
                        <span>{tableName}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {SAMPLE_DATABASE[tableName].rows.length} records
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right main area: Editor + Output */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              
              {/* SQL Editor Frame */}
              <div className="rounded-xl border border-slate-800 bg-[#0B0F17] overflow-hidden flex flex-col shadow-lg">
                
                {/* Editor Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5 bg-[#0E1524]">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-white font-medium">mysql&gt; interactive_session</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-emerald-400">InnoDB 8.0</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetSql}
                      className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                      title="Reset SQL to preset"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleRunSql}
                      disabled={isExecutingSql}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B0F17] bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isExecutingSql ? 'Executing...' : 'Run Query'}</span>
                    </button>
                  </div>
                </div>

                {/* SQL Text Area */}
                <div className="p-4 bg-[#070A10]">
                  <textarea
                    value={customSql}
                    onChange={(e) => setCustomSql(e.target.value)}
                    rows={8}
                    className="w-full resize-none font-mono text-xs text-slate-200 bg-transparent focus:outline-none leading-relaxed selection:bg-cyan-500/20"
                    placeholder="Enter MySQL query here..."
                    spellCheck={false}
                  />
                </div>

                {/* Query execution sub-bar */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800/80 bg-[#090E18] text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Clock className="w-3 h-3" />
                      <span className="tabular-nums font-semibold">{executionTime}ms</span>
                    </span>
                    <span className="text-slate-600">|</span>
                    <span>Rows returned: <strong className="text-slate-200 tabular-nums">{currentResults.rows.length}</strong></span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSqlViewMode('results')}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        sqlViewMode === 'results'
                          ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Results Grid
                    </button>
                    <button
                      onClick={() => setSqlViewMode('explain')}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        sqlViewMode === 'explain'
                          ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      EXPLAIN Query Plan
                    </button>
                    <button
                      onClick={() => setSqlViewMode('schema')}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        sqlViewMode === 'schema'
                          ? 'bg-cyan-500/20 text-cyan-300 font-medium'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Schema Details
                    </button>
                  </div>
                </div>

              </div>

              {/* Output Display Container */}
              <div className="flex-1 rounded-xl border border-slate-800 bg-[#0E1524] p-4 overflow-hidden flex flex-col">
                
                {/* 1. Results Grid View */}
                {sqlViewMode === 'results' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="text-slate-200 font-semibold">Query Result Set</span>
                      <span className="text-cyan-400 text-[11px]">Status: Query OK, {currentResults.rows.length} rows</span>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-slate-800/80 bg-[#090D17]">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#121927] border-b border-slate-800 text-slate-300">
                          <tr>
                            <th className="py-2 px-3 text-slate-500 w-10">#</th>
                            {currentResults.columns.map((col) => (
                              <th key={col} className="py-2 px-3 font-semibold uppercase tracking-wider text-[11px] text-cyan-300">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-slate-200">
                          {currentResults.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                              <td className="py-2 px-3 text-slate-500 tabular-nums">{rIdx + 1}</td>
                              {currentResults.columns.map((col) => (
                                <td key={col} className="py-2 px-3 tabular-nums whitespace-nowrap">
                                  {typeof row[col] === 'string' && row[col].startsWith('$') ? (
                                    <span className="text-emerald-400 font-medium">{row[col]}</span>
                                  ) : row[col] === 'CRITICAL' ? (
                                    <span className="text-red-400 font-semibold">{row[col]}</span>
                                  ) : row[col] === 'COMMITTED (ACID Verified)' ? (
                                    <span className="text-emerald-300 font-semibold flex items-center gap-1">
                                      <ShieldCheck className="w-3.5 h-3.5" /> {row[col]}
                                    </span>
                                  ) : (
                                    row[col]
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 2. EXPLAIN ANALYZE View */}
                {sqlViewMode === 'explain' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="text-slate-200 font-semibold">MySQL EXPLAIN Execution Plan</span>
                      <span className="text-cyan-400 text-[11px]">Cost-based Optimizer Output</span>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-slate-800/80 bg-[#090D17]">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#121927] border-b border-slate-800 text-slate-300">
                          <tr>
                            <th className="py-2 px-3 text-cyan-300">Table</th>
                            <th className="py-2 px-3 text-cyan-300">Type</th>
                            <th className="py-2 px-3 text-cyan-300">Key Used</th>
                            <th className="py-2 px-3 text-cyan-300">Rows Examined</th>
                            <th className="py-2 px-3 text-cyan-300">Cost</th>
                            <th className="py-2 px-3 text-cyan-300">Extra Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-slate-200">
                          {selectedPreset.explainPlan.map((step, sIdx) => (
                            <tr key={sIdx} className="hover:bg-slate-800/30">
                              <td className="py-2.5 px-3 font-semibold text-white">{step.table}</td>
                              <td className="py-2.5 px-3">
                                <span className="text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded text-[11px]">
                                  {step.type}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-emerald-400">{step.keyUsed}</td>
                              <td className="py-2.5 px-3 tabular-nums">{step.rowsExamined}</td>
                              <td className="py-2.5 px-3 tabular-nums text-slate-300">{step.cost}</td>
                              <td className="py-2.5 px-3 text-slate-400 text-[11px]">{step.extra}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      <strong className="text-slate-200">Index Insight:</strong> The query uses indexed key lookup rather than a full table scan (<code className="text-cyan-300">ALL</code>), guaranteeing $O(\log N)$ access time and avoiding table-level read locks.
                    </p>
                  </div>
                )}

                {/* 3. Schema Details View */}
                {sqlViewMode === 'schema' && currentSchemaTable && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="text-slate-200 font-semibold">Table Definition: `{currentSchemaTable.name}`</span>
                      <span className="text-cyan-400 text-[11px]">Engine: InnoDB / UTF8mb4</span>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-slate-800/80 bg-[#090D17]">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#121927] border-b border-slate-800 text-slate-300">
                          <tr>
                            <th className="py-2 px-3 text-cyan-300">Column Name</th>
                            <th className="py-2 px-3 text-cyan-300">Data Type</th>
                            <th className="py-2 px-3 text-cyan-300">Key Constraint</th>
                            <th className="py-2 px-3 text-cyan-300">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-slate-200">
                          {currentSchemaTable.columns.map((col) => (
                            <tr key={col.name} className="hover:bg-slate-800/30">
                              <td className="py-2 px-3 font-semibold text-white">{col.name}</td>
                              <td className="py-2 px-3 text-indigo-300">{col.type}</td>
                              <td className="py-2 px-3">
                                {col.key ? (
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                    col.key === 'PK' 
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                                      : col.key === 'FK'
                                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                  }`}>
                                    {col.key}
                                  </span>
                                ) : (
                                  <span className="text-slate-600">-</span>
                                )}
                              </td>
                              <td className="py-2 px-3 text-slate-400">{col.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* WORKBENCH BODY: TAB 2 (Node.js REST RUNNER) */}
        {activeTab === 'node-api' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Endpoint selector */}
            <div className="lg:col-span-4 space-y-3">
              <div className="rounded-xl border border-slate-800 bg-[#0E1524] p-4 space-y-3">
                <div className="text-xs font-mono text-slate-400 pb-2 border-b border-slate-800/80">
                  <span className="text-slate-200 font-semibold uppercase tracking-wider">Node.js Express Endpoints</span>
                </div>

                <div className="space-y-2">
                  {API_ENDPOINTS.map((endpoint, i) => (
                    <button
                      key={i}
                      onClick={() => handleExecuteApi(endpoint)}
                      className={`w-full text-left p-3 rounded-lg border transition-all text-xs font-mono ${
                        selectedEndpoint.path === endpoint.path
                          ? 'border-cyan-500/50 bg-[#142034] text-white shadow-sm'
                          : 'border-slate-800/70 bg-[#0A0F1A] text-slate-300 hover:border-slate-700 hover:bg-[#0D1424]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                          endpoint.method === 'GET' 
                            ? 'bg-blue-500/20 text-blue-300' 
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {endpoint.method}
                        </span>
                        <span className="truncate text-slate-200">{endpoint.path}</span>
                      </div>
                      <p className="text-[11px] font-sans text-slate-400 leading-snug">
                        {endpoint.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Node runtime info card */}
              <div className="rounded-xl border border-slate-800 bg-[#0E1524] p-4 space-y-2 text-xs font-mono text-slate-400">
                <div className="text-slate-200 font-semibold pb-1 border-b border-slate-800">
                  Node Engine Specifications
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Framework:</span>
                    <span className="text-slate-300">Express 4.21 + tsx</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">DB Driver:</span>
                    <span className="text-slate-300">mysql2 (Promise Pool)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Isolation:</span>
                    <span className="text-slate-300">REPEATABLE READ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Validation:</span>
                    <span className="text-slate-300">Zod Strict Schemas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: API Inspector & Response payload */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              
              {/* Request panel */}
              <div className="rounded-xl border border-slate-800 bg-[#0E1524] p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className={`px-2 py-0.5 font-bold rounded ${
                      selectedEndpoint.method === 'GET' 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {selectedEndpoint.method}
                    </span>
                    <span className="text-white font-medium">{selectedEndpoint.path}</span>
                  </div>

                  <button
                    onClick={() => handleExecuteApi(selectedEndpoint)}
                    disabled={isExecutingApi}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B0F17] bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    <span>{isExecutingApi ? 'Sending...' : 'Send Request'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 font-sans">
                  {selectedEndpoint.description}
                </p>

                {selectedEndpoint.requestBody && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-400">Request Body (JSON):</span>
                    <pre className="p-2.5 rounded-lg border border-slate-800 bg-[#070A10] text-xs font-mono text-cyan-300 overflow-x-auto">
                      {JSON.stringify(selectedEndpoint.requestBody, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Response + Under-the-hood SQL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                
                {/* JSON Response */}
                <div className="rounded-xl border border-slate-800 bg-[#0B0F17] p-4 flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-slate-800">
                    <span className="text-slate-200 font-semibold">Response JSON</span>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold tabular-nums">
                        HTTP {selectedEndpoint.statusCode}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400 tabular-nums">{apiLatency}ms</span>
                    </div>
                  </div>
                  <pre className="flex-1 p-3 rounded-lg border border-slate-800/80 bg-[#070A10] text-[11px] font-mono text-slate-200 overflow-x-auto leading-relaxed">
                    <code>{JSON.stringify(apiResponse, null, 2)}</code>
                  </pre>
                </div>

                {/* Underlying MySQL Query Generated */}
                <div className="rounded-xl border border-slate-800 bg-[#0B0F17] p-4 flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-slate-800">
                    <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-cyan-400" />
                      Generated MySQL SQL
                    </span>
                    <span className="text-cyan-400 text-[11px]">Parameterized</span>
                  </div>
                  <pre className="flex-1 p-3 rounded-lg border border-slate-800/80 bg-[#070A10] text-[11px] font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                    <code>{selectedEndpoint.sqlGenerated}</code>
                  </pre>
                  <p className="text-[11px] text-slate-400 font-sans leading-tight">
                    Executed through Node connection pool with prepared statement caching to protect against SQL injection.
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
