import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
  const navigate = useNavigate();


  return (
    <>
      <div>
        <button >Posts</button>
      </div>
      <div>
        <button>Followers</button>
      </div>
      <div>
        <button>Posts</button>
      </div>
    </>
  );
}
