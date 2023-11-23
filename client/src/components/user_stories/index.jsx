import React, { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import { listStories } from "../../common/data/list_stories";
import UserAvatarStory from "../user_avatar_story";

export default function UserStories() {
  const ref = useRef();
  const { events } = useDraggable(ref);

  return (
    <div className="mt-6 bg-white border-[1px] rounded-lg whitespace-nowrap overflow-x-hidden" {...events} ref={ref}>
      {listStories.map((e, index) => {
        return (
          <div className="py-4 px-[6px] first:pl-3 last:pr-6 cursor-pointer inline-block" key={e.id}>
            <div className="flex flex-col justify-center items-center">
              <UserAvatarStory url={e.avatar} size={56} haveSeenBefore={e.haveSeenBefore} />
              <p className="text-ellipsis overflow-hidden max-w-[74px] text-xs pt-[6px] px-[2px]" style={{ color: e.haveSeenBefore ? 'grey' : 'black' }}>
                {e.userName.replace("#", "").trimStart()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
