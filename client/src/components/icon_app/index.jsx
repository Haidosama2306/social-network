export const IconApp = ({
  icon,
  onClick,
  className,
}) => {
    return (
        <div className={`${className} p-2 cursor-pointer`} onClick={onClick}>
            {icon}
        </div>
    )
};
