import { Tab } from "@headlessui/react";
import Published from "./Published";
import Draft from "./Draft";
import Trash from "./Trash";
import { useQuery } from "react-query";
import { getAllArticle } from "../../constants/api";

export default function TabMenu() {
  const { data, isLoading } = useQuery("getAllArticle", () =>
    getAllArticle({ limit: 100, offset: 0 })
  );

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className=" m-3">
      <Tab.Group>
        <Tab.List className="w-1/2 flex shadow-md rounded-md">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-2/6 text-sm py-2  transition-all duration-300 relative rounded-l-sm",
                selected
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100  border border-gray-300"
              )
            }
          >
            Published
            <span className="absolute top-0  text-xs right-10 bg-gray-500 w-5 h-5 flex flex-col justify-center rounded-full text-white">
              {data?.data?.filter((post) => post.status === "Published").length}
            </span>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-2/6 text-sm py-2 transition-all duration-300 relative ",
                selected
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100  border border-gray-300"
              )
            }
          >
            Drafts
            <span className="absolute top-0  text-xs right-12 bg-gray-500 w-5 h-5 flex flex-col justify-center rounded-full text-white">
              {data?.data?.filter((post) => post.status === "Drafts").length}
            </span>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-2/6 text-sm py-2 transition-all  duration-300 relative rounded-r-sm",
                selected
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100  border border-gray-300"
              )
            }
          >
            Trashed
            <span className="absolute top-0  text-xs right-10 bg-gray-500 w-5 h-5 flex flex-col justify-center rounded-full text-white">
              {data?.data?.filter((post) => post.status === "Trashed").length}
            </span>
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Published
              data={data?.data?.filter((post) => post.status === "Published")}
              isLoading={isLoading}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Draft
              data={data?.data?.filter((post) => post.status === "Drafts")}
              isLoading={isLoading}
            />
          </Tab.Panel>
          <Tab.Panel>
            <Trash
              data={data?.data?.filter((post) => post.status === "Trashed")}
              isLoading={isLoading}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
