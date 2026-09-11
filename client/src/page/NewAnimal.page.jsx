import { useState } from "react";
import axios from "axios";

const NewAnimalPage = () => {
  const [animalData, setAnimalData] = useState({
    name: "",
    race: "",
    date: "",
    gender: "",
  });
  const [animalImg, setAnimalImg] = useState({});
  const handleTextChange = (ev) => {
    let newAnimalData = JSON.parse(JSON.stringify(animalData));
    newAnimalData[ev.target.id] = ev.target.value;
    setAnimalData(newAnimalData);
  };
  const handleImgChange = (ev) => {
    if (ev.target.files.length) {
      //check if user choose image
      setAnimalImg(ev.target.files[0]); //put in state the image details
    }
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", animalData.name);
      formData.append("race", animalData.race);
      formData.append("date", animalData.date);
      formData.append("gender", animalData.gender);
      formData.append("animalimg", animalImg);
      const { data } = await axios.post("/animals", formData);
      console.log("data", data);
    } catch (er) {
      console.log("er", er);
    }
  };
  return (
    <section className="form-page">
      <div className="form-card">
        <h2>Add animal</h2>
        <p className="form-intro">
          Create a premium animal profile with an image upload.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Animal name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={handleTextChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="race" className="form-label">
              Animal race:
            </label>
            <input
              type="text"
              className="form-control"
              id="race"
              onChange={handleTextChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Animal date:
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              onChange={handleTextChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Animal gender:
            </label>
            <input
              type="text"
              className="form-control"
              id="gender"
              onChange={handleTextChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="animalimg" className="form-label">
              Default file input example
            </label>
            <input
              className="form-control"
              type="file"
              id="animalimg"
              onChange={handleImgChange}
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default NewAnimalPage;
