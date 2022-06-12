import { ArrayOf, makeDryType, Record, String } from "drytypes";
import { apiCallCreator } from "./netutils";

// temp
const Any = makeDryType<any>((x) => ({ success: true }));

const apis = {
  login: apiCallCreator<{ username: string; password: string }>("/user/login")({
    token: String,
  }),

  register: apiCallCreator<{
    fullname: string;
    username: string;
    email: string;
    password: string;
  }>("/user/register")(),

  tasks: {
    list: apiCallCreator<{}>(
      "/task/getall",
      "GET"
    )({
      tasks: ArrayOf(
        Record({
          _id: String,
          tags: ArrayOf(String),
          title: String,
          datetime: Any,
        })
      ),
    }),

    create: apiCallCreator<{
      title: string;
      description: string;
      notification: boolean;
      location: string;
      link: string;
      datetime: string;
      tags: string[];
    }>("/task/new")(),

    delete: apiCallCreator<{
      id: string;
    }>("/task/delete", "POST")(),
  },
} as const;

export default apis;
