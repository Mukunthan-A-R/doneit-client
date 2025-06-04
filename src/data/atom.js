import { atom } from "recoil";

export const userData = atom({
  key: "userData",
  default: {
    token: null,
    user_id: null,
    name: "",
    email: "",
    loggedIn: false,
  },
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        setSelf(JSON.parse(storedUser));
      }

      onSet((newValue) => {
        if (newValue?.token) {
          localStorage.setItem("userData", JSON.stringify(newValue));
        } else {
          localStorage.removeItem("userData");
        }
      });
    },
  ],
});

export const ProjectState = atom({
  key: "ProjectState",
  default: null,
});

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

export const refetchTriggerAtom = atom({
  default: 0,
  key: "refetchTrigger",
});
