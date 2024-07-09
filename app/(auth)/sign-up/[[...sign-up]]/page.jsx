import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#726DED]">
      <div className=' shadow-2xl'>
        <SignUp />
      </div>
    </div>
  );
}
