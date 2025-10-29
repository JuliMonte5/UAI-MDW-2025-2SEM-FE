import { selectCount } from "../../features/counter/counterSlice";
import { useAppSelector } from "../../store/hooks";

const AboutPage = () => {
  const count = useAppSelector(selectCount)

  console.log("Current count desde ABOUT:", count);
  return <div>About Us</div>;
};

export default AboutPage;
