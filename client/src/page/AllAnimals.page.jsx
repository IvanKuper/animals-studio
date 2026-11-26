import axios from "axios";
import { useEffect, useState } from "react";

const AllAnimalsPage = () => {
  const [animals, setAnimals] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    axios
      .get("/animals")
      .then(({ data }) => {
        setAnimals(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);
  return (
    <section className="animals-page">
      <div className="page-section-header">
        <div>
          <h2>Animals Gallery</h2>
          <p>
            Elegant previews that feel premium, responsive, and easy to scan.
          </p>
        </div>
      </div>
      {animals.length ? (
        <div className="animals-grid">
          {animals.map((animalItem) => (
            <article className="animal-card" key={animalItem._id}>
              <div className="animal-card-media">
                <img
                  src={animalItem.img}
                  className="card-img-top"
                  alt={animalItem.name}
                  loading="lazy"
                />
              </div>
              <div className="animal-card-body">
                <h3>{animalItem.name}</h3>
                <p>
                  {animalItem.race || "Unknown race"}
                  {animalItem.gender ? " · " + animalItem.gender : ""}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state" role="status">
          {status === "loading" && "Loading animals…"}
          {status === "error" && "Could not load the animals. Is the API running?"}
          {status === "ready" && "No animals were found yet. Add a new animal to begin."}
        </div>
      )}
    </section>
  );
};
export default AllAnimalsPage;
