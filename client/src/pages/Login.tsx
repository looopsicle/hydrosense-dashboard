import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate, useNavigate } from 'react-router-dom';

import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';

export default function Login() {
    const { setLogin } = useAuthStore();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const user = useAuthStore(state => state.user);

    if (user) return <Navigate to="/" />;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        setLogin({
            id: '1',
            username,
            password,
        });

        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans flex items-center justify-center p-4">
            <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleLogin} 
                className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-black/5 w-full max-w-md space-y-8"
            >
                {/* Header Section */}
                <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <Leaf className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">
                        Hydro<span className="text-emerald-500">Sense</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-sm">
                        Welcome back! Please login to your dashboard.
                    </p>
                </div>

                {/* Input Fields */}
                <div className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                            Username
                        </label>
                        <input
                            placeholder="Enter your name"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                            Password
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
                >
                    Login
                </button>
            </motion.form>
        </div>
    );
}