import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Info,
  Clock,
  Filter,
  Download,
  Terminal,
  Crown
} from 'lucide-react';
import { AuditLog } from '../../types';

export const SaasAuditLogs: React.FC = () => {
  const { auditLogs, currentUser } = useApp();
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredLogs = auditLogs.filter((log) => {
    if (filterSeverity !== 'all' && log.severity !== filterSeverity) return false;
    if (filterRole !== 'all' && log.role !== filterRole) return false;
    return true;
  });

  const isSuperAdmin = currentUser?.role === 'superadmin';

  const exportLogs = () => {
    const jsonStr = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `imperio_luz_audit_logs_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30 mb-2">
            <FileText className="w-3.5 h-3.5" /> Registro de Seguridad & Auditoría
          </div>
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-100">
            Historial de Operaciones de Sistema
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Traza de eventos de autenticación, ajustes de inventario y acciones administrativas realizadas por superadmin y admin.
          </p>
        </div>

        <button
          onClick={exportLogs}
          className="px-4 py-2.5 bg-zinc-900 dark:bg-zinc-800 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-500/40 hover:bg-zinc-800 transition-all shrink-0"
        >
          <Download className="w-4 h-4" /> Exportar Auditoría JSON
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300">
            Filtros de Registros:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Severity filter */}
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500 font-medium"
          >
            <option value="all">Todas las Severidades</option>
            <option value="info">Información (Info)</option>
            <option value="warning">Advertencias (Warning)</option>
            <option value="critical">Alertas Críticas</option>
          </select>

          {/* Role filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-amber-500 font-medium"
          >
            <option value="all">Todos los Roles</option>
            <option value="superadmin">SuperAdmin</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Logs Table / Terminal Display */}
      <div className="bg-zinc-950 text-zinc-200 border border-amber-500/30 font-mono shadow-2xl overflow-hidden">
        <div className="bg-zinc-900 px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider">
            <Terminal className="w-4 h-4" /> Consola de Eventos en Tiempo Real
          </div>
          <span className="text-[10px] text-zinc-500 uppercase">
            Total Eventos: {filteredLogs.length}
          </span>
        </div>

        <div className="p-4 space-y-2 max-h-[500px] overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <p className="text-xs text-zinc-500 py-6 text-center italic">
              No hay eventos coincidentes con los filtros seleccionados.
            </p>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 bg-zinc-900/60 border-l-4 border-zinc-800 hover:border-amber-500 transition-colors space-y-1 text-xs"
                style={{
                  borderLeftColor:
                    log.severity === 'critical'
                      ? '#ef4444'
                      : log.severity === 'warning'
                      ? '#f59e0b'
                      : '#10b981'
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" /> {log.timestamp}
                    </span>
                    <span
                      className={`px-1.5 py-0.2 text-[9px] font-bold uppercase ${
                        log.role === 'superadmin'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {log.role === 'superadmin' ? '👑 SuperAdmin' : '🛡️ Admin'}
                    </span>
                    <span className="text-zinc-300 font-bold">@{log.username}</span>
                  </div>

                  <span className="text-[10px] text-zinc-500 font-mono">
                    IP: {log.ipAddress} | ID: {log.id}
                  </span>
                </div>

                <div className="font-bold text-amber-200 text-xs pt-0.5">
                  {log.action}
                </div>

                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  {log.details}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
