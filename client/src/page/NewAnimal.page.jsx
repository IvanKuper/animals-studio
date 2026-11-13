import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
      await axios.post("/animals", formData);
      toast.success("Animal added");
      ev.target.reset();
      setAnimalData({ name: "", race: "", date: "", gender: "" });
      setAnimalImg({});
    } catch (er) {
      toast.error(String(er.response?.data?.error || "Could not add the animal"));
    }
  };
  return (
    <section className="form-page">
      <div className="form-card">
        <h2>Add animal</h2>
        <p className="form-intro">
          Add an animal profile with a photo (JPEG, PNG, GIF or WebP, up to 3MB).
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              onChange={handleTextChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="race" className="form-label">
              Breed
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
              Date of birth
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              onChange={handleTextChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-select"
              id="gender"
              value={animalData.gender}
              onChange={handleTextChange}
              required
            >
              <option value="">Choose...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="animalimg" className="form-label">
              Photo
            </label>
            <input
              className="form-control"
              type="file"
              id="animalimg"
              accept="image/png,image/jpeg,image/gif,image/webp"
              required
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
