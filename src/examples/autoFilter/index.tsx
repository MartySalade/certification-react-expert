import { AutoFilter } from "../../features/autoFilter";
import { IOption } from "../../features/autoFilter/autoFilter.types";
import { useGetData } from "../hooks/useGetData";
import { Comment } from "../types/comment";
import { User } from "../types/user";

/**
 * This component illustrates 2 examples of AutoFilter usage.
 * The data comes from https://jsonplaceholder.typicode.com/
 * In one case we simply filter a direct key "email"
 * In another case with filter a nested property in the User object ("company.name")
 */
export function AutoFilterExample() {
  const users = useGetData<User>("users");
  const comments = useGetData<Comment>("posts/1/comments");

  const handleValueChange = (selectedValue: IOption) => {
    console.log(selectedValue);
  };

  return (
    <div className="bg-slate-100 p-4 rounded flex flex-col gap-8">
      <h2 className="font-semibold text-xl">Auto-filter exercice</h2>
      <div className="flex gap-8 w-full">
        {users && (
          <AutoFilter
            placeholder="Find a company"
            valueChange={handleValueChange}
            options={users}
            optionKeyToFilter="company.name"
          />
        )}
        {comments && (
          <AutoFilter
            placeholder="Search users email from post"
            valueChange={handleValueChange}
            options={comments}
            optionKeyToFilter="email"
          />
        )}
      </div>
    </div>
  );
}
