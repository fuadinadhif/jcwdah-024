import styles from "./Card.module.css";

export default function Card(props: { imagePath: string; title: string }) {
  return (
    <div>
      <img src={props.imagePath} alt="" className={styles.cardImage} />
      <h2 className={styles.title}>{props.title}</h2>
    </div>
  );
}
