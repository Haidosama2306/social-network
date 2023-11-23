import { ReactNode } from "react";
import styles from "./styles.module.css";

export default function Content({children,}) {
    return <div className={`${styles.content}`}>{children}</div>;
}
