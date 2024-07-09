import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import BoxLoader from "../../components/box-loader/BoxLoader";

const NewHotel = () => {
  const [files, setFiles] = useState([]);
  const [hotelInfo, setHotelInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data, loading: fetching, error } = useFetch("/api/rooms");

  const handleChange = (e) => {
    setHotelInfo(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  const handleImageDeselect = (index) => {
    const fileListArr = Array.from(files);
    fileListArr.splice(index, 1);
    setFiles(fileListArr);
  }
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responses = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "travel-vacay");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/benedict-berger/image/upload",
            data
          );
          return uploadRes.data
        })
      );
      const list = responses.map(response => response.url);

      const newhotel = {
        ...hotelInfo,
        rooms,
        cloudinary: responses,
        photos: list,
      };

      await axios.post("/api/hotels", newhotel);
      navigate('/hotels')
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  };

  return (
    <div className="new-hotel">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <BoxLoader isLoading={loading}>
            <div className="left">
              {files.length > 0 ? Object.values(files).map((file, index) => (
                <div className="selected-images" key={index}>
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                  <span className="deselect-image" onClick={() => handleImageDeselect(index)}>&times;</span>
                </div>
              )) : (
                <div className="selected-images">
                  <img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="" />
                </div>
              )}
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    style={{ display: "none" }}
                  />
                </div>

                {hotelInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="formInput">
                  <label>Featured</label>
                  <select id="featured" onChange={handleChange} defaultValue={false}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="selectRooms">
                  <label>Rooms</label>
                  <select id="rooms" multiple onChange={handleSelect}>
                    {loading
                      ? "loading"
                      : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                  </select>
                </div>
                <button onClick={handleClick}>Send</button>
              </form>
            </div>
          </BoxLoader>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
