export const CircleAvatar = ({
  url,
  size,
  onClick,
}) => {
    return (
        <img
            src={url}
            style={{width: `${size}px`, height: `${size}px`}}
            onClick={onClick}
            className="rounded-full border-[1px]"
            alt=""
            draggable={false}
        />
    );
};
