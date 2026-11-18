export type MaintenanceOption = {
  id: "managed" | "self-managed";
  label: string;
  headline: string;
  description: string;
  capabilities: string[];
};

export const maintenanceOptions: MaintenanceOption[] = [
  {
    id: "managed",
    label: "Managed Maintenance",
    headline: "We manage it.",
    description:
      "Focus on running your business while we take care of the technical details.",
    capabilities: [
      "Website and workflow monitoring",
      "Technical maintenance",
      "Bug troubleshooting",
      "Minor content updates",
      "Integration maintenance",
      "Ongoing technical support",
    ],
  },
  {
    id: "self-managed",
    label: "Self-Managed Handover",
    headline: "You manage it.",
    description:
      "Take full control of your website or workflow with the tools, access, documentation, and training needed to manage it independently.",
    capabilities: [
      "Client-owned production accounts",
      "Project assets and exports, where applicable",
      "Accessible CMS or management interface",
      "Maintenance documentation",
      "Recorded walkthroughs",
      "Personalized training",
      "Troubleshooting guides",
      "Account and integration inventory",
    ],
  },
];

export const ownershipNote =
  "Either way, production accounts — hosting, domains, CMS and automation platforms — are set up in your name. Ownership is never reserved for one arrangement, and you can switch between them at any time.";
