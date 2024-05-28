import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setfilePerc] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  

  useEffect(() => {
    if (file) {
      handleUploadFile(file);
    }
  }, [file]);

  const handleUploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilePerc(Math.round(progress));
      },
      (fileUploadError) => {
        setfileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    // firbase storage rule

    // allow read  ;
    // allow write : if
    // request.resource.size < 2*1024*1024 &&
    // request.resource.contentType.matches('images/.*')

    ////////////////////////////////////////////////////////////

    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center  my-7 ">Profile</h1>
      <form className="flex flex-col gap-3" action="">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          accept="image/.*"
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          className="self-center rounded-full h-24 w-24 object-cover cursor-pointer mt-2"
          src={formData.avatar ||currentUser.avatar}
          alt="profile"
        />
        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Image Upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Successfully Uploaded</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="username"
          id="username"
          className="border  p-3 rounded-lg outline-none"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border  p-3 rounded-lg outline-none"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border  p-3 rounded-lg outline-none"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className=" flex justify-between mt-5 ">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
