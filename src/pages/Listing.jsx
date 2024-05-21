import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get as getUniversities } from "../services/university";

const ListingsPage = () => {
  const [listings, setListings] = useState();
  const [sort, setSort] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(listings);

  const getData = async () => {
    try {
      const responseData = await getUniversities();
      localStorage.setItem(
        "listings",
        JSON.stringify(responseData)
      );
      setListings(responseData);
      setFilteredUsers(responseData);
    } catch (error) {
      const cachedListings = localStorage.getItem(listings);
      if (cachedListings) {
        setFilteredUsers(cachedListings);
        setListings(cachedListings);
      } else {
        window.alert("API failed.");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!sort) return;
    const newListings = [...listings];
    sort === "asc" ? newListings.sort((a, b) => a.name.localeCompare(b.name)) : newListings.sort((a, b) => b.name.localeCompare(a.name));
    setFilteredUsers(newListings);

  }, [sort]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    const filteredItems = listings.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  };

  const handleSort = () => {
    setSort(!sort ? "asc" : sort == "asc" ? "desc" : "asc");
  };

  const deleteListing = (val) => {
    const newListings = [...listings];
    const data = newListings.filter((i) => i.name !== val);
    setFilteredUsers(data);
  };

  const showDetails = (details) => {};
  return (
    <div className="listings-main">
      <h1>Listings</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search.."
          value={searchItem}
          onChange={handleInputChange}
        />
        <div onClick={handleSort} className="sort-field">
          <div className="sort-label">Sort</div>
          <div className={`sort-icon ${sort}`}></div>
        </div>
      </div>
      <div className="listings-body">
        {filteredUsers &&
          filteredUsers?.map((ele) => {
            return (
                <div key={ele.name} className="listing-item card" onClick={showDetails(ele)}>
                  <Link to={`/details/${ele.name}`} className="a">
                    {ele.name}
                  </Link>
                  <button
                    className="delete-icon"
                    onClick={() => {
                      deleteListing(ele.name);
                    }}
                  >
                    &times;
                  </button>
                </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListingsPage;
