import useSWR from "swr";
import type { ThreadsResponse as GmailThreadsResponse } from "@/app/api/google/threads/controller";
import type { ThreadsResponse as MicrosoftThreadsResponse } from "@/app/api/microsoft/threads/controller";
import { useAccount } from "@/providers/EmailAccountProvider";

type ThreadsResponse = GmailThreadsResponse | MicrosoftThreadsResponse;

export function useThreads({
  fromEmail,
  limit,
  type,
  refreshInterval,
}: {
  fromEmail?: string;
  type?: string;
  limit?: number;
  refreshInterval?: number;
}) {
  const { provider } = useAccount();
  const searchParams = new URLSearchParams();
  if (fromEmail) searchParams.set("fromEmail", fromEmail);
  if (limit) searchParams.set("limit", limit.toString());
  if (type) searchParams.set("type", type);
  console.log("TEST LOG 8");
  const url = `/api/${provider === "google" ? "google" : "microsoft"}/threads?${searchParams.toString()}`;
  console.log("TEST LOG 9");
  const { data, isLoading, error, mutate } = useSWR<ThreadsResponse>(url, {
    refreshInterval,
  });

  return { data, isLoading, error, mutate };
}
