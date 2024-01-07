"use client";
import Image from "next/image";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Blob } from "buffer";
import { useRef } from "react";

export default function Home() {
  const [preimageurl, setPreImageurl] = useState("");
  const [postimageurl, setPostImageurl] = useState("");

  const [preImage, setPreImage] = useState<File | null>(null);
  const [postImage, setPostImage] =  useState<File | null>(null);

  const preRef = useRef<HTMLInputElement>(null)
  const postRef = useRef<HTMLInputElement>(null)

  function Pre_Image(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files;
    if (file) {
      setPreImage(file[0])
      setPreImageurl(URL.createObjectURL(file[0]));
    } else {
      setPreImageurl("");
    }
  }

  function Post_image(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files;

    if (file) {
      setPostImage(file[0])
      setPostImageurl(URL.createObjectURL(file[0]));
    } else {
      setPostImageurl("");
    }
  }

  async function Haldle_Submit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault()
    console.log("hello")
    const formdata = new FormData()
    formdata.append('pre_image',preImage?preImage:"")
    formdata.append('post_image',postImage?postImage:"")
    try{
      const response = await fetch("http://127.0.0.1:8000/api/v1/image/",{
        method:'POST',
        body:formdata
      }
      )

    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className="w-full h-full ">
      <form className="mt-[150px]" onSubmit={Haldle_Submit}>
        <div className="flex self-center justify-around align-middle">
          <div>
            <div className="text-slate-700 font-bold mb-[10px]">
              Upload Pre-image
            </div>
            <div className="relative border-dashed border-[2px] h-[250px] w-[500px] border-slate-400 rounded-md flex justify-center items-center"
            onClick={()=>preRef.current?.click()}>
            {preimageurl && (
              <Image
                src={preimageurl}
                layout="fill"
                // objectFit="contain"
                alt="hello"
              ></Image>
            )}
            {!preimageurl && (
                <FontAwesomeIcon
                  
                  icon={faImage}
                  style={{
                    height: "150px",
                    width: "150px",
                    background: "white",
                    color: "#418CE9",
                    
                  }}
                />
            )}
              </div>
            <input className="hidden" type="file" onChange={Pre_Image} ref={preRef}></input>
          </div>
          <div>
            <div className="text-slate-700 font-bold mb-[10px]">
              Upload Post-image
            </div>
            
            <div className="relative border-dashed border-[2px] h-[250px] w-[500px] border-slate-400 rounded-md flex justify-center items-center"
            onClick={()=>postRef.current?.click()}>
            {postimageurl &&<Image
            layout="fill"
            src={postimageurl}
            alt="hello"
            ></Image>}

            {!postimageurl && (
                <FontAwesomeIcon
                  icon={faImage}
                  style={{
                    height: "150px",
                    width: "150px",
                    background: "white",
                    color: "#418CE9",
                  }}
                />
            )}
              </div>
            <input className="hidden" type="file" onChange={Post_image} ref={postRef}></input>
          </div>
        </div>
        <input type="submit"></input>
      </form>
    </div>
  );
}
