import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCurrentUser } from "@/features/auth/actions";
import { getUsersIdAndName } from "@/features/projects/actions";

import ProjectFormClient from "./create-project-client";

const ProjectForm = async () => {
  const clients = await getUsersIdAndName();

  const currentUser = await getCurrentUser();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project Information</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Please fill in your project details below.
        </DialogDescription>
        <ProjectFormClient clients={clients} userId={currentUser.id} />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
