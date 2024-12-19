import { Logo } from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignIn from "./sign-in/page";
import SignUp from "./sign-up/page";

export default function AuthLayout() {
  return (
    <div className="container mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
      <Logo />

      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold">Welcome to ProjectHub</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your projects with ease
        </p>
      </div>
      <Tabs defaultValue="sign-in" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in" className="font-bold">
            Sign In
          </TabsTrigger>
          <TabsTrigger value="sign-up" className="font-bold">
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignIn />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}
