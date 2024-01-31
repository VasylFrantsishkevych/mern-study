import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
   try {
      // берем пароль
      const password = req.body.password 
      // хешуємо пароль
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      // створюємо юзера
      const doc = new UserModel({
         email: req.body.email,
         passwordHash: hash
      })
      // збереження юзера якого створили
      const user = await doc.save()
      // генеруємо токен
      const token = jwt.sign(
         {
            _id: user._id,
         },
         "secretKeyForUser",
         {
            expiresIn: "30d",
         }
      )

      const {passwordHash, ...userData} = user._doc;

      res.status(201).json({
         token,
         ...userData,
      })

   } catch (error) {
      console.log(error)
      res.status(500).json({
         message: "Register failed",
      })
   }
}

export const login = async (req, res) => {
   try {
      // шукаємо в базі юзера
      const user = await UserModel.findOne({email: req.body.email})
      // перевіряємо чи існує юзер
      if(!user) {
         return res.status(404).json({
            message: "User not found",
         })
      }
      // перевіряємо чи валідний пароль
      const isPasswordValid = await bcrypt.compare(
         req.body.password,
         user._doc.passwordHash
      )

      if (!isPasswordValid) {
         return res.status(404).json({
            message: "Wrong email or password",
         })
      }
      
      const token = jwt.sign(
         {
            _id: user._id,
         },
         "secretKeyForUser",
         {
            expiresIn: "30d",
         }
      )

      const {passwordHash, ...userData} = user._doc;

      res.status(200).json({
         token,
         ...userData,
      })

   } catch (error) {
      console.log(error)
      res.status(500).json({
         message: "Login failed",
      })
   }
}

export const getUser = async (req, res) => {
   try {
      //шукаємо юзера по id 
      // id додаємо в request через middleware
      const user = await UserModel.findById(req.userId);
      // перевіряємо чи існує юзер
      if (!user) {
         return res.status(404).json({
            message: "User not found",
         })
      }

      const {passwordHash, ...userData} = user._doc;

      res.status(200).json({
         ...userData,
      })

   } catch (error) {
      console.log(error)
      res.status(500).json({
         message: "Data fetching failed",
      })
   }
}