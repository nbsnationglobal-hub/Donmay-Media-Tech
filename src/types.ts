/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AppNode {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  architectureStack: string[];
  capabilities: string[];
  simulationType: "forex" | "football" | "media" | "security" | "cloud";
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: "development" | "audio" | "media" | "marketing";
  description: string;
  deliverables: string[];
  priceRange: string;
  deliveryTime: string;
}

export interface UserSubscription {
  email: string;
  mt5Id?: string;
  teamName?: string;
  appName: string;
  subscribedAt: string;
  status: "pending_activation" | "active";
}
