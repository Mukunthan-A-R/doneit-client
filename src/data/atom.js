import { atom } from "recoil";

export const userData = atom({
  key: "userData",
  default: {
    isLoading: false,
    error: null,
    user: null,
    requireLogin: false,
  },
});

export const ProjectState = atom({
  key: "ProjectState",
  default: null,
});

/** Discard this soon. first replace all "CurrentProject" usage with useProject hook and then delete this. */
export const CurrentProject = atom({
  key: "CurrentProject",
  default: {
    id: null,
    name: "",
    description: "",
    project_id: null,
    start_date: null,
    end_date: null,
    priority: "",
    status: "",
  },
});

/** use this only from now on */
export const CurrentProjectState = atom({
  key: "CurrentProjectState",
  default: {
    project: null,
    isLoading: false,
    error: null,
    id: null,
  },
});

export const CurrentProjectTasks = atom({
  key: "CurrentProjectTasks",
  default: {
    project_id: null,
    isLoading: false,
    error: null,
    tasks: null,
  },
});

export const refetchTriggerAtom = atom({
  default: 0,
  key: "refetchTrigger",
});

export const createProjectToggle = atom({
  default: false,
  key: "createProjectToggle",
});
