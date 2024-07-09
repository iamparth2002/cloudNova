'use client';
import React, { useEffect, useState } from 'react';
import { SlCloudUpload } from 'react-icons/sl';
import { FaFile } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import app from '../../../../firebaseConfig';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(true);
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(false);
  const [sucess, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [docId, setDocId] = useState(null);

  const setUpload = (file) => {
    if (file && file.size > 2097152) {
      setSuccess(false);
      setAlert(true);
    } else {
      setAlert(false);
      setFile(file);
      setSuccess(true);
    }
  };

  const storage = getStorage(app);
  const db = getFirestore(app);

  const checkFile = (e) => {
    e.preventDefault();
    const metadata = {
      contentType: file.type,
    };
    const storageRef = ref(storage, 'file-upload/' + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setLoading(true);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        setLoading(false);
        console.log('upload is unsuccessfull');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            setFile(null);
            setLoading(false);
            setSuccess(false);
            setAlert(false);
            toast('File Uploaded Successfully!');
            return saveInfo(file, downloadURL);
          })
          .then((result) => {
            console.log('Document saved successfully with ID:', result.docId);
            router.push('/filereview/' + result.docId);
          });
      }
    );
  };

  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString().toString();
    setDocId(docId);

    await setDoc(doc(db, 'uploadedFile', docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      password: '',
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL +"/f/"+ docId,
    });

    return { success: true, docId };
  };
  // useEffect(() => {
  //   router.push(`/filereview/${docId}`);
  // }, []);
  return (
    <div class="sm:ml-64 flex flex-col items-center justify-center min-h-screen gap-10 p-8">
      <h1 className="text-4xl font-semibold text-center">
        Start <span className="text-[#726DED]">Uploading </span>Files and{' '}
        <span className="text-[#726DED]">Share</span> it!
      </h1>

      <label
        id="dropzone-file"
        className="bg-[#726DED]/20 text-center flex items-center justify-center p-10 flex-col rounded-2xl border-dotted border-2 border-[#726DED] gap-4 cursor-pointer"
      >
        <SlCloudUpload size={50} color="#726DED" />
        <h1 className="font-semibold">
          Click to upload or <span className="text-[#726DED]">drag</span> and{' '}
          <span className="text-[#726DED]">drop</span>
        </h1>
        <h1>SVG, PNG, JPG or GIF (Max Size : 2MB)</h1>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => setUpload(e.target.files[0])}
        />
      </label>

      {alert ? (
        <div
          role="alert"
          className="rounded border-s-4 border-red-500 bg-red-50 p-4"
        >
          <strong className="block font-medium text-red-800">
            {' '}
            File Exceeds the limits.{' '}
          </strong>

          <p className="mt-2 text-sm text-red-700">
            The Size of the file hsould be less than 2MB.
          </p>
        </div>
      ) : null}
      <ToastContainer />
      {sucess && (
        <div
          id="dismiss-alert"
          class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-teal-50 border border-teal-200 text-sm text-teal-800 rounded-lg p-4"
          role="alert"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <FaFile />
            </div>
            <div class="ms-2">
              <div class="text-sm font-medium">{file.name}</div>
            </div>
            <div class="ps-3 ms-auto">
              <div class="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  class="inline-flex bg-teal-50 rounded-lg p-1.5 text-teal-500 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-50 focus:ring-teal-600"
                  data-hs-remove-element="#dismiss-alert"
                  onClick={() => {
                    setFile(null);
                    setAlert(false);
                    setSuccess(false);
                  }}
                >
                  <span class="sr-only">Dismiss</span>
                  <svg
                    class="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className="bg-[#726DED] text-white rounded-full px-8 py-4 disabled:opacity-75 flex items-center gap-4"
        onClick={checkFile}
        disabled={!sucess ? true : false}
      >
        Upload
        {loading && (
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-4 h-4 text-gray-200 animate-spin  fill-[#726DED] "
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default page;
