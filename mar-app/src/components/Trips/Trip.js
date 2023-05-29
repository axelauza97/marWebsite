import classes from "./Trip.module.css";
const Trip = (props) => {
  return (
    <div className={classes.card}>
      <img
        className={classes.card_img}
        src={require(`../../assets/${props.image}.jpg`)}
        alt=""
      />
      <h4 className={classes.card_title}>{props.title}</h4>
      <div className={classes.card_body}>
        <p className={classes.card_text}>{props.body}</p>
        <button className={classes.card_button}>{props.button}</button>
      </div>
    </div>
  );
};

export default Trip;
