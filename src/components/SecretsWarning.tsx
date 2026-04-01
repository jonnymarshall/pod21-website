import { AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { checkSecretsStatus } from "@/utils/secretsLoader";

export const SecretsWarning = () => {
  const [dismissed, setDismissed] = useState(false);
  const status = checkSecretsStatus();

  if (dismissed || status.usingEnvVars) {
    return null;
  }

  return (
    <div className="w-full bg-red-100 border-b-2 border-red-40 p-4 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-start gap-4">
        <AlertCircle className="text-carbonBlack flex-shrink-0 mt-1" size={20} />
        <div className="flex-1">
          <p className="text-carbonBlack font-semibold text-body-lg mb-2">
            ⚠️ Using Local Secrets (Not Production Environment Variables)
          </p>
          <p className="text-carbonBlack text-body-sm mb-3">
            Missing environment variables: <code className="bg-white text-carbonBlack px-2 py-1 rounded font-mono">{status.missingVars.join(", ")}</code>
          </p>
          <div className="text-carbonBlack text-body-sm space-y-1">
            <p><strong>Fix:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Local: Set variables in <code className="bg-white text-carbonBlack px-1 font-mono">.env.local</code></li>
              <li>Production: Add variables in Vercel dashboard → Settings → Environment Variables</li>
              <li>Then restart dev server or redeploy in Vercel</li>
              <li>See <code className="bg-white text-carbonBlack px-1 font-mono">SECRETS_SETUP.md</code> (local) or <code className="bg-white text-carbonBlack px-1 font-mono">VERCEL_SETUP.md</code> (production) for detailed instructions</li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 text-carbonBlack hover:text-carbonBlack/80 transition-colors"
          aria-label="Dismiss warning"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
