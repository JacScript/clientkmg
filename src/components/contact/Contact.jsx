// import React, { useRef } from "react";
// import { motion } from "framer-motion";
// import { FaXTwitter,FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa6";
// import { contactConfig } from "./content.js";
// import IconComponent from "../IconComponent.jsx";
// // import emailjs from '@emailjs/browser';
// // import { toast } from "react-toastify";


// export default function ContactUs() {

// //   const form = useRef();



// //   const sendEmail = async (e) => {
// //     e.preventDefault();
  
// //     try {
// //       await emailjs.sendForm(
// //         import.meta.env.VITE_SERVICE_ID,
// //         import.meta.env.VITE_TEMPLATE_ID,
// //         form.current,
// //         import.meta.env.VITE_PUBLIC_KEY
// //       );
// //       toast.success("Message sent successfully");
// //       e.target.reset();
// //     } catch (error) {
// //       toast.error("Failed to send message. Please try again.");
// //       console.error("Email sending failed:", error.text);
// //       e.target.reset();
// //     }
// //   };
  

//   // const sendEmail = (e) => {
//   //   e.preventDefault();

   
//   //   emailjs.sendForm(
//   //     import.meta.env.VITE_SERVICE_ID,
//   //     import.meta.env.VITE_TEMPLATE_ID,
//   //     form.current,
//   //     import.meta.env.VITE_PUBLIC_KEY
//   //   ).then(
//   //       () => {
//   //         toast.success("Messege sent successfully");
//   //         e.target.reset();
//   //       },
//   //       (error) => {
//   //         // console.log('FAILED...', error.text);
//   //         toast.error("Messege sent successfully", error.text);
//   //         e.target.reset();
//   //       },
//   //     );
//   // };


//   return (
//     <section id="contact" className="py-12 bg-blue-100 ">
//     <div className="container w-3/4 mx-auto px-4">
//       {/* Heading Section */}
      

//       {/* Contact Info Section */}
//       <motion.div
//         className="flex flex-col lg:flex-row gap-8 my-12"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="lg:w-1/3 flex flex-col items-start">
//         <motion.div
//         className="text-[#000080] bg-[#00008011] flex items-center justify-center px-4 py-2 rounded-lg mb-4 shadow "
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-xl font-semibold">Contact Us</h1>
//         {/* <hr className="border-t-1 border-gray-300 w-1/4" /> */}
//       </motion.div>
//           <h3 className="text-4xl font-extrabold mb-4 text-[#000080]">Have questions? Feel free to write us</h3>
//           <div className="flex  space-x-4 text-[#000080] ">
//                 <IconComponent href="#" icon={FaWhatsapp} size={30}/>
//                 <IconComponent href="#" icon={FaXTwitter}/>
//                 <IconComponent href="#" icon={FaInstagram}/>
//                 <IconComponent href="#" icon={FaFacebook}/>
//             </div>
//         </div>

//         {/* Contact Form Section */}
//         <div className="lg:w-2/3">
//           <form className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 id="name"
//                 name="user_name"
//                 placeholder="Name"
//                 type="text"
//                 required
//               />
//               <input
//                 className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 id="pnoneNumber"
//                 name="user_phoneNumber"
//                 placeholder="Phone Number"
//                 type="number"                
//                 required
//               />
//                <input
//                 className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 id="email"
//                 name="user_email"
//                 placeholder="Email"
//                 type="email"
//                 required
//               />
//                <input
//                 className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 id="subject"
//                 name="user_subject"
//                 placeholder="Subject"
//                 type="text"
//                 required
//               />
//             </div>
//             <textarea
//               className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               id="message"
//               name="message"
//               placeholder="Message"
//               rows="5"
//               required
//             ></textarea>
//             <button
//               className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               type="submit"
//             >
//               Send
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//     </section>
//   );
// }

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaXTwitter, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa6";
import IconComponent from "../IconComponent.jsx";
// import emailjs from "@emailjs/browser";
// import { toast } from "react-toastify";

export default function ContactUs({id}) {
  // const form = useRef();

  // const sendEmail = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await emailjs.sendForm(
  //       import.meta.env.VITE_SERVICE_ID,
  //       import.meta.env.VITE_TEMPLATE_ID,
  //       form.current,
  //       import.meta.env.VITE_PUBLIC_KEY
  //     );
  //     toast.success("Message sent successfully");
  //     e.target.reset();
  //   } catch (error) {
  //     toast.error("Failed to send message. Please try again.");
  //     console.error("Email sending failed:", error.text);
  //     e.target.reset();
  //   }
  // };

  return (
    <section id={id} className="py-12 bg-blue-100">
      <div className="container w-3/4 mx-auto px-4">
        <motion.div
          className="flex flex-col lg:flex-row gap-8 my-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Left Info Section */}
          <div className="lg:w-1/3 flex flex-col items-start">
            <motion.div
              className="text-[#000080] bg-[#00008011] flex items-center justify-center px-4 py-2 rounded-lg mb-4 shadow"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h1 className="text-xl font-semibold">Contact Us</h1>
            </motion.div>
            {/* <h3 className="text-4xl font-extrabold mb-4 text-[#000080]">
              Have questions? Feel free to write us
            </h3> */}
            {/* <div className="flex space-x-4 text-[#000080]">
              <IconComponent href="#" icon={FaWhatsapp} size={30} />
              <IconComponent href="#" icon={FaXTwitter} />
              <IconComponent href="#" icon={FaInstagram} />
              <IconComponent href="#" icon={FaFacebook} />
            </div> */}
          </div>

          {/* Right Form Section */}
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            <form /* ref={form} onSubmit={sendEmail} */ className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="name"
                  name="user_name"
                  placeholder="Name"
                  type="text"
                  required
                />
                <input
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="phoneNumber"
                  name="user_phoneNumber"
                  placeholder="Phone Number"
                  type="text"
                  required
                />
                <input
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  name="user_email"
                  placeholder="Email"
                  type="email"
                  required
                />
                <input
                  className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="subject"
                  name="user_subject"
                  placeholder="Subject"
                  type="text"
                  required
                />
              </div>
              <textarea
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="message"
                name="message"
                placeholder="Message"
                rows="5"
                required
              ></textarea>
              <button
                className="bg-[#000080] text-white px-6 py-3 rounded-md hover:bg-[#000080a4] focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
              >
                Send
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
