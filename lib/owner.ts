export const OWNER_ADDRESS = "0xF4BAaf1D85753A857Aa9C4AeBa877D7864bE48aA" as const;

export function isOwner(address?: string | null): boolean {
  if (!address) return false;
  return address.toLowerCase() === OWNER_ADDRESS.toLowerCase();
}

export const OWNER_LINKS = {
  farcaster: "@badman666",
  x: "@okfreelancer",
  github: "OkfreelancerAi",
} as const;
