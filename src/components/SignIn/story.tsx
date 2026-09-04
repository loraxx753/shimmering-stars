import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { SignIn } from ".";

const meta: Meta<typeof SignIn> = {
  component: SignIn,
  parameters: {
    docs: {
      subtitle: "Reusable sign-in for any Meanwhile app.",
      description: {
        component:
          "Named providers are instances: google, github, apple, facebook, microsoft, email. OAuth values live in the parent app at config/auth.yaml. The app supplies onProviderSelect / onEmailSubmit.",
      },
    },
  },
  args: {
    onProviderSelect: fn(),
    onEmailSubmit: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof SignIn>;

export const Default: Story = {};

export const GoogleAndGitHub: Story = {
  args: {
    providers: ["google", "github"],
  },
};

export const WixEquivalent: Story = {
  args: {
    title: "Welcome back",
    description: "Sign in to manage bookings, packs, and memberships.",
    providers: ["google", "github", "apple", "facebook", "microsoft", "email"],
  },
};

export const LoadingGoogle: Story = {
  args: {
    providers: ["google", "github"],
    loadingProvider: "google",
  },
};
