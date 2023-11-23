export const MenuAvatar = ({
  url,
  size = 24,
  isActive,
}) => {
  return (
    <img
      src={url}
      style={{ width: `${size}px`, height: `${size}px`, border: isActive ? '2px solid #000' : 'none' }}
      className="rounded-full"
      alt=""
    />
  );
};
