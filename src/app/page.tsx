"use client"
import { RootState } from "@/lib/store";
import Image from "next/image";
import {useRouter} from "next/navigation"
import { UseSelector, useSelector } from "react-redux";

export default function Home() {
   const router = useRouter();
   const isAuthenticated = useSelector((state : RootState)=>state.auth.isAuthenticated);

   if(isAuthenticated) {
     router.push("/dashboard");
   }else{
     router.push("/signup");
   }
}
