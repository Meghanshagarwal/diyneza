"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  X, 
  Calendar, 
  Mail, 
  Phone, 
  FileText,
  User,
  Inbox,
  Loader2
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: "NEW" | "CONTACTED" | "IN_PROGRESS" | "CLOSED";
  source: string;
  notes: string | null;
  assigned_to: string | null;
  created_at: string;
}

interface LeadsClientProps {
  initialLeads: Lead[];
}

export function LeadsClient({ initialLeads }: LeadsClientProps) {
  const router = useRouter();
  const [leads, setLeads] = React.useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<"ALL" | "NEW" | "CONTACTED" | "IN_PROGRESS" | "CLOSED">("ALL");
  
  // Drawer state
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editStatus, setEditStatus] = React.useState<"NEW" | "CONTACTED" | "IN_PROGRESS" | "CLOSED">("NEW");
  const [editNotes, setEditNotes] = React.useState("");
  const [editAssigned, setEditAssigned] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  // Sync state if initialLeads change (from page refetch)
  React.useEffect(() => {
    setLeads(initialLeads);
  }, [initialLeads]);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone && lead.phone.includes(searchTerm));
    
    const matchesStatus = selectedStatus === "ALL" || lead.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenDrawer = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || "");
    setEditAssigned(lead.assigned_to || "");
    setDrawerOpen(true);
  };

  const handleSaveLead = async () => {
    if (!selectedLead) return;

    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("leads")
        .update({
          status: editStatus,
          notes: editNotes || null,
          assigned_to: editAssigned || null
        })
        .eq("id", selectedLead.id);

      if (error) throw error;

      // Update local state
      setLeads((prev) => 
        prev.map((l) => 
          l.id === selectedLead.id 
            ? { ...l, status: editStatus, notes: editNotes || null, assigned_to: editAssigned || null }
            : l
        )
      );

      setDrawerOpen(false);
      setSelectedLead(null);
      router.refresh();
    } catch (err) {
      console.error("Error updating lead:", err);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-zinc-100">
            CRM Leads Pipeline
          </h1>
          <p className="mt-1 text-xs text-zinc-550 font-semibold">
            Track inquiries, update statuses, and coordinate with store leads.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Status Tabs */}
        <div className="flex space-x-1 bg-zinc-950 p-1 rounded-lg border border-zinc-900 text-xs w-full md:w-auto overflow-x-auto">
          {(["ALL", "NEW", "CONTACTED", "IN_PROGRESS", "CLOSED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-1.5 rounded-md font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                selectedStatus === status 
                  ? "bg-primary text-black" 
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {status === "ALL" ? "All Leads" : status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-550" />
          <input
            type="text"
            placeholder="Search name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-zinc-850 bg-zinc-900/40 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-900 bg-zinc-950/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/10 text-zinc-500 font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Prospect</th>
                <th className="py-4 px-6">Contact Info</th>
                <th className="py-4 px-6">Channel</th>
                <th className="py-4 px-6">Assigned To</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => {
                  let statusBadge = "bg-zinc-800 text-zinc-400";
                  if (lead.status === "NEW") statusBadge = "bg-blue-500/10 border border-blue-500/20 text-blue-400";
                  if (lead.status === "CONTACTED") statusBadge = "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400";
                  if (lead.status === "IN_PROGRESS") statusBadge = "bg-primary/10 border border-primary/20 text-primary";
                  if (lead.status === "CLOSED") statusBadge = "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400";

                  return (
                    <tr 
                      key={lead.id} 
                      onClick={() => handleOpenDrawer(lead)}
                      className="hover:bg-zinc-900/20 transition-colors cursor-pointer group"
                    >
                      <td className="py-4.5 px-6 font-semibold text-zinc-200 group-hover:text-primary transition-colors">
                        {lead.name}
                      </td>
                      <td className="py-4.5 px-6 text-zinc-400 space-y-0.5">
                        <div className="flex items-center space-x-1.5">
                          <Mail className="h-3.5 w-3.5 text-zinc-600" />
                          <span>{lead.email}</span>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center space-x-1.5">
                            <Phone className="h-3.5 w-3.5 text-zinc-600" />
                            <span>{lead.phone}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4.5 px-6 text-zinc-500 font-medium">
                        {lead.source}
                      </td>
                      <td className="py-4.5 px-6 text-zinc-400 font-semibold">
                        {lead.assigned_to || <span className="text-zinc-650 italic font-normal">Unassigned</span>}
                      </td>
                      <td className="py-4.5 px-6 text-center">
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${statusBadge}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4.5 px-6 text-zinc-500">
                        {new Date(lead.created_at).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-zinc-500 font-medium">
                    No lead records matched your search parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sliding Side Drawer */}
      {drawerOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Panel */}
          <div className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-900 h-full flex flex-col justify-between p-8 z-10 shadow-2xl overflow-y-auto">
            {/* Header */}
            <div>
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <h3 className="font-heading text-base font-bold text-zinc-200">
                  Lead Details
                </h3>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="text-zinc-500 hover:text-white rounded p-1 hover:bg-zinc-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Core Specs */}
              <div className="mt-6 space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider block">Lead ID</span>
                  <span className="text-[10px] font-semibold text-zinc-500 font-mono mt-0.5 block">{selectedLead.id}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider block">Contact Name</span>
                  <span className="text-sm font-bold text-zinc-100 mt-0.5 block">{selectedLead.name}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider block">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-xs text-primary font-semibold hover:underline mt-0.5 block">
                    {selectedLead.email}
                  </a>
                </div>

                {selectedLead.phone && (
                  <div>
                    <span className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider block">Phone Number</span>
                    <span className="text-xs text-zinc-350 mt-0.5 block">{selectedLead.phone}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider block">Channel Source</span>
                    <span className="text-xs text-zinc-400 font-semibold mt-0.5 block">{selectedLead.source}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-555 uppercase tracking-wider block">Created On</span>
                    <span className="text-xs text-zinc-400 mt-0.5 block">
                      {new Date(selectedLead.created_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions & Editors */}
              <div className="mt-8 border-t border-zinc-900 pt-6 space-y-6">
                {/* Pipeline Status select */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Pipeline Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="CLOSED">CLOSED (WON)</option>
                  </select>
                </div>

                {/* Assigned Agent */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Assigned Agent
                  </label>
                  <input
                    type="text"
                    value={editAssigned}
                    onChange={(e) => setEditAssigned(e.target.value)}
                    placeholder="e.g. Sales Manager, Marco"
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white placeholder-zinc-650 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Notes logs */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Operational Notes
                  </label>
                  <textarea
                    rows={4}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Type details regarding calling details, demo schedules, or discounts..."
                    className="w-full rounded-lg border border-zinc-850 bg-zinc-900 px-3.5 py-2.5 text-xs text-white placeholder-zinc-650 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="border-t border-zinc-900 pt-6 mt-8 flex space-x-3">
              <button
                onClick={() => setDrawerOpen(false)}
                disabled={saving}
                className="flex-1 rounded-lg border border-zinc-800 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 disabled:opacity-50 cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLead}
                disabled={saving}
                className="flex-1 flex items-center justify-center space-x-2 rounded-lg bg-primary py-2.5 text-xs font-bold text-black hover:bg-primary-light disabled:opacity-50 cursor-pointer text-center"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
