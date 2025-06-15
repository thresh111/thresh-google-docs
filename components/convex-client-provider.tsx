"use client";

import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth, SignIn } from "@clerk/nextjs";

import FullscreenLoading from "./fullscreen-loading";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex justify-center items-center h-screen w-screen">
            <SignIn routing={"hash"} />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullscreenLoading label={"Auth documents..."} />;
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
