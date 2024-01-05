import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PostsPage() {
  const navigate = useNavigate();
  const [allPosts,setAllPosts]=useState([{"desc":"","img":""}])

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [newPostFormData, setNewPostFormData] = useState({
    caption: "",
    image: null,
  });

  useEffect(() => {
    async function authenticateUser() {
      const accessToken = Cookies.get('accessToken');
      console.log(accessToken);

    //   if (!accessToken) {
    //     return navigate('/login');
    //   }
    
    try {

        const verify=await axios.get("http://localhost:8000/api/users/protectedRoute",{withCredentials:true});
        console.log(verify);

        if(!verify.data.success){
            return navigate('/login');
        }

        axios.defaults.withCredentials=true;
        const response=await axios.get("http://localhost:8000/api/user/posts/allPosts");
        // console.log(  Object.values(res.data));
        console.log(response);

        // if(response.data.length!=0){
        //     const desc=response.data[0].desc;
        //     console.log(desc);
        // }

        setAllPosts(response.data)
      } catch (error) {
        console.log(error.message);
        // navigate('/login');
      }
    }

    authenticateUser();
  }, []);

  const handleFormInputChange = (e) => {
    const { name, value, files } = e.target;
    console.log(name);
    console.log(value);
    console.log(files);
    setNewPostFormData({
      ...newPostFormData,
      [name]: files ? files[0] : value,
    });

    console.log(newPostFormData);
  };

  // Function to handle modal open/close
  const toggleCreatePostModal = () => {
    setIsCreatePostModalOpen(!isCreatePostModalOpen);
  };

  const handleCreatePost = async () => {
    try {
      const formData = new FormData();
      formData.append("desc", newPostFormData.caption);
      formData.append("img", newPostFormData.image);

      console.log(formData);
      const response = await axios.post("http://localhost:8000/api/user/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log(response.data);

      // After posting, close the modal
      toggleCreatePostModal();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const convertBufferToDataURL = (buffer) => {
    const dataUrl = `data:image/png;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))}`;
    return dataUrl;
  };

  return (
    <div className="flex flex-col flex-grow overflow-y-auto ">
      <h1 className="m-4 text-4xl underline ">Your Posts</h1>

      <button onClick={toggleCreatePostModal} className="m-4 p-2 bg-blue-500 text-white rounded-md cursor-pointer">
        Create Post
      </button>

      <div className="flex-grow  overflow-auto w-full">
          {
              allPosts.map((data,index)=>{
                  return(
                      <div className="border-2 border-red-400 m-6 rounded-xl " onClick={()=>{navigate(`/postDesc/${data.postid}`)}}>
                          <img src={convertBufferToDataURL(data.img.data)} className="rounded-t-xl w-full h-[400px]"></img>
                          <p className="text-left text-2xl rounded-b-xl pt-3 pl-3 bg-gradient-to-r from-yellow-500 via-orange-200 via-green-500 to-blue-500">{data.desc}</p>
                      </div>
                  )
              })
          }
      </div>

      {isCreatePostModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 w-96 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Create Post</h2>
            {/* Image upload input */}
            <input
              type="file"
              name="image"
              onChange={handleFormInputChange}
              accept="image/*"
              className="mb-4"
            />
            {/* Caption input */}
            <textarea
              name="caption"
              placeholder="Write a caption..."
              onChange={handleFormInputChange}
              className="w-full h-24 p-2 mb-4 border rounded-md"
            />
            {/* Button to submit the form */}
            <button onClick={handleCreatePost} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
