import { CircleAvatar } from "../circle_avatar";

export const ItemRow = ({
  leftItem,
  url,
  size = 56,
  bodyItem,
  title,
  subTitle,
  subTitleItem,
  rightItem,
}) => {
  return (
    <div className="flex flex-row items-center my-4">
      {leftItem ?? (
        <CircleAvatar
          url={url}
          size={size}
          onClick={function (){
            throw new Error("Function not implemented.");
          }}
        />
      )}
      {bodyItem ?? (
        <div className="flex flex-col px-3 grow">
          <p className="text-sm font-semibold cursor-pointer">{title}</p>
          {subTitleItem ?? (
            <p className="text-sm font-medium text-secondary-text text-ellipsis">
              {subTitle}
            </p>
          )}
        </div>
      )}
      {rightItem}
    </div>
  );
};
