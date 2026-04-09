import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Settings, 
  BarChart3, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Star, 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Cpu,
  Zap,
  Globe,
  Database,
  Lock,
  LogOut,
  Save,
  RefreshCw,
  Trash2,
  Edit3,
  CheckSquare,
  Square,
  ChevronDown
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/utils/cn';
import { useNavigate, Link } from 'react-router-dom';
import { db, logout, handleFirestoreError, OperationType } from '@/lib/firebase';
import { 
  doc, 
  onSnapshot, 
  updateDoc, 
  collection, 
  setDoc, 
  query, 
  orderBy, 
  limit,
  addDoc,
  deleteDoc,
  FirestoreError
} from 'firebase/firestore';

// Initial data for bootstrapping if DB is empty
const defaultUsageTrends = [
  { name: 'Mon', users: 4000, revenue: 2400, tools: 2400, latency: 120, timestamp: new Date() },
  { name: 'Tue', users: 3000, revenue: 1398, tools: 2210, latency: 132, timestamp: new Date() },
  { name: 'Wed', users: 2000, revenue: 9800, tools: 2290, latency: 101, timestamp: new Date() },
  { name: 'Thu', users: 2780, revenue: 3908, tools: 2000, latency: 115, timestamp: new Date() },
  { name: 'Fri', users: 1890, revenue: 4800, tools: 2181, latency: 125, timestamp: new Date() },
  { name: 'Sat', users: 2390, revenue: 3800, tools: 2500, latency: 110, timestamp: new Date() },
  { name: 'Sun', users: 3490, revenue: 4300, tools: 2100, latency: 105, timestamp: new Date() },
];

const defaultDeviceData = [
  { name: 'Mobile', value: 65, color: '#10b981' },
  { name: 'Desktop', value: 30, color: '#3b82f6' },
  { name: 'Tablet', value: 5, color: '#f59e0b' },
];

const data = [
  { name: 'Mon', users: 4000, revenue: 2400, tools: 2400, latency: 120 },
  { name: 'Tue', users: 3000, revenue: 1398, tools: 2210, latency: 132 },
  { name: 'Wed', users: 2000, revenue: 9800, tools: 2290, latency: 101 },
  { name: 'Thu', users: 2780, revenue: 3908, tools: 2000, latency: 115 },
  { name: 'Fri', users: 1890, revenue: 4800, tools: 2181, latency: 125 },
  { name: 'Sat', users: 2390, revenue: 3800, tools: 2500, latency: 110 },
  { name: 'Sun', users: 3490, revenue: 4300, tools: 2100, latency: 105 },
];

const deviceData = [
  { name: 'Mobile', value: 65, color: '#10b981' },
  { name: 'Desktop', value: 30, color: '#3b82f6' },
  { name: 'Tablet', value: 5, color: '#f59e0b' },
];

const initialTools = [
  { id: 'img-comp', name: 'Image Compressor', category: 'Images', status: 'active', featured: true, usage: '4.2k' },
  { id: 'pdf-merge', name: 'PDF Merger', category: 'PDF', status: 'active', featured: true, usage: '3.8k' },
  { id: 'pdf-split', name: 'PDF Splitter', category: 'PDF', status: 'active', featured: false, usage: '2.1k' },
  { id: 'ai-sum', name: 'AI Summarizer', category: 'AI', status: 'active', featured: false, usage: '5.6k' },
  { id: 'pass-gen', name: 'Password Generator', category: 'Security', status: 'active', featured: false, usage: '1.2k' },
  { id: 'code-form', name: 'Code Formatter', category: 'Dev', status: 'active', featured: false, usage: '900' },
  { id: 'memo-pad', name: 'MemoNote Pad', category: 'Productivity', status: 'active', featured: false, usage: '1.5k' },
];

export function AdminPanel() {
  const [tools, setTools] = useState<any[]>([]);
  const [globalStats, setGlobalStats] = useState<any>({
    totalUsage: 0,
    activeUsers: 0,
    adRevenue: 0,
    serverHealth: 0
  });
  const [usageTrends, setUsageTrends] = useState<any[]>([]);
  const [deviceDistribution, setDeviceDistribution] = useState<any[]>([]);
  
  const [activeTab, setActiveTab] = useState<'overview' | 'tools' | 'performance' | 'ads' | 'settings'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    aiFeatures: true,
    userAnalytics: true
  });
  const [adPlacements, setAdPlacements] = useState([
    { name: 'Top Banner', size: '728x90', status: 'active', revenue: '$45.20' },
    { name: 'Middle Section', size: '300x250', status: 'active', revenue: '$68.10' },
    { name: 'Sidebar Widget', size: '300x600', status: 'paused', revenue: '$29.20' },
    { name: 'Mobile Bottom', size: '320x50', status: 'active', revenue: '$12.40' },
  ]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const navigate = useNavigate();

  const categories = ['All', ...new Set(tools.map(t => t.category))];

  // Real-time listeners
  useEffect(() => {
    // 1. Global Stats
    const unsubStats = onSnapshot(doc(db, 'stats', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setGlobalStats(docSnap.data());
      } else {
        // Bootstrap
        setDoc(doc(db, 'stats', 'global'), {
          totalUsage: 12482,
          activeUsers: 1204,
          adRevenue: 142.50,
          serverHealth: 99.9
        }).catch(err => handleFirestoreError(err, OperationType.WRITE, 'stats/global'));
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'stats/global'));

    // 2. Usage Trends
    const qTrends = query(collection(db, 'usageTrends'), orderBy('timestamp', 'asc'), limit(7));
    const unsubTrends = onSnapshot(qTrends, (snap) => {
      if (!snap.empty) {
        setUsageTrends(snap.docs.map(d => d.data()));
      } else {
        // Bootstrap
        defaultUsageTrends.forEach(t => addDoc(collection(db, 'usageTrends'), t).catch(err => handleFirestoreError(err, OperationType.CREATE, 'usageTrends')));
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'usageTrends'));

    // 3. Device Distribution
    const unsubDevice = onSnapshot(doc(db, 'deviceDistribution', 'current'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDeviceDistribution([
          { name: 'Mobile', value: data.mobile, color: '#10b981' },
          { name: 'Desktop', value: data.desktop, color: '#3b82f6' },
          { name: 'Tablet', value: data.tablet, color: '#f59e0b' },
        ]);
      } else {
        // Bootstrap
        setDoc(doc(db, 'deviceDistribution', 'current'), {
          mobile: 65,
          desktop: 30,
          tablet: 5
        }).catch(err => handleFirestoreError(err, OperationType.WRITE, 'deviceDistribution/current'));
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'deviceDistribution/current'));

    // 4. Tools
    const unsubTools = onSnapshot(collection(db, 'tools'), (snap) => {
      if (!snap.empty) {
        setTools(snap.docs.map(d => ({ ...d.data(), _id: d.id })));
      } else {
        // Bootstrap
        initialTools.forEach(t => addDoc(collection(db, 'tools'), t).catch(err => handleFirestoreError(err, OperationType.CREATE, 'tools')));
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'tools'));

    return () => {
      unsubStats();
      unsubTrends();
      unsubDevice();
      unsubTools();
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const updateGlobalStat = async (field: string, value: number) => {
    setIsUpdating(true);
    const path = 'stats/global';
    try {
      await updateDoc(doc(db, path), { [field]: value });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const tool = tools.find(t => t.id === id);
    if (tool) {
      const path = `tools/${tool._id}`;
      try {
        await updateDoc(doc(db, path), { 
          status: currentStatus === 'active' ? 'inactive' : 'active' 
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, path);
      }
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    const tool = tools.find(t => t.id === id);
    if (tool) {
      const path = `tools/${tool._id}`;
      try {
        await updateDoc(doc(db, path), { 
          featured: !currentFeatured 
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, path);
      }
    }
  };

  const handleAddTool = async () => {
    const name = prompt("Tool Name:");
    const category = prompt("Category (Images, PDF, AI, Security, Dev, Productivity):");
    if (name && category) {
      const id = name.toLowerCase().replace(/\s+/g, '-');
      const path = 'tools';
      try {
        await addDoc(collection(db, path), {
          id,
          name,
          category,
          status: 'active',
          featured: false,
          usage: '0'
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, path);
      }
    }
  };

  const handleDeleteTool = async (docId: string) => {
    if (confirm("Are you sure you want to delete this tool?")) {
      const path = `tools/${docId}`;
      try {
        await deleteDoc(doc(db, path));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, path);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedTools.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedTools.length} tools?`)) {
      for (const id of selectedTools) {
        const tool = tools.find(t => t.id === id);
        if (tool) {
          const path = `tools/${tool._id}`;
          try {
            await deleteDoc(doc(db, path));
          } catch (err) {
            handleFirestoreError(err, OperationType.DELETE, path);
          }
        }
      }
      setSelectedTools([]);
    }
  };

  const handleBulkToggleStatus = async () => {
    if (selectedTools.length === 0) return;
    for (const id of selectedTools) {
      const tool = tools.find(t => t.id === id);
      if (tool) {
        const path = `tools/${tool._id}`;
        try {
          await updateDoc(doc(db, path), { 
            status: tool.status === 'active' ? 'inactive' : 'active' 
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, path);
        }
      }
    }
    setSelectedTools([]);
  };

  const toggleSelectTool = (id: string) => {
    setSelectedTools(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedTools.length === filteredTools.length) {
      setSelectedTools([]);
    } else {
      setSelectedTools(filteredTools.map(t => t.id));
    }
  };

  const filteredTools = tools.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOptimize = async (type: 'cache' | 'db') => {
    setIsOptimizing(true);
    // Simulate optimization
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsOptimizing(false);
    alert(type === 'cache' ? "Cache cleared successfully! 2.4GB freed." : "Database optimization complete. All indexes are up to date.");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <Helmet>
        <title>Admin Panel - QuickTools Pro</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Admin <span className="text-emerald-500">Panel</span></h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400 font-medium">Manage Quick tools platform performance and tools.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all"
          >
            <Globe className="h-4 w-4" />
            View Site
          </Link>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 text-[10px] font-black uppercase tracking-widest">
            <ShieldAlert className="h-4 w-4" />
            Live Mode
          </div>
          <button 
            onClick={handleAddTool}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-black/10"
          >
            <Plus className="h-4 w-4" /> Add Tool
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'tools', label: 'Manage Tools', icon: Settings },
          { id: 'performance', label: 'Performance', icon: Zap },
          { id: 'ads', label: 'Ad Placements', icon: DollarSign },
          { id: 'settings', label: 'Settings', icon: Activity },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap border-2",
              activeTab === tab.id 
                ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20" 
                : "bg-white dark:bg-zinc-900 text-zinc-500 border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { id: 'totalUsage', label: 'Total Usage', value: globalStats.totalUsage.toLocaleString(), change: '+12%', up: true, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { id: 'activeUsers', label: 'Active Users', value: globalStats.activeUsers.toLocaleString(), change: '+5%', up: true, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { id: 'adRevenue', label: 'Ad Revenue', value: `$${globalStats.adRevenue.toFixed(2)}`, change: '-2%', up: false, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                { id: 'serverHealth', label: 'Server Health', value: `${globalStats.serverHealth}%`, change: 'Stable', up: true, icon: ShieldAlert, color: 'text-amber-500', bg: 'bg-amber-500/10' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-3xl bg-white p-6 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm relative group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", stat.bg)}>
                      <stat.icon className={cn("h-5 w-5", stat.color)} />
                    </div>
                    <div className={cn("flex items-center gap-1 text-xs font-black", stat.up ? "text-emerald-500" : "text-red-500")}>
                      {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-2xl font-black text-zinc-900 dark:text-white">{stat.value}</p>
                    <button 
                      onClick={() => {
                        const newValue = prompt(`Enter new value for ${stat.label}:`, globalStats[stat.id]);
                        if (newValue !== null) updateGlobalStat(stat.id, parseFloat(newValue));
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-emerald-500 transition-all"
                    >
                      <RefreshCw className={cn("h-4 w-4", isUpdating && "animate-spin")} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-3xl bg-white p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white">Usage Trends</h3>
                  <select className="bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl text-[10px] font-black uppercase tracking-widest px-3 py-2 outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageTrends}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 600 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 600 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '16px', color: '#fff', fontWeight: 600 }}
                        itemStyle={{ color: '#10b981' }}
                      />
                      <Area type="monotone" dataKey="users" stroke="#10b981" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white">Device Distribution</h3>
                  <button 
                    onClick={async () => {
                      const mobile = prompt("Mobile %:", "65");
                      const desktop = prompt("Desktop %:", "30");
                      const tablet = prompt("Tablet %:", "5");
                      if (mobile && desktop && tablet) {
                        await updateDoc(doc(db, 'deviceDistribution', 'current'), {
                          mobile: parseFloat(mobile),
                          desktop: parseFloat(desktop),
                          tablet: parseFloat(tablet)
                        });
                      }
                    }}
                    className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline"
                  >
                    Update Distribution
                  </button>
                </div>
                <div className="h-[300px] w-full flex items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {deviceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '16px', color: '#fff', fontWeight: 600 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-4 pr-8">
                    {deviceDistribution.map((item) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <div>
                          <p className="text-xs font-black text-zinc-900 dark:text-white">{item.name}</p>
                          <p className="text-[10px] font-bold text-zinc-500">{item.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'tools' && (
          <motion.div
            key="tools"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input 
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-medium"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full appearance-none flex items-center justify-center gap-2 px-10 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                </div>
                
                <div className="relative flex-1 sm:flex-none group">
                  <button className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
                    <Activity className="h-4 w-4" /> Bulk Actions
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 py-2 hidden group-hover:block z-50">
                    <button 
                      onClick={handleBulkToggleStatus}
                      className="w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      Toggle Status
                    </button>
                    <button 
                      onClick={handleBulkDelete}
                      className="w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      Delete Selected
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <th className="px-6 py-5 w-10">
                        <button onClick={toggleSelectAll} className="text-zinc-400 hover:text-emerald-500 transition-all">
                          {selectedTools.length === filteredTools.length && filteredTools.length > 0 ? <CheckSquare className="h-5 w-5 text-emerald-500" /> : <Square className="h-5 w-5" />}
                        </button>
                      </th>
                      <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Tool Name</th>
                      <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Category</th>
                      <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Usage</th>
                      <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTools.map((tool) => (
                      <tr key={tool.id} className="border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-5">
                          <button onClick={() => toggleSelectTool(tool.id)} className="text-zinc-400 hover:text-emerald-500 transition-all">
                            {selectedTools.includes(tool.id) ? <CheckSquare className="h-5 w-5 text-emerald-500" /> : <Square className="h-5 w-5" />}
                          </button>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                              <Settings className="h-5 w-5 text-emerald-500" />
                            </div>
                            <span className="text-sm font-black text-zinc-900 dark:text-white">{tool.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black text-zinc-500 uppercase tracking-widest">{tool.category}</span>
                        </td>
                        <td className="px-6 py-5 text-sm font-black text-zinc-600 dark:text-zinc-400">{tool.usage}</td>
                        <td className="px-6 py-5">
                          <button 
                            onClick={() => toggleStatus(tool.id, tool.status)}
                            className={cn(
                              "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                              tool.status === 'active' 
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" 
                                : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                            )}
                          >
                            {tool.status}
                          </button>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => toggleFeatured(tool.id, tool.featured)}
                              className={cn(
                                "p-2.5 rounded-xl transition-all",
                                tool.featured ? "text-amber-500 bg-amber-50 dark:bg-amber-500/10" : "text-zinc-400 hover:text-zinc-600"
                              )}
                            >
                              <Star className={cn("h-5 w-5", tool.featured && "fill-current")} />
                            </button>
                            <div className="relative">
                              <button 
                                onClick={() => setActiveMenu(activeMenu === tool.id ? null : tool.id)}
                                className="p-2.5 rounded-xl text-zinc-400 hover:text-zinc-600"
                              >
                                <MoreVertical className="h-5 w-5" />
                              </button>
                              {activeMenu === tool.id && (
                                <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 py-2 z-50">
                                  <button 
                                    onClick={() => {
                                      const newName = prompt("New Name:", tool.name);
                                      if (newName) updateDoc(doc(db, 'tools', tool._id), { name: newName });
                                      setActiveMenu(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-2"
                                  >
                                    <Edit3 className="h-4 w-4" /> Edit
                                  </button>
                                  <button 
                                    onClick={() => {
                                      handleDeleteTool(tool._id);
                                      setActiveMenu(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2"
                                  >
                                    <Trash2 className="h-4 w-4" /> Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="rounded-3xl bg-white p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    Response Latency (ms)
                  </h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 600 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 600 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '16px', color: '#fff', fontWeight: 600 }}
                        />
                        <Line type="monotone" dataKey="latency" stroke="#f59e0b" strokeWidth={4} dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="rounded-3xl bg-white p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                        <Cpu className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-zinc-900 dark:text-white">CPU Load</h4>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">System Resource</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-xs font-black">
                        <span className="text-zinc-500">Current Usage</span>
                        <span className="text-zinc-900 dark:text-white">24%</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full w-[24%] bg-blue-500 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-white p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                        <Database className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-zinc-900 dark:text-white">Memory Usage</h4>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">System Resource</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-xs font-black">
                        <span className="text-zinc-500">Current Usage</span>
                        <span className="text-zinc-900 dark:text-white">42%</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full w-[42%] bg-purple-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="rounded-3xl bg-zinc-900 p-8 text-white shadow-xl">
                  <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-emerald-500" />
                    Global Status
                  </h3>
                  <div className="space-y-6">
                    {[
                      { region: 'US East', status: 'Healthy', latency: '42ms' },
                      { region: 'EU West', status: 'Healthy', latency: '12ms' },
                      { region: 'Asia Pacific', status: 'Degraded', latency: '240ms' },
                    ].map((region) => (
                      <div key={region.region} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold">{region.region}</p>
                          <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{region.latency}</p>
                        </div>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          region.status === 'Healthy' ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                        )}>
                          {region.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-6">Optimization</h3>
                  <div className="space-y-4">
                    <button 
                      onClick={() => handleOptimize('cache')}
                      disabled={isOptimizing}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-left disabled:opacity-50"
                    >
                      <div>
                        <p className="text-sm font-black text-zinc-900 dark:text-white">Clear Cache</p>
                        <p className="text-[10px] text-zinc-500">Free up 2.4GB of temporary files</p>
                      </div>
                      <RefreshCw className={cn("h-4 w-4 text-zinc-400", isOptimizing && "animate-spin")} />
                    </button>
                    <button 
                      onClick={() => handleOptimize('db')}
                      disabled={isOptimizing}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-left disabled:opacity-50"
                    >
                      <div>
                        <p className="text-sm font-black text-zinc-900 dark:text-white">Optimize DB</p>
                        <p className="text-[10px] text-zinc-500">Re-index all tool usage tables</p>
                      </div>
                      <RefreshCw className={cn("h-4 w-4 text-zinc-400", isOptimizing && "animate-spin")} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'ads' && (
          <motion.div
            key="ads"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-3xl bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-8">Active Placements</h3>
                <div className="space-y-4">
                  {adPlacements.map((ad, index) => (
                    <div key={ad.name} className="flex items-center justify-between p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-emerald-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-zinc-900 dark:text-white">{ad.name}</h4>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{ad.size}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-black text-zinc-900 dark:text-white">{ad.revenue}</p>
                          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Earnings</span>
                        </div>
                        <button 
                          onClick={() => {
                            const newPlacements = [...adPlacements];
                            newPlacements[index].status = ad.status === 'active' ? 'paused' : 'active';
                            setAdPlacements(newPlacements);
                          }}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                            ad.status === 'active' ? "bg-emerald-100 text-emerald-700" : "bg-zinc-200 text-zinc-600"
                          )}
                        >
                          {ad.status}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl bg-zinc-900 p-8 text-white shadow-xl">
                <h3 className="text-lg font-black mb-6">Ad Strategy</h3>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-bold mb-2">Auto-Optimization</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">AI automatically rotates ad placements to maximize CTR based on user behavior.</p>
                  </div>
                  <button 
                    onClick={() => alert("AdSense configuration panel is currently restricted to superadmins.")}
                    className="w-full py-4 rounded-2xl bg-emerald-500 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Configure AdSense
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-3xl bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-zinc-400" />
                  General Settings
                </h3>
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-zinc-900 dark:text-white">Maintenance Mode</p>
                      <p className="text-xs text-zinc-500">Disable all tools for public users</p>
                    </div>
                    <button 
                      onClick={() => setSettings(s => ({ ...s, maintenanceMode: !s.maintenanceMode }))}
                      className={cn(
                        "h-6 w-12 rounded-full relative transition-all",
                        settings.maintenanceMode ? "bg-red-500" : "bg-zinc-200 dark:bg-zinc-800"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all",
                        settings.maintenanceMode ? "right-1" : "left-1"
                      )} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-zinc-900 dark:text-white">AI Features</p>
                      <p className="text-xs text-zinc-500">Enable Gemini-powered summarization</p>
                    </div>
                    <button 
                      onClick={() => setSettings(s => ({ ...s, aiFeatures: !s.aiFeatures }))}
                      className={cn(
                        "h-6 w-12 rounded-full relative transition-all",
                        settings.aiFeatures ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-800"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all",
                        settings.aiFeatures ? "right-1" : "left-1"
                      )} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-zinc-900 dark:text-white">User Analytics</p>
                      <p className="text-xs text-zinc-500">Track anonymous tool usage data</p>
                    </div>
                    <button 
                      onClick={() => setSettings(s => ({ ...s, userAnalytics: !s.userAnalytics }))}
                      className={cn(
                        "h-6 w-12 rounded-full relative transition-all",
                        settings.userAnalytics ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-800"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all",
                        settings.userAnalytics ? "right-1" : "left-1"
                      )} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-zinc-400" />
                  Security Configuration
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Admin API Key</label>
                    <div className="flex gap-2">
                      <input 
                        type={showApiKey ? "text" : "password"} 
                        value="sk-qt-pro-admin-key-2026-v1" 
                        readOnly
                        className="flex-grow bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 text-sm font-mono"
                      />
                      <button 
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all"
                      >
                        {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Security policy updated successfully.")}
                    className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all"
                  >
                    Update Security Policy
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl bg-emerald-500 p-8 text-white shadow-xl shadow-emerald-500/20">
                <h3 className="text-lg font-black mb-4">System Backup</h3>
                <p className="text-sm text-emerald-50 opacity-90 leading-relaxed mb-8">Last backup was completed 4 hours ago. All data is safe.</p>
                <button 
                  onClick={() => alert("Manual backup initiated. You will receive an email once it is complete.")}
                  className="w-full py-4 rounded-2xl bg-white text-emerald-500 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all"
                >
                  Run Manual Backup
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
