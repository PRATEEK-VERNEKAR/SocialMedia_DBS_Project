import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState();
  const [coverImage, setCoverImage] = useState();
  const [newWebsite, setNewWebsite] = useState("");
  const [newCity, setNewCity] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get("http://localhost:8000/api/users/getUser");
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (!Cookies.get("accessToken")) {
      navigate("/login");
    } else {
      fetchUserData();
    }
  }, [navigate]);

  const convertBufferToDataURL = (buffer) => {
    if (!buffer) {
      return ''; // Return an empty string if buffer is undefined
    }
    const dataUrl = `data:image/png;base64,${btoa(
      String.fromCharCode.apply(null, new Uint8Array(buffer))
    )}`;
    return dataUrl;
  };

  const coverpicStyle = {
    backgroundImage: userData.coverpic
      ? `url(${convertBufferToDataURL(userData.coverpic.data)})`
      : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
  };

  const handleImageClick = (imageType) => {
    setSelectedImageType(imageType);
    const fileInput = document.getElementById(`${imageType}ImageInput`);
    fileInput.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log("handleImageChange");
    console.log(file);
    setProfileImage(file);
    // if (selectedImageType === 'profile') {
    //   setProfileImage(file);
    // } else if (selectedImageType === 'cover') {
    //   setCoverImage(file);
    // }

    try{

      if (selectedImageType === 'profile' && file) {
        console.log("IF");
        const profileFormData = new FormData();
        profileFormData.append('profilepic', file);

        const res = await axios.put('http://localhost:8000/api/users/updateProfile', profileFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        console.log(res);
      } else if (selectedImageType === 'cover' && file) {
        const coverFormData = new FormData();
        coverFormData.append('coverpic', file);

        await axios.put('http://localhost:8000/api/users/updateCover', coverFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
      }

      window.location.reload();
    }
    catch(err){
      console.log(err);
    }
  };

  const confirmUpload = async () => {
    console.log("confirmUpload");
    console.log(selectedImageType);
    console.log(profileImage);
    try {
      if (selectedImageType === 'profile' && profileImage) {
        console.log("IF")
        const profileFormData = new FormData();
        profileFormData.append('profilepic', profileImage);

        const res=await axios.put('http://localhost:8000/api/users/updateProfile', profileFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        console.log(res);
      } else if (selectedImageType === 'cover' && coverImage) {
        const coverFormData = new FormData();
        coverFormData.append('coverpic', coverImage);

        await axios.put('http://localhost:8000/api/users/updateCover', coverFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
      }

      // window.location.reload();
    } catch (error) {
      console.error('Error uploading images and details', error);
    }
  };

  const handleUpload = async () => {
    try {
  
      console.log(newCity)
  
      // axios.defaults.withCredentials=true;
      await axios.put("http://localhost:8000/api/users/updateuser", {city:newCity,website:newWebsite},{withCredentials:true});
  
      window.location.reload();
    } catch (error) {
      console.error("Error uploading images and details", error);
    }
  };
  

  const handleAddDetailsClick = () => {
    setShowDetailsModal(true);
  };

  const handleDetailsModalClose = () => {
    setShowDetailsModal(false);
  };

  return (
    <div className="flex-grow p-6">
      <div className="max-w-screen-lg mx-auto">
        <div className="w-full h-[40%]">
          <div
            className="grid grid-cols-12 gap-4 h-full"
            style={coverpicStyle}
            // onClick={()=> handleImageClick('cover')}
          >
            <div className="col-span-5 flex items-center">
              {/* {userData.profilepic && ( */}
                <label htmlFor="profileImageInput">
                  <img
                    src={convertBufferToDataURL(
                      userData.profilepic?.data
                    )}
                    alt="Profile Pic"
                    className="w-36 h-36 object-cover rounded-full border-4 border-white cursor-pointer"
                    onClick={() => handleImageClick('profile')}
                  />
                  {/* <img
                    src={convertBufferToDataURL(userData.profilepic?.data)}
                    className="rounded-full w-16 h-16 object-cover border-2 border-gradient-blue mx-auto"
                    alt="Profile Pic"
                    onClick={() => handleImageClick('profile')}
                  /> */}
                </label>
              {/* // )} */}
              <input
                type="file"
                id="profileImageInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <input
                type="file"
                id="coverImageInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            <div className="col-span-7 flex flex-col items-center justify-evenly bg-red-600">
              <div>
                <h1 className="text-2xl font-semibold text-white">
                  {userData.name}
                </h1>
                <p className="text-gray-300">@{userData.username}</p>
              </div>
              <div>
                <p className="text-gray-300">City: {userData.city}</p>
                <p className="text-gray-300">Website: {userData.website}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button onClick={handleAddDetailsClick}>Add Details</button>
        </div>

        {showDetailsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <label>
                Website:
                <input
                  type="text"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                />
              </label>
              <button onClick={handleDetailsModalClose}>Cancel</button>
              <button onClick={handleUpload}>Upload Details</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;
