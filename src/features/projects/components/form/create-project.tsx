import { getCurrentUser } from "@/features/auth/actions";
import {
  getClientsIdAndName,
  getUserIdByAppwriteId,
} from "@/features/projects/actions";

import ProjectFormClient from "./create-project-client";

const ProjectForm = async () => {
  const currentUser = await getCurrentUser();

  const userId = await getUserIdByAppwriteId(currentUser.accountId);

  const clients = await getClientsIdAndName(userId);

  return <ProjectFormClient clients={clients} userId={userId} />;
};

export default ProjectForm;
