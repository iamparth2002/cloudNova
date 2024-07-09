'use client';
import React, { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import { app } from '../../../../firebaseConfig';
import { BsCheckLg } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { FaRegShareFromSquare } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

const page = () => {
  const router = useRouter();
  const db = getFirestore(app);
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="sm:ml-64 flex flex-col md:flex-row justify-center items-center flex-wrap min-h-screen p-0 md:p-8">
        Loading...
      </div>
    );
  }

  const [files, setFiles] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const deleteDocument = async (documentId) => {
    try {
      await deleteDoc(doc(db, 'uploadedFile', documentId)).then(() => {
        getFiles();
        toast('File Deleted Successfully');
      });
      console.log(`Document with ID ${documentId} deleted successfully`);
    } catch (error) {
      console.log('Error deleting document: ', error);
    }
  };

  const getFiles = async () => {
    console.log(user);
    console.log();

    try {
      const q = query(
        collection(db, 'uploadedFile'),
        where('userEmail', '==', user?.primaryEmailAddress?.emailAddress)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFiles(data);
        console.log(data);
      } else {
        setFiles([])
        console.log('No such data!');
      }
    } catch (error) {
      console.log('Error getting documents: ', error);
    }
  };
  useEffect(() => {
    getFiles();
  }, []);

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  if(!files.length>0){
  return  (  <div className="sm:ml-64 flex flex-col items-center justify-center gap-4 md:gap-10 min-h-screen p-0 md:p-8 ">
    <p className="text-3xl md:text-6xl "> No files Found</p>
    <button
      className="bg-[#726DED] text-white px-6 py-4 rounded-full mx-8 flex gap-2"
      onClick={() => router.push('/upload')}
    >
      {' '}
      Start Uploading
      <IoArrowForward color="#fff" size={25} />
    </button>
  </div>
  )

  }

  return (
    <div className="sm:ml-64 flex flex-col md:flex-row items-center flex-wrap gap-4 md:gap-10 md:items-start md:justify-start min-h-screen p-0 md:p-8 ">
      <ToastContainer />
      
        {files?.map((file, index)=>(
          <div
            key={index}
            className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-lg border-2 bg-clip-border rounded-xl w-72"
          >
            <div className="relative h-36 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
              <img
                src={file.fileUrl}
                alt="card-image"
                className="bg-cover h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {truncateText(file?.fileName, 32)}
              </h5>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {file?.fileType} {file?.fileSize}Bytes
              </p>
            </div>
            <div className="p-6 pt-0 flex gap-4">
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-2"
                type="button"
                onClick={() => router.push('/filereview/' + file?.id)}
              >
                <FaRegShareFromSquare color="white" size={12} />
                share
              </button>
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-700 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-1"
                type="button"
                onClick={() => deleteDocument(file?.id)}
              >
                <MdDeleteOutline size={12} color="white" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>)
};

export default page;
