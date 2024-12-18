import { Logo } from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignIn from "./sign-in/page";
import SignUp from "./sign-up/page";

export default function AuthLayout() {
  return (
    // <div className="flex min-h-screen bg-gray-100">
    //   <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
    //     <div className="mx-auto w-full max-w-sm lg:w-96">
    //       <div className="text-center">
    //         <Image
    //           src="/placeholder.svg?height=40&width=40"
    //           alt="Logo"
    //           width={40}
    //           height={40}
    //           className="mx-auto h-10 w-auto"
    //         />
    //         <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
    //           Welcome to ProjectPro
    //         </h2>
    //         <p className="mt-2 text-sm text-gray-600">
    //           Manage your projects with ease
    //         </p>
    //       </div>

    //       <Tabs defaultValue="sign-in" className="mt-8">
    //         <TabsList className="grid w-full grid-cols-2">
    //           <TabsTrigger value="sign-in">Sign In</TabsTrigger>
    //           <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
    //         </TabsList>
    //         <TabsContent value="sign-in">
    //           <SignIn />
    //         </TabsContent>
    //         <TabsContent value="sign-up">
    //           <SignUp />
    //         </TabsContent>
    //       </Tabs>
    //     </div>
    //   </div>
    //   <div className="relative hidden w-0 flex-1 lg:block">
    //     <Image
    //       className="absolute inset-0 h-full w-full object-cover"
    //       src="/placeholder.svg?height=1080&width=1920"
    //       alt="Project management illustration"
    //       width={1920}
    //       height={1080}
    //     />
    //   </div>
    // </div>
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
