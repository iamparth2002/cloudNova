'use client';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app } from '../../../firebaseConfig';
import { FaFileArrowDown } from 'react-icons/fa6';

const page = ({ params }) => {
  const db = getFirestore(app);
  const [file, setFile] = useState(null);
  const [pass,setPass] = useState('')
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

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200 p-10">
      <div className=" flex flex-col p-10 items-center bg-white rounded-3xl gap-10">
        <div className="text-center space-y-4 mb-2">
          <h1 className="text-2xl md:text-4xl font-semibold">
            <span className="text-[#726DED]">{file?.userName}</span> shared a
            file with you{' '}
          </h1>
          <p className="text-gray-500 font-medium text-center">
            Find file details below.
          </p>
        </div>
        <FaFileArrowDown
          size={100}
          color="#726DED"
          className="animate-bounce"
        />
        <p className="text-gray-400 text-center">
          {file?.fileName} ⚡ {file?.fileType} ⚡ {file?.fileSize} Bytes
        </p>
        {file?.password && (
          <input
            type="password"
            placeholder="Enter the password"
            className="rounded-xl p-4 border-2 border-[#726DED]"
            onChange={(e)=>setPass(e.target.value)}
          />
        )}

        <div className="space-y-4">
          <button className="bg-[#726DED] text-white p-5 rounded-full w-full disabled:bg-opacity-25"
          disabled={file?.password && pass!== file?.password}
          onClick={()=>window.open(file?.fileUrl)}
          >
            Download
          </button>
          <p className="font-medium text-gray-500">
            *Terms and Conditions apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
