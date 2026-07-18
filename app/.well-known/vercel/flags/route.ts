import { getProviderData } from "@flags-sdk/vercel";
import { createFlagsDiscoveryEndpoint } from "flags/next";

import * as flags from "@/app/lib/flags";

export const GET = createFlagsDiscoveryEndpoint(async () => {
  return getProviderData(flags);
});
