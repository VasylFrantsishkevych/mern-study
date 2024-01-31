import {Button, Typography, Box} from "@mui/material";

import styles from "./Home.module.scss";
import {Modals} from "../../components";
import { useState } from "react";

const Home = () => {

   const isAuth = false;
   const userEmail = "as@asdsa.asd"

   const [showModalType, setShowModalType] = useState(null);

   return (
      <Box className={styles.container}>
         {isAuth && (
            <>
               <Typography variant="h3">You are logged in!</Typography>
               <Typography variant="h3">User Email: {userEmail}</Typography>
            </>
         )}

         <Box className={styles.buttonsContainer}>
            {isAuth ? 
               <Button variant="contained" onClick={() => console.log("Logout")}>
                  Logout
               </Button>
               : 
               <>
                  <Button variant="contained" onClick={() => setShowModalType("login")}>
                     Log In
                  </Button>
                  <Button variant="contained" onClick={() => setShowModalType("register")}>
                     Register
                  </Button>
               </>
            } 

            <Modals type={showModalType} handleModalClose={() => setShowModalType(null)}/>
         </Box>
      </Box>
   )
}

export default Home