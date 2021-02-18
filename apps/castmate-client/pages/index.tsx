import React from 'react';
import { MainLayout } from '@castmate/layouts/main';
import { MainRooms } from '@castmate/room';
// import { Button, CastmateLayout, MainItem } from '@castmate/ui';
// import { Community } from '@castmate/community';
// import {
//   Tv
// } from 'react-feather';
// import toast, { Toaster } from 'react-hot-toast';
// import { useAccess } from '../hooks/useAccess';

// const notify = () => toast.success((t) => (
//   <span>
//     Here is your toast
//   </span>
// ), {
//   style: {
//     background: '#394158',
//     color: '#fff',
//     fontSize: '14px'
//   },
//   iconTheme: {
//     primary: '#0E78F9',
//     secondary: '#fff',
//   },
// });

export function Index() {
  // const [{ allow: isUser }] = useAccess();

  return (
    <MainLayout>
      <MainRooms />
    </MainLayout>
    // <>
    //   <CastmateLayout>
    //     <Community title="Home">
    //       {isUser ? <div className="flex">
    //         <MainItem href="/create-room" icon={<Tv size={22} />} title="New room" description="set up new room" />
    //         <Button onClick={notify}>Make me a toast</Button>
    //       </div> :
    //         <div className="flex flex-col">
    //           <div className="font-bold text-5xl mb-2">Distance better now</div>
    //           <div className="font-medium text-xl mb-1">Watch media and chat in real time with no hassle</div>
    //           <div>Sign in to use the platform</div>
    //         </div>
    //       }
    //     </Community>
    //   </CastmateLayout>
    //   <Toaster
    //     position="bottom-center"
    //     reverseOrder={false}
    //   />
    // </>
  );
}

export default Index;
