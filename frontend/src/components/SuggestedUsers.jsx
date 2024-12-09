import { useSelector } from "react-redux";

import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((state) => state.auth);

  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-meduim cursor-pointer ml-2">See All</span>
      </div>
      {/* <SuggestedUser
        key={suggestedUsers[0]?.id}
        suggestedUser={suggestedUsers[0]}
      /> */}
      {suggestedUsers?.map((suggestedUser) => (
        <SuggestedUser key={suggestedUser?._id} suggestedUser={suggestedUser} />
      ))}
    </div>
  );
};

export default SuggestedUsers;
