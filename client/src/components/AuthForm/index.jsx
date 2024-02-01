import { Button, TextField, Typography } from "@mui/material";
import {useForm} from "react-hook-form";

import styles from "./AuthForm.module.scss"
import { useDispatch } from "react-redux";
import { registration, loginisation } from "../../redux/slices/auth";

const AuthForm = ({formType, handleModalClose}) => {
   const dispatch = useDispatch();
   const isRegisterFormType = formType === 'register';

   const {
      register, 
      handleSubmit, 
      formState: {errors, isValid}
   } = useForm({
      defaultValues: {email: "", password: ""},
      mode: "onChange",
   });

   const onSubmit = async (value) => {
      console.log(value)

      const data = await dispatch(isRegisterFormType ? registration(value) : loginisation(value))

      if (!data.payload) {
         alert(`${isRegisterFormType ? 'Register' : 'Login'} failed!`)
      }

      if ('token' in data.payload) {
         window.localStorage.setItem('token', data.payload.token)
      }

      handleModalClose()
   }

   return (
      <>
         <Typography sx={{ mb: "16px"}} variant="h2" className={styles.title}>
            {isRegisterFormType ? 'Register' : 'Login'}
         </Typography>

         <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField 
               label='Email' 
               type="email" 
               {...register("email", {required: "Email field is required"})}
               error={Boolean(errors?.email?.message)}
               helperText={errors.email ? "Email field is required" : ""}
            />
            <TextField
               label='Password' 
               type="password" 
               {...register("password", {required: "Password should be at least 5 symbols", minLength: 5})}
               error={Boolean(errors?.password?.message)}
               helperText={errors.password ? "Password should be at least 5 symbols" : ""}
            />
            <Button disabled={!isValid} variant="contained" type="submit" sx={{ mt: "16px"}}>SUBMIT</Button>
         </form>
      </>
   )
}

export default AuthForm;