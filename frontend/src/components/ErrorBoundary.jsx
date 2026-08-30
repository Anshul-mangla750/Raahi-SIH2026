import React, { Component } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-slate-950 text-slate-100">
          <div className="flex flex-col items-center w-full max-w-2xl p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
            <AlertTriangle
              size={48}
              className="text-amber-500 mb-6 flex-shrink-0 animate-pulse"
            />

            <h2 className="text-xl font-bold text-slate-100 mb-4">An unexpected error occurred.</h2>

            <div className="p-4 w-full rounded-xl bg-slate-950 border border-slate-800 overflow-auto mb-6">
              <pre className="text-sm font-mono text-slate-400 whitespace-pre-wrap">
                {this.state.error?.stack || this.state.error?.toString()}
              </pre>
            </div>

            <button
              onClick={() => window.location.reload()}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold",
                "bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer transition-colors shadow-lg shadow-emerald-900/30"
              )}
            >
              <RotateCcw size={16} />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
