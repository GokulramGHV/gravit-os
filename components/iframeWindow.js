import WindowPanel from './window';
import Iframe from 'react-iframe';
import Script from 'next/script';
import Image from 'next/image';

export default function IFrameWindow({
  url,
  title,
  isOpen,
  closeHandler,
  refPass,
}) {
  return (
    <>
      <WindowPanel
        title={title}
        isOpen={isOpen}
        closeHandler={closeHandler}
        refPass={refPass}
      >
        <div className="relative rounded-xl w-full h-full mt-3">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/e/e9/VS_Code_%28Insiders%29.png"
            fill
            alt="display"
            className="rounded-xl"
          ></Image>
        </div>
      </WindowPanel>
    </>
  );
}
