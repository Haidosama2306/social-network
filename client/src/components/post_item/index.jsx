import { useState } from "react";
import { currentUser } from "../../common/data/current_user";
// import { Post } from "../../common/models";
import ModalComment from "../Modal/Modal_Comment";
import { StringUtils } from "../../utils";
import {
  IconComment,
  IconEmoji,
  IconHeart,
  IconMore,
  IconSaved,
  IconShare,
} from "../icons";
import { IconApp } from "../icon_app";
import UserAvatarStory from "../user_avatar_story";

export default function PostItem({ post }) {
  const userNameOfAuthor = StringUtils.displayUserName(post.user.userName);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white mt-4 rounded-lg border-[1px]">
      {/* Header */}
      <div className="flex flex-row my-2 items-center pl-3">
        <UserAvatarStory
          url={post.user.avatar}
          size={32}
          haveSeenBefore={false}
        />
        <div className="flex flex-col grow mx-2">
          <p className="text-sm font-semibold">{userNameOfAuthor}</p>
        </div>
        <IconApp icon={<IconMore />} onClick={() => console.log("")} />
      </div>
      {/* Media */}
      <img
        draggable={false}
        className="max-h-[30rem] w-full"
        src={post.image}
        alt=""
      />

      {/* List Icons */}
      <div className="flex flex-row m-1">
        <IconApp icon={<IconHeart />} onClick={() => console.log("")} />

      
        <IconApp icon={<IconComment />} onClick= {(handleOpenModal)} />
      
      <ModalComment open={isModalOpen} onClose={handleCloseModal}/>
        <IconApp icon={<IconShare />} onClick={() => console.log("")} />
        <div className="grow ">
          <IconApp
            icon={<IconSaved />}
            className="float-right"
            onClick={() => console.log("")}
          />
        </div>
      </div>

      {/* Total Likes 
        1: Liked (Current User)
        2: Not yet
      */}
      <div className="ml-3">
      {post.isLiked ? (
        <div>
          <p className="text-sm">
            Like by{" "}
            <span className="font-semibold">{StringUtils.displayUserName(currentUser.userName)}</span> and{" "}
            <span className="font-semibold">{StringUtils.formatNumber(post.totalLike - 1)} others</span>
          </p>
        </div>
      ) : (
        <span className="text-sm font-semibold">{StringUtils.formatNumber(post.totalLike)} likes</span>
      )}
      </div>
      

      {/* Description */}
      <div className="mx-3 my-2">
        <p className="text-sm">
          <span className="font-semibold">{userNameOfAuthor}</span> {post.description}
        </p>
      </div>

      {/* Total comments */}
      <div className="mx-3 my-2">
        <p className="text-sm font-medium text-secondary-text">
          View all {StringUtils.formatNumber(post.totalCmt)} comments
        </p>
      </div>

      {/* created time */}
      <div className="mx-3 my-2 text-secondary-text text-[10px]">
        3 HOURS AGO
      </div>

      <div className="flex flex-row items-center border-t-[1px] border-t-post-separator mx-1 py-2">
        <IconApp icon={<IconEmoji />} onClick={() => {}} />
        <div className="grow">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full pl-1 pr-5 h-5 focus:outline-none focus:border-transparent"
          />
        </div>
        <button className="mr-3 text-primary-button font-semibold">Post</button>
      </div>
    </div>
  );
}
