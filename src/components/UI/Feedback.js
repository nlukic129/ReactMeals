import classes from "./Feedback.module.css";

const Feedback = (props) => {
  return (
    <div className={props.isSuccess ? classes.success : classes.error}>
      {props.children}
    </div>
  );
};

export default Feedback;
