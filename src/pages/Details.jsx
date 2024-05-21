import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DetailsPage = () => {
  const listings = JSON.parse(localStorage.getItem("listings"));
  const a = useParams();
  const details = listings.find((ele) => ele.name === a.name);

  return (
    <div className="card">
      <h2>Details</h2>
      <div>{details.name}</div>
      <div>{details["state-province"]}</div>
      <div>{details.country}</div>
      {details["web_pages"]?.map((ele) => {
        return <Link to={ele}>{ele}</Link>;
      })}
    </div>
  );
};

export default DetailsPage;
