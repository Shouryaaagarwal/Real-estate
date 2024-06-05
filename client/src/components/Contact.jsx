// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function Contact({ listing }) {
//   const [landlord, setlandlord] = useState(null);
//   const [message, setmessage] = useState("");
//   const onchange = (e) => {
//     setmessage(e.target.value);
//   };
//   useEffect(() => {
//     const fetchLandlord = async () => {
//       try {
//         const res = await fetch(`/api/user/${listing.UserRef}`);
//         const data = await res.json();
//         setlandlord(data);

//         console.log(landlord);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchLandlord();
//   }, [listing.UserRef]);
//   return (
//     <>
//       {landlord && (
//         <div className="flex flex-col gap-2">
//           <p>
//             Contact <span className="font-semibold">{landlord.username}</span>{" "}
//             for{" "}
//             <span className="font-semibold">{listing.name.toLowerCase()}</span>
//           </p>
//           <textarea
//             name="message"
//             id="message"
//             rows="2"
//             value={message}
//             onChange={onchange}
//             placeholder="Enter your message here ..."
//             className="w-full border p-3 rounded-lg "
//           ></textarea>
//           <Link
//             to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
//             className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
//           >
//             Send Message
//           </Link>
//         </div>
//       )}
//     </>
//   );
// }

// export default Contact;
  



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.UserRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.error("Error fetching landlord data:", error);
      }
    };

    if (listing.UserRef) {
      fetchLandlord();
    }
  }, [listing.UserRef]);

  

  return (
    <>
      {landlord ? (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here ..."
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      ) : (
        <p>Loading landlord data...</p>
      )}
    </>
  );
}

export default Contact;