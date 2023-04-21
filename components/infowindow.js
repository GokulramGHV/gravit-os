import Image from 'next/image';
import WindowPanel from './window';

export default function InfoWindow({ isOpen, closeHandler, refPass }) {
  return (
    <WindowPanel
      title="About"
      isOpen={isOpen}
      closeHandler={closeHandler}
      refPass={refPass}
      height={350}
      width={350}
    >
      <div className="flex flex-col gap-3 justify-center items-center h-full">
        <Image
          src="/assets/Full Logo.svg"
          width={260}
          height={200}
          className="mx-auto"
          alt="logo"
        ></Image>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold text-xl mt-2">Made by:</p>
          <p className="font-medium text-lg mt-3">Gokulram A</p>
          <p className="font-medium">&</p>
          <p className="font-medium text-lg">Mahalakshmi M</p>
        </div>
      </div>
    </WindowPanel>
  );
}
