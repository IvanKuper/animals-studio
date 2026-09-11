import { useDispatch } from "react-redux";
import { useState } from "react";
import { nameActions } from "../store/name";

const UserName = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChangeName = () => {
    dispatch(nameActions.userName(name));
  };

  const handelTextChange = (ev) => {
    setName(ev.target.value);
  };

  return (
    <>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="text"
          value={name}
          onChange={handelTextChange}
          placeholder="Your Name Input"
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={handleChangeName}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default UserName;
