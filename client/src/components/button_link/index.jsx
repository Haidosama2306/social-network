export const ButtonLink = ({
  textBtn,
  onClick,
}) => {
  return (
    <button className="text-primary-button text-xs font-bold" onClick={onClick}>
      {textBtn}
    </button>
  );
};
