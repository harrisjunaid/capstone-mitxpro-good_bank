// import {useGoogleLogin} from '@react-oauth/google';
// import axios from "axios"
// import {AiFillGoogleCircle} from "react-icons/ai"


// export const GoogleOAuthButton = () => {
//     useGoogleLogin({
//       onSuccess: async respose => {
//           try {
//                 const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
//                   headers: {
//                       "Authorization": `Bearer ${respose.access_token}`
//                   }
//                 })  
//                  console.log(res.data)
//                  return res.date
//               } catch (err) {
//                   console.log(err)      
//               }
//       }
//     });

//     return (
//         <pre style={{border: "none", margin: 0, padding: 0}}> 
//             <AiFillGoogleCircle/>
//         </pre>
//     )
// }






