import "../styles/scss/taskbox.scss";

interface TaskBoxProps {
  title: string;
  subTitle: string;
}

export const TaskBox: React.FC<TaskBoxProps> = ({ title, subTitle }) => (
  <div className="taskbox">
    <p className="title">{title}</p>
    <p className="subtitle">{subTitle}</p>
  </div>
);




