export default function Card(props: { imagePath: string; title: string }) {
  return (
    <div>
      <img src={props.imagePath} alt="" className="card-image" />
      <h2>{props.title}</h2>
    </div>
  );
}
