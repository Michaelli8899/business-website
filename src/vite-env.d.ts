/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_NOINDEX?: string;
  readonly VITE_CONTACT_ENDPOINT?: string;
  readonly VITE_BOOKING_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_PRIVACY_LAST_UPDATED?: string;
  readonly VITE_PRIVACY_REVIEWED?: string;
  readonly VITE_HOSTING_PROVIDER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
