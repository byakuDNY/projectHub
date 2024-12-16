"use client";

import { useParams } from "next/navigation";

const Project = () => {
  const { id } = useParams();
  return <div>Project: {id}</div>;
};

export default Project;
