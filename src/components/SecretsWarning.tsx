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
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-100 border-b-2 border-red-40 p-4">
      <div className="max-w-4xl mx-auto flex items-start gap-4">
        <AlertCircle className="text-boneWhite flex-shrink-0 mt-1" size={20} />
        <div className="flex-1">
          <p className="text-boneWhite font-semibold text-body-lg mb-2">
            ⚠️ Using Local Secrets (Not Production Environment Variables)
          </p>
          <p className="text-boneWhite text-body-sm mb-3">
            Missing environment variables: <code className="bg-red-60 text-boneWhite px-2 py-1 rounded">{status.missingVars.join(", ")}</code>
          </p>
          <div className="text-boneWhite text-body-sm space-y-1">
            <p><strong>Fix:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Local: Set variables in <code className="bg-red-60 text-boneWhite px-1">.env.local</code></li>
              <li>Production: Add variables in Vercel dashboard → Settings → Environment Variables</li>
              <li>Then restart dev server or redeploy in Vercel</li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 text-boneWhite hover:text-boneWhite/80 transition-colors"
          aria-label="Dismiss warning"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
