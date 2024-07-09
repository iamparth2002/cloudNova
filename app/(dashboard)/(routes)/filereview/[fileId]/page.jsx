'use client';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app } from '../../../../../firebaseConfig';
import { BsCheckLg } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import GlobalAPI from '../../../../_utils/GlobalAPI';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from "react-icons/io5";


const page = ({ params }) => {
  const router = useRouter();
  const { user } = useUser();
  const db = getFirestore(app);
  const [file, setFile] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [password, setPassword] = useState('');
  const [email,setEmail]= useState('');

  const sendEmail = async (e) => {
    e.preventDefault()
    const data = {
      emailToSend: email,
      username: user?.fullName,
      fileName: file?.fileName,
      fileSize: file?.fileSize,
      fileType: file?.fileType,
      shortUrl: file?.shortUrl,
    };
    try {
      const result = await GlobalAPI.sendEmail(data).then((res) => {
        console.log(res);
        toast('Email sent Successfully!');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFileInfo = async () => {
    const docRef = doc(db, 'uploadedFile', params.fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setFile(data);
      console.log(data);
    } else {
      console.log('No such data!');
    }
  };

  useEffect(() => {
    params?.fileId && getFileInfo();
  }, []);

  const onPasswordSave = async (password) => {
    console.log(password);
    const docRef = doc(db, 'uploadedFile', params?.fileId);
    await updateDoc(docRef, {
      password: password,
    });
    toast('Password Saved Successfully!');
  };
  return (
    <div class="sm:ml-64 flex flex-col gap-2 md:gap-10 items-start md:items-center justify-center min-h-screen p-0 md:p-8">
      <ToastContainer />

      <button className="bg-[#726DED] text-white px-6 py-4 rounded-full mx-8 flex gap-2"
      onClick={()=>router.push('/upload')}
      >
        {' '}
        <IoArrowBack color="#fff" size={25} />
        Back to Upload
      </button>
      <div className="flex flex-col lg:flex-row ">
        <div className="flex-1 flex flex-col gap-10 items-start p-8">
          <div className=" flex flex-col items-center border-2 p-8 rounded-3xl text-gray-700">
            <img src={file?.fileUrl} alt="" className='h-[200px] mb-4' />
            <div className="text-center">
              <h1>{file?.fileName}</h1>
              <h1>
                {file?.fileType} {file?.fileSize}{' '}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 p-8">
          <div>
            <p className="text-md font-semibold">Short Url</p>
            <div className="p-4 border-2 rounded-xl">{file?.shortUrl}</div>
          </div>
          <div>
            <div className="flex gap-4 items-center ">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-4 h-4 "
                onChange={() => setToggle(!toggle)}
              />
              <p className="text-md font-semibold">Enable Password</p>
            </div>
            {toggle && (
              <div className="flex w-full gap-2">
                <input
                  type="password"
                  className="p-4 border-2 rounded-xl w-full"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button
                  className="bg-[#726DED] text-white px-3 py-1 rounded-2xl disabled:opacity-45"
                  onClick={() => onPasswordSave(password)}
                  disabled={!password}
                >
                  Save
                </button>
              </div>
            )}
          </div>
          <div>
            <p>Send File to Email</p>
            <input
              type="email"
              name=""
              id=""
              className="p-4 rounded-xl w-full border-2"
              placeholder="Enter the email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <button
            className="bg-[#726DED] p-5 text-white rounded-full disabled:opacity-45"
            onClick={sendEmail}
            disabled ={!email}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
