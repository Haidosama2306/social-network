import styles from "./styles.module.css";

export default function NavItem({
  icon,
  activeIcon,
  isActive,
  title,
  onClick,
}) {
  return (
    <div className={`${styles.nav_item}`} onClick={onClick}>
      {isActive ? activeIcon : icon}
      <p
        className={`${styles.nav_title} text-base pl-4`}
        style={{ fontWeight: isActive ? "600" : "normal" }}
      >
        {title}
      </p>
    </div>
  );
}
