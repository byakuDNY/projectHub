import { getCurrentUser } from "@/features/auth/actions";
import { getUsersIdAndName } from "@/features/projects/actions";

import ProjectFormClient from "./create-project-client";

const ProjectForm = async () => {
  const clients = await getUsersIdAndName();

  const currentUser = await getCurrentUser();
  return (
    <ProjectFormClient clients={clients} appwriteId={currentUser.accountId} />
  );
};

export default ProjectForm;
