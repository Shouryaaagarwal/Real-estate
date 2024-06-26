
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import React, { useEffect, useState } from "react";
  import { app } from "../firebase"; 
  import {useSelector} from 'react-redux' 
  import {useNavigate, useParams} from 'react-router-dom'
  
  function CreateListing() {  
    const navigate = useNavigate() ; 
    const params  = useParams() ;  
    const {currentUser} = useSelector(state=>state.user) ; 
    const [files, setfile] = useState([]);
    const [formData, setFormData] = useState({
      imageUrls: [],
      name: "",
      description: "",
      address: "",
      type: "rent",
      regularPrice: 50,
      discountPrice: 0,
      bathrooms: 1,
      bedrooms: 1,
      offer: false,
      parking: false,
      furnished: false,
    });
    console.log(formData);
    const [imageUploaderror, setimageUploaderror] = useState(null);
    const [uploading, setuploading] = useState(false);  
    const [error, seterror] = useState(false) ;
    const [loading, setloading] = useState(false)  ;  

    useEffect(()=>{
                const fetchListing  = async()=>{
                            const listingId = params.listingId;  
                            const res = await fetch(`/api/listing//get/${listingId}`) ;  
                            const data = await res.json() ; 
                            if(data.success===false){
                                console.log(data.message) ;  
                                return 
                            } 
                            setFormData(data) ; 
                            
                        }
                fetchListing() ; 
    },[])
   
    const handleImageUpload = (e) => {
      if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setuploading(true);
        setimageUploaderror(false);
        const promises = [];
        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises)
          .then((urls) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              imageUrls: prevFormData.imageUrls.concat(urls),
            }));
            setimageUploaderror(false);
            setuploading(false);
          })
          .catch((err) => {
            setuploading(false);
            setimageUploaderror(`Upload error only 2 mb per image ${err}`);
          });
      } else {
        setimageUploaderror("You can upload only 6 images");
        setuploading(false);
      }
    };
  
    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
  
    const handleRemoveImage = (index) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrls: prevFormData.imageUrls.filter((url, i) => i !== index),
      }));
    };
  
    const handleChange = (e) => {
      const { id, value, checked, type } = e.target;
      if (id === "sale" || id === "rent") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          type: id,
        }));
      } else if (type === "checkbox") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [id]: checked,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [id]: value,
        }));
      }
    }; 
    const handleSubmit=async(e)=>{
      e.preventDefault() ; 
      try{ 
        if(formData.imageUrls.length<1){return seterror('You must upload atleast one image')} ; 
        if(+formData.regularPrice<+formData.discountPrice){return seterror('The regular price should be more than the discount price')}
        setloading(true) ;  
        seterror(false) ;   
        const res  = await fetch(`/api/listing/update/${params.listingId}`,{
          method:'POST' ,
          headers:{
            'Content-Type':"application/json" 
          } , 
          body:JSON.stringify({
            ...formData , 
            UserRef :currentUser._id 
          })
        })  ;
        const data = await res.json() ; 
        setloading(false) ;
        if(data.success===false){
  seterror(data.message) ;
        } 
        navigate(`/listing/${data._id}`)
      } catch(error){
        seterror(error.message) ;
      }
    }
  
    return (
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Update a Listing  
           </h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4" action="">
          <div className="flex flex-col flex-1 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            ></textarea>
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border border-x-gray-300 rounded-lg"
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border border-x-gray-300 rounded-lg"
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border border-x-gray-300 rounded-lg"
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="100000"
                  required
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div> 
              {formData.offer&& ( 
  
              <div className="flex items-center gap-2">
                <input
                  className="p-3 border border-x-gray-300 rounded-lg"
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:{" "}
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setfile(e.target.files)}
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/.*"
                multiple
              />
              <button
                type="button"
                onClick={handleImageUpload}
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <p className="text-red-700">{imageUploaderror && imageUploaderror}</p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    alt="listing"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-700 p-3 rounded-lg hover:opacity-75 uppercase"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button disabled = {loading || uploading } className="p-3 bg-slate-700 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">
             {loading?'Updating...':"Update a Listing"} 
            </button> 
            {error&&<p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>
      </main>
    );
  }
  
  export default CreateListing;
  
