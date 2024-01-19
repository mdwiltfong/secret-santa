import "bootstrap/dist/css/bootstrap.min.css";
import { DaysTillChristmasUtil } from "../util/DaysTillChristmasUtil";

function Home() {
  const days: number = DaysTillChristmasUtil();
  const months: number = Math.floor(days / 30);

  return (
    <>
      <div className="background-morespace">
        <div className="container">
          <div className="christmas-box">
            <h1 className="box-text text-center ">
              {months < 1 ? days : months}
            </h1>
            <p className="box-description text-center">
              {months >= 1
                ? months == 1
                  ? "Month till Christmas"
                  : "Months till Christmas"
                : "Days till Christmas"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
