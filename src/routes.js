import Playing from "./components/Playing";
import Result from "./components/Result";

const router = [
  {
    path: "/",
    element: <Playing />,
  },
  {
    path: "/result",
    element: <Result />,
  },
];

export default router;
