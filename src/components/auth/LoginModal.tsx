import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/logo.jpg';
import {
  Key,
  Lock,
  Eye,
  EyeOff,
  X,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  UserCheck
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, currentUser, logout, setViewMode } = useApp();

  const [username, setUsername] = useState('superadmin');
  const [password, setPassword] = useState('superadmin123*');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const res = login(username, password);
    if (!res.success) {
      setErrorMsg(res.error || 'Error de autenticación.');
    } else {
      setSuccessMsg('¡Sesión iniciada correctamente en Imperio Lux!');
      setViewMode('saas_dashboard');
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-amber-500/40 p-6 sm:p-8 shadow-2xl text-zinc-900 dark:text-zinc-100 overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-amber-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <img
            src={logoImg}
            alt="Imperio Lux"
            className="w-14 h-14 object-contain bg-black border border-amber-500/40 p-0.5 shadow-md shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/30">
              <Sparkles className="w-3 h-3" /> Portal de Acceso Seguro
            </div>
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-amber-100 mt-1">
              Imperio Lux SaaS
            </h2>
          </div>
        </div>

        {/* Current Active Session Status */}
        {currentUser && (
          <div className="mb-6 p-3.5 bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border border-amber-500/50"
              />
              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  {currentUser.name}
                  <span
                    className={`text-[9px] px-1.5 py-0.2 font-bold uppercase border ${
                      currentUser.role === 'superadmin'
                        ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    {currentUser.role}
                  </span>
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                  Sesión activa actual
                </p>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="px-2.5 py-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-colors uppercase"
            >
              Cerrar Sesión
            </button>
          </div>
        )}

        {/* Success Banner */}
        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Banner */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/40 text-rose-700 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
              Usuario de Sistema
            </label>
            <div className="relative">
              <UserCheck className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="superadmin o admin"
                className="w-full pl-9 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs focus:outline-none focus:border-amber-500 text-zinc-900 dark:text-zinc-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresar contraseña"
                className="w-full pl-9 pr-10 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-xs focus:outline-none focus:border-amber-500 text-zinc-900 dark:text-zinc-100"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <Key className="w-4 h-4" /> Iniciar Sesión en Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
