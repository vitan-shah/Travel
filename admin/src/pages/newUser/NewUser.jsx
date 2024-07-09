import "./newUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { userInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";
import BoxLoader from "../../components/box-loader/BoxLoader";

const NewUser = () => {
  const [file, setFile] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "travel-vacay");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/benedict-berger/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newUser = {
        ...userInfo,
        cloudinary: uploadRes.data,
        img: url,
      };
      await axios.post("/api/auth/register", newUser);
      navigate('/users')
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div className="new-user">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <BoxLoader isLoading={loading}>
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
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
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>

                {userInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
                  </div>
                ))}
                <button onClick={handleClick}>Send</button>
              </form>
            </div>
          </BoxLoader>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
