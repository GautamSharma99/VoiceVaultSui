import { useEffect, useState } from "react";
import { useSuiClient } from "@mysten/dapp-kit";
import { CONTRACTS } from "@/lib/contracts";

export function useGlobalRegistry() {
  const suiClient = useSuiClient();
  const [voiceOwners, setVoiceOwners] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRegistry = async () => {
    if (!CONTRACTS.VOICE_REGISTRY_ID || CONTRACTS.VOICE_REGISTRY_ID === "0x") {
      setVoiceOwners([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const obj = await suiClient.getObject({
        id: CONTRACTS.VOICE_REGISTRY_ID,
        options: { showContent: true },
      });

      const content = obj.data?.content;
      if (content?.dataType === "moveObject") {
        const fields = content.fields as any;
        const owners: string[] = fields.voice_owners ?? [];
        setVoiceOwners(owners);
      }
    } catch (err: any) {
      console.error("Failed to fetch global voice registry:", err);
      setError(err.message || "Failed to fetch registry");
      setVoiceOwners([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistry();
  }, [suiClient, CONTRACTS.VOICE_REGISTRY_ID]);

  return { voiceOwners, isLoading, error, refetch: fetchRegistry };
}
