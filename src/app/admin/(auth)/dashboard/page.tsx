import Link from "next/link";
import { 
  Inbox, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 0;

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const activeLeads = leads || [];
  
  // Calculate KPI metrics
  const totalCount = activeLeads.length;
  const newCount = activeLeads.filter(l => l.status === "NEW").length;
  const inProgressCount = activeLeads.filter(l => l.status === "IN_PROGRESS").length;
  const closedCount = activeLeads.filter(l => l.status === "CLOSED").length;
  const contactedCount = activeLeads.filter(l => l.status === "CONTACTED").length;

  const recentLeads = activeLeads.slice(0, 5);

  // SVG Chart data
  const statuses = [
    { name: "New", count: newCount, color: "#3B82F6" },
    { name: "Contacted", count: contactedCount, color: "#EAB308" },
    { name: "In Progress", count: inProgressCount, color: "#FF6B00" },
    { name: "Closed (Won)", count: closedCount, color: "#10B981" }
  ];
  
  const maxCount = Math.max(...statuses.map(s => s.count), 5); // Fallback scale

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-zinc-100 sm:text-3xl">
          Operations Overview
        </h1>
        <p className="mt-1 text-xs text-zinc-500 font-semibold">
          Monitor your CRM leads pipeline, dynamic plans, and journal articles.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Leads */}
        <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5 relative overflow-hidden">
          <div className="flex justify-between items-start text-zinc-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Leads</span>
            <Inbox className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="font-heading text-2xl font-black text-white">{totalCount}</span>
            <span className="text-[9px] font-bold text-zinc-500">records</span>
          </div>
        </div>

        {/* New Leads */}
        <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5 relative overflow-hidden">
          <div className="flex justify-between items-start text-zinc-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">New</span>
            <AlertCircle className="h-4 w-4 text-blue-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="font-heading text-2xl font-black text-white">{newCount}</span>
            <span className="text-[9px] font-semibold text-blue-500 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.2 rounded">
              Needs Attention
            </span>
          </div>
        </div>

        {/* In Progress */}
        <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5 relative overflow-hidden">
          <div className="flex justify-between items-start text-zinc-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">In Progress</span>
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="font-heading text-2xl font-black text-white">{inProgressCount}</span>
            <span className="text-[9px] font-semibold text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.2 rounded">
              Active Call
            </span>
          </div>
        </div>

        {/* Closed Won */}
        <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5 relative overflow-hidden">
          <div className="flex justify-between items-start text-zinc-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Closed Won</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="font-heading text-2xl font-black text-white">{closedCount}</span>
            <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">
              Converted
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Custom SVG Chart */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-900 bg-zinc-900/10 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
            <h3 className="font-heading text-sm font-bold text-zinc-300 flex items-center space-x-1.5">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>CRM Pipeline Metrics</span>
            </h3>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Live Status Breakdown</span>
          </div>

          {/* SVG Bar Chart */}
          <div className="mt-6 flex flex-col justify-end h-60">
            <div className="flex justify-around items-end h-48 border-b border-zinc-800 pb-2">
              {statuses.map((s, idx) => {
                const percentageHeight = (s.count / maxCount) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center group w-20">
                    {/* Tooltip value */}
                    <span className="text-[10px] font-bold text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity mb-1 block">
                      {s.count}
                    </span>
                    {/* Bar */}
                    <div 
                      style={{ 
                        height: `${Math.max(percentageHeight, 5)}%`,
                        backgroundColor: s.color 
                      }} 
                      className="w-12 rounded-t-md transition-all duration-500 opacity-80 hover:opacity-100 hover:scale-x-105"
                    />
                  </div>
                );
              })}
            </div>
            {/* X-Axis labels */}
            <div className="flex justify-around pt-3 text-[10px] font-bold text-zinc-500">
              {statuses.map((s, idx) => (
                <span key={idx} className="w-20 text-center truncate">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Recent Leads */}
        <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-6">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-4">
            <h3 className="font-heading text-sm font-bold text-zinc-300">
              Recent Submissions
            </h3>
            <Link 
              href="/admin/leads" 
              className="text-[10px] text-primary font-bold uppercase tracking-wider hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead: any) => {
                let badgeColor = "bg-zinc-800 text-zinc-400";
                if (lead.status === "NEW") badgeColor = "bg-blue-500/10 border border-blue-500/20 text-blue-400";
                if (lead.status === "CONTACTED") badgeColor = "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400";
                if (lead.status === "IN_PROGRESS") badgeColor = "bg-primary/10 border border-primary/20 text-primary";
                if (lead.status === "CLOSED") badgeColor = "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400";

                return (
                  <div key={lead.id} className="flex justify-between items-center p-3 border border-zinc-900 rounded-lg bg-zinc-950/20 hover:border-zinc-800 transition-colors">
                    <div className="min-w-0 pr-3">
                      <span className="text-xs font-semibold text-zinc-300 truncate block">
                        {lead.name}
                      </span>
                      <span className="text-[10px] text-zinc-550 truncate block mt-0.5">
                        {lead.email}
                      </span>
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${badgeColor} shrink-0`}>
                      {lead.status}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-zinc-500 text-xs font-semibold">
                No lead records available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
