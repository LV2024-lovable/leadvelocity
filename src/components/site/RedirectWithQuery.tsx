import { Navigate, useLocation } from "react-router-dom";

/**
 * Redirect die querystring (outreach-/campagnecontext, UTM's) meeneemt.
 * Een hash in het doel (bv. "/prijzen#faq") gaat voor een hash in de oude URL.
 */
export function RedirectWithQuery({ to }: { to: string }) {
  const { search, hash } = useLocation();
  const [pathname, targetHash] = to.split("#");
  return <Navigate replace to={{ pathname, search, hash: targetHash ? `#${targetHash}` : hash }} />;
}
