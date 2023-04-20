import Image from 'next/image';
import ArrowIcon from '@/components/arrow';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import FileManager from '@/components/filemanager';
import IFrameWindow from '@/components/iframeWindow';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import InfoWindow from '@/components/infowindow';

const toggles = [
  {
    name: 'wifi',
    icon: (
      <svg
        className="fill-current w-6 text-[#eee] dark:text-[#252525]"
        viewBox="0 0 26 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.574984 7.575C1.21248 8.2125 2.22498 8.275 2.91248 7.7C8.74998 2.9 17.225 2.9 23.075 7.6875C23.775 8.2625 24.8 8.2125 25.4375 7.575C26.175 6.8375 26.125 5.6125 25.3125 4.95C18.175 -0.887498 7.84998 -0.887498 0.699984 4.95C-0.112516 5.6 -0.175016 6.825 0.574984 7.575ZM10.275 17.275L12.1125 19.1125C12.6 19.6 13.3875 19.6 13.875 19.1125L15.7125 17.275C16.3 16.6875 16.175 15.675 15.425 15.2875C14.6689 14.8993 13.8312 14.6968 12.9812 14.6968C12.1313 14.6968 11.2936 14.8993 10.5375 15.2875C9.82498 15.675 9.68748 16.6875 10.275 17.275ZM5.61248 12.6125C6.22498 13.225 7.18748 13.2875 7.89998 12.775C9.39129 11.7199 11.1732 11.1533 13 11.1533C14.8268 11.1533 16.6087 11.7199 18.1 12.775C18.8125 13.275 19.775 13.225 20.3875 12.6125L20.4 12.6C21.15 11.85 21.1 10.575 20.2375 9.9625C15.9375 6.85 10.075 6.85 5.76248 9.9625C4.89998 10.5875 4.84998 11.85 5.61248 12.6125Z" />
      </svg>
    ),
  },
  {
    name: 'bluetooth',
    icon: (
      <svg
        className="w-4 fill-current text-[#eee] dark:text-[#252525]"
        viewBox="0 0 18 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.4063 17.5L11.4063 13L17.4063 8.5C17.5809 8.36901 17.7227 8.19916 17.8203 8.00389C17.9179 7.80863 17.9688 7.59331 17.9688 7.375C17.9688 7.15669 17.9179 6.94137 17.8203 6.74611C17.7227 6.55084 17.5809 6.38099 17.4063 6.25L9.90625 0.625001C9.69733 0.468306 9.4489 0.372886 9.18879 0.349433C8.92869 0.325979 8.6672 0.375419 8.43361 0.492212C8.20003 0.609006 8.00358 0.788538 7.86628 1.01069C7.72898 1.23285 7.65626 1.48884 7.65626 1.75V10.1875L2.40626 6.25C2.10789 6.02622 1.73284 5.93014 1.36363 5.98288C0.99442 6.03563 0.661282 6.23288 0.437506 6.53125C0.21373 6.82962 0.117645 7.20466 0.170389 7.57387C0.223134 7.94309 0.420387 8.27622 0.718756 8.5L6.71876 13L0.718756 17.5C0.571019 17.6108 0.446552 17.7496 0.352463 17.9085C0.258375 18.0674 0.196506 18.2433 0.170389 18.4261C0.144273 18.6089 0.15442 18.7951 0.200252 18.974C0.246084 19.1529 0.326703 19.321 0.437506 19.4688C0.548308 19.6165 0.687126 19.741 0.846031 19.835C1.00494 19.9291 1.18082 19.991 1.36363 20.0171C1.54645 20.0432 1.73262 20.0331 1.91151 19.9873C2.0904 19.9414 2.25852 19.8608 2.40626 19.75L7.65626 15.8125V24.25C7.65626 24.5112 7.72898 24.7672 7.86628 24.9893C8.00358 25.2115 8.20003 25.391 8.43361 25.5078C8.6672 25.6246 8.92869 25.674 9.18879 25.6506C9.4489 25.6271 9.69733 25.5317 9.90625 25.375L17.4063 19.75C17.5809 19.619 17.7227 19.4492 17.8203 19.2539C17.9179 19.0586 17.9688 18.8433 17.9688 18.625C17.9688 18.4067 17.9179 18.1914 17.8203 17.9961C17.7227 17.8008 17.5809 17.631 17.4063 17.5ZM10.4688 4.5625L14.2188 7.375L10.4688 10.1875V4.5625ZM10.4688 21.4375V15.8125L14.2188 18.625L10.4688 21.4375Z" />
      </svg>
    ),
  },
  {
    name: 'battery',
    icon: (
      <svg
        className="w-6 fill-current text-[#eee] dark:text-[#252525]"
        viewBox="0 0 26 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.4 9.3024C11.4 7.3232 10.4112 4.4432 8.46559 0.860801C8.13279 0.2464 7.26079 0.2528 6.88639 0.8368C6.36479 1.648 5.58879 2.4784 4.55199 3.3248L4.09279 3.688L3.04159 4.4992C0.891189 6.2304 0.0431894 7.768 0.230389 10.0416C0.393589 12.0512 1.59839 13.4896 3.66559 14.1488C2.93599 15.008 1.97599 15.6848 0.775989 16.1872C0.546263 16.2844 0.36423 16.4684 0.269532 16.6991C0.174834 16.9299 0.175142 17.1887 0.270389 17.4192C0.468789 17.8992 1.01439 18.1264 1.48959 17.928C3.76959 16.976 5.40639 15.4464 6.35519 13.3632C6.71039 12.5856 6.99519 11.8176 7.20639 11.0608L7.25919 10.8656L7.38719 10.3472L7.47199 9.9312L7.52319 9.6352L7.60639 9.0368C7.65919 8.5616 7.68159 8.0928 7.67519 7.6288L7.67039 7.6C7.68011 7.3616 7.78035 7.13588 7.95068 6.96881C8.12102 6.80174 8.34865 6.7059 8.58719 6.7008C8.71032 6.69953 8.83249 6.72253 8.94673 6.76848C9.06097 6.81444 9.16504 6.88244 9.253 6.96861C9.34096 7.05479 9.41108 7.15744 9.45936 7.27072C9.50764 7.38399 9.53314 7.50567 9.53439 7.6288C9.56319 9.4624 9.19519 11.3328 8.43359 13.2352L8.40159 13.3472C8.38148 13.4608 8.39598 13.5779 8.44319 13.6832C8.57119 13.9712 8.90719 14.0992 9.19039 13.968L9.33439 13.896C9.4204 13.8471 9.50134 13.7897 9.57599 13.7248C10.4752 12.9408 11.4 11.2816 11.4 9.3024ZM22.5904 5.7664C22.5308 4.74764 22.0841 3.79018 21.3417 3.09001C20.5992 2.38983 19.6173 1.99989 18.5968 2H12.2544C11.7536 2 11.3968 2.224 11.3968 2.7968C11.3968 3.3696 11.7168 3.5904 12.2544 3.5904H19.0064L19.1984 3.6C19.6932 3.64773 20.1525 3.87803 20.4868 4.24601C20.8211 4.61399 21.0063 5.09327 21.0064 5.5904V14.4L20.9968 14.592C20.9491 15.0868 20.7188 15.5462 20.3508 15.8804C19.9828 16.2147 19.5035 16.3999 19.0064 16.4H6.59679C6.11519 16.4 5.79359 16.7088 5.79359 17.192C5.79359 17.6768 6.11359 17.992 6.59679 18H18.5968L18.832 17.9936C19.8505 17.9336 20.8075 17.4867 21.5074 16.7443C22.2072 16.002 22.5969 15.0202 22.5968 14V12.6896H24.464L24.6432 12.6784C24.9629 12.635 25.2559 12.4772 25.4681 12.2342C25.6802 11.9911 25.797 11.6794 25.7968 11.3568V8.6912L25.7872 8.528C25.7474 8.20501 25.5909 7.90769 25.3472 7.69199C25.1035 7.4763 24.7894 7.35709 24.464 7.3568L22.5968 7.3328V6L22.5904 5.7664Z" />
      </svg>
    ),
  },
  {
    name: 'airplane',
    icon: (
      <svg
        className="w-5 fill-current text-[#eee] dark:text-[#252525]"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22.4133 1.21333C23.2 2 23.2 3.26666 22.4133 4.04L17.2267 9.22667L20.0533 21.48L18.1733 23.3733L13 13.4667L7.79999 18.6667L8.27999 21.96L6.85333 23.3733L4.50666 19.1333L0.253326 16.7733L1.66666 15.3333L4.99999 15.8267L10.16 10.6667L0.253326 5.45333L2.14666 3.57333L14.4 6.4L19.5867 1.21333C20.3333 0.439998 21.6667 0.439998 22.4133 1.21333Z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [time, setTime] = useState(new Date());
  const { systemTheme, theme, setTheme } = useTheme();
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const constraintsRef = useRef(null);
  const [activeWindows, setActiveWindows] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const closeWindowHandler = (id) =>
    setActiveWindows((prev) => {
      prev[id] = false;
      return [...prev];
    });

  const toggleWindowHandler = (id) => {
    setActiveWindows((prev) => {
      prev[id] = !prev[id];
      return [...prev];
    });
  };

  // Clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const viewer_selection = document.getElementById('spline-viewer');
        console.log('Viewer:', viewer_selection.shadowRoot);
        if (viewer_selection.shadowRoot)
          viewer_selection.shadowRoot.querySelector('#logo').remove();
      }, 1000);
    }
  }, []);

  const dock_items = [
    {
      name: 'File Manager',
      icon: '/assets/folder_icons/user-desktop.svg',
      clickHandle: () => {
        toggleWindowHandler(0);
      },
    },
    {
      name: 'Chrome',
      icon: '/assets/app_icons/google-chrome.svg',
      clickHandle: () => {
        toggleWindowHandler(1);
      },
    },
    {
      name: 'Spotify',
      icon: '/assets/app_icons/spotify-client.svg',
      clickHandle: () => {
        toggleWindowHandler(2);
      },
    },
    {
      name: 'Mail',
      icon: '/assets/app_icons/internet-mail.svg',
      clickHandle: () => {
        toggleWindowHandler(3);
      },
    },
    {
      name: 'Vscode',
      icon: '/assets/app_icons/visual-studio-code.svg',
      clickHandle: () => {
        toggleWindowHandler(4);
      },
    },
    {
      name: 'Youtube',
      icon: '/assets/app_icons/youtube.svg',
      clickHandle: () => {
        toggleWindowHandler(5);
      },
    },
    {
      name: 'Info',
      icon: '/assets/app_icons/userinfo.svg',
      clickHandle: () => {
        toggleWindowHandler(6);
      },
    },
  ];

  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@0.9.300/build/spline-viewer.js"
      ></Script>

      <motion.div
        ref={constraintsRef}
        className="flex h-screen flex-col items-center justify-center bg-cover"
      >
        <spline-viewer
          id="spline-viewer"
          url="https://prod.spline.design/dxgbd4TTfVIapmMF/scene.splinecode"
        ></spline-viewer>
        <div className="fixed top-5 w-full h-fit flex justify-between">
          <div className="dark:bg-[#252525] bg-[#eee] rounded-full  ml-10 px-5 py-2 font-semibold">
            ⛅ Cloudy Weather{' '}
          </div>
          <div className="dark:bg-[#252525] bg-[#eee] rounded-full flex mr-10 px-5 py-2 font-semibold items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-calendar2"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
              <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
            </svg>
            <p className="ml-3">
              {time.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                year: 'numeric',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        <div className="fixed bottom-10 w-full flex justify-between">
          <div className="mx-10 dark:bg-[#252525] bg-[#eee] rounded-[28px] p-3 flex">
            <button
              onClick={() => setShowNotificationPanel(!showNotificationPanel)}
              className="p-4 flex justify-center items-center rounded-2xl  hover:bg-slate-300/70 dark:hover:bg-slate-600/40 cursor-pointer"
            >
              <svg
                className={`w-6 fill-current transition-all duration-300 ease-in-out ${
                  showNotificationPanel ? 'rotate-180' : 'rotate-0'
                }`}
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.85 9.99999C1.95 9.99999 1.32467 9.59132 0.974001 8.77399C0.623334 7.95666 0.765333 7.23199 1.4 6.59999L6.6 1.39999C6.8 1.19999 7.01667 1.04999 7.25 0.949989C7.48333 0.849989 7.73333 0.799988 8 0.799988C8.26667 0.799988 8.51667 0.849989 8.75 0.949989C8.98333 1.04999 9.2 1.19999 9.4 1.39999L14.6 6.59999C15.2333 7.23332 15.3747 7.95866 15.024 8.77599C14.6733 9.59332 14.0487 10.0013 13.15 9.99999H2.85Z" />
              </svg>
            </button>
            <div className="p-4 rounded-xl hover:bg-slate-300/70 dark:hover:bg-slate-600/40 cursor-pointer">
              <svg
                width="28"
                height="14"
                className="fill-current relative top-[5px]"
                viewBox="0 0 28 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.666672 1.66665C0.666672 1.28887 0.794672 0.971985 1.05067 0.715985C1.30667 0.459985 1.62312 0.332429 2 0.333318L23.3333 0.333318C23.7111 0.333318 24.028 0.461318 24.284 0.717318C24.54 0.973318 24.6676 1.28976 24.6667 1.66665V4.33332H26C26.3778 4.33332 26.6947 4.46132 26.9507 4.71732C27.2067 4.97332 27.3342 5.28976 27.3333 5.66665V8.33332C27.3333 8.7111 27.2053 9.02798 26.9493 9.28399C26.6933 9.53998 26.3769 9.66754 26 9.66665H24.6667V12.3333C24.6667 12.7111 24.5387 13.028 24.2827 13.284C24.0267 13.54 23.7102 13.6675 23.3333 13.6667L2 13.6667C1.62223 13.6667 1.30534 13.5387 1.04934 13.2827C0.793339 13.0267 0.665783 12.7102 0.666672 12.3333V1.66665ZM19.3333 2.99998V11H22V2.99998H19.3333Z" />
              </svg>
            </div>
            <div
              className="py-3 px-4 flex justify-center items-center rounded-2xl  hover:bg-slate-300/70 dark:hover:bg-slate-600/40   hover:text-gray-600  dark:hover:text-white cursor-pointer"
              onClick={() =>
                theme == 'dark' ? setTheme('light') : setTheme('dark')
              }
            >
              <div className="relative">
                {theme === 'light' ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="11"
                      stroke="black"
                      stroke-width="2"
                    />
                    <circle cx="12" cy="12" r="5.5" stroke="black" />
                    <line
                      x1="12.25"
                      y1="7"
                      x2="12.25"
                      y2="17"
                      stroke="black"
                      stroke-width="0.5"
                    />
                    <path
                      d="M6.5 11.5L8.5 7.5L12 6V17.5L10.5 17L7.5 15.5L6.5 11.5Z"
                      fill="black"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="11"
                      stroke="white"
                      stroke-width="2"
                    />
                    <circle cx="12" cy="12" r="5.5" stroke="white" />
                    <line
                      x1="12.25"
                      y1="7"
                      x2="12.25"
                      y2="17"
                      stroke="white"
                      stroke-width="0.5"
                    />
                    <path
                      d="M17.5 11.5L16 8L12.5 6.5V17H14L16.5 15L17.5 11.5Z"
                      fill="white"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
          <div className="mx-10 dark:bg-[#252525] bg-[#eee] rounded-[28px] p-3 flex gap-2">
            {dock_items.map((item, i) => (
              <div
                key={i}
                onClick={item.clickHandle}
                className="p-2 flex justify-center items-center rounded-2xl hover:bg-slate-300/70 dark:hover:bg-slate-600/40 cursor-pointer"
              >
                <Image src={item.icon} alt={item.name} height={40} width={40} />
              </div>
            ))}
          </div>
          <div className="mx-10 dark:bg-[#252525] bg-[#eee] rounded-[28px] p-3 flex">
            <div className="p-1 flex justify-center items-center rounded-2xl  hover:bg-slate-300/70 dark:hover:bg-slate-600/40">
              <Image
                src="/assets/Logo.svg"
                alt="gravitOS logo"
                height={45}
                width={45}
              />
            </div>
          </div>
        </div>

        {/* Notification Panel */}
        <div
          className={`fixed bottom-[140px] left-10 p-6 dark:bg-[#252525] bg-[#eee] rounded-[28px] transition-all duration-300 ease-in-out ${
            showNotificationPanel
              ? 'scale-100'
              : 'scale-0 translate-y-[60%] translate-x-[-40%]'
          }`}
        >
          <div className="rounded-[16px] bg-gray-300/40 dark:bg-[#383838] px-10 py-4 flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold ">
              {time.toLocaleTimeString('en-US').split(' ')[0].slice(0, -3)}{' '}
              {time.toLocaleTimeString('en-US').split(' ')[1]}
            </h2>
            <p className="text-2xl font-medium mt-2">
              {time.toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
          </div>
          <div className="grid grid-cols-2  gap-4 mt-6 mb-10">
            {toggles.map((toggleElem, i) => (
              <div
                key={i}
                className="rounded-[16px] dark:bg-[#b1d9ff] bg-[#7bb7ef] px-4 py-6 flex justify-center items-center"
              >
                <div>{toggleElem.icon}</div>
                <div className="border-r-[2px] border-gray-300 pr-[15px] mr-[17px] h-5"></div>
                <div>
                  <ArrowIcon className="w-[12px] text-[#eee] dark:text-[#252525]"></ArrowIcon>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 mb-8">
            <div className="w-full flex justify-center items-center">
              <svg
                className="w-8 fill-current"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.53333 24.6667H6C5.26667 24.6667 4.63867 24.4053 4.116 23.8827C3.59333 23.36 3.33244 22.7324 3.33333 22V18.4667L0.766667 15.8667C0.255556 15.3556 0 14.7333 0 14C0 13.2667 0.255556 12.6444 0.766667 12.1333L3.33333 9.53333V6C3.33333 5.26667 3.59467 4.63867 4.11733 4.116C4.64 3.59333 5.26756 3.33244 6 3.33333H9.53333L12.1333 0.766667C12.6444 0.255556 13.2667 0 14 0C14.7333 0 15.3556 0.255556 15.8667 0.766667L18.4667 3.33333H22C22.7333 3.33333 23.3613 3.59467 23.884 4.11733C24.4067 4.64 24.6676 5.26756 24.6667 6V9.53333L27.2333 12.1333C27.7444 12.6444 28 13.2667 28 14C28 14.7333 27.7444 15.3556 27.2333 15.8667L24.6667 18.4667V22C24.6667 22.7333 24.4053 23.3613 23.8827 23.884C23.36 24.4067 22.7324 24.6676 22 24.6667H18.4667L15.8667 27.2333C15.3556 27.7444 14.7333 28 14 28C13.2667 28 12.6444 27.7444 12.1333 27.2333L9.53333 24.6667ZM14 20.6667C15.8444 20.6667 17.4169 20.0164 18.7173 18.716C20.0178 17.4156 20.6676 15.8436 20.6667 14C20.6667 12.1556 20.0164 10.5831 18.716 9.28267C17.4156 7.98222 15.8436 7.33244 14 7.33333C12.1556 7.33333 10.5831 7.98356 9.28267 9.284C7.98222 10.5844 7.33244 12.1564 7.33333 14C7.33333 15.8444 7.98356 17.4169 9.284 18.7173C10.5844 20.0178 12.1564 20.6676 14 20.6667ZM14 18C15.1111 18 16.0556 17.6111 16.8333 16.8333C17.6111 16.0556 18 15.1111 18 14C18 12.8889 17.6111 11.9444 16.8333 11.1667C16.0556 10.3889 15.1111 10 14 10C12.8889 10 11.9444 10.3889 11.1667 11.1667C10.3889 11.9444 10 12.8889 10 14C10 15.1111 10.3889 16.0556 11.1667 16.8333C11.9444 17.6111 12.8889 18 14 18ZM14 25.3333L17.3333 22H22V17.3333L25.3333 14L22 10.6667V6H17.3333L14 2.66667L10.6667 6H6V10.6667L2.66667 14L6 17.3333V22H10.6667L14 25.3333ZM14 18C15.1111 18 16.0556 17.6111 16.8333 16.8333C17.6111 16.0556 18 15.1111 18 14C18 12.8889 17.6111 11.9444 16.8333 11.1667C16.0556 10.3889 15.1111 10 14 10C12.8889 10 11.9444 10.3889 11.1667 11.1667C10.3889 11.9444 10 12.8889 10 14C10 15.1111 10.3889 16.0556 11.1667 16.8333C11.9444 17.6111 12.8889 18 14 18Z" />
              </svg>
              <div className="relative flex w-full ml-5">
                <div className="absolute -top-1 h-[5px] rounded-full w-full dark:bg-[#EDEDED33] bg-gray-400/50">
                  <div className="h-[5px] rounded-full dark:bg-[#EDEDED] bg-[#252525] w-[65%]"></div>
                  <div className="dark:bg-[#EDEDED] bg-[#252525] h-4 w-4 rounded-full absolute -top-[5px] left-[130px]"></div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <svg
                className="w-8 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 9.33334V14.6667C0 15.4 0.6 16 1.33333 16H5.33333L9.72 20.3867C10.56 21.2267 12 20.6267 12 19.44V4.54667C12 3.36001 10.56 2.76001 9.72 3.60001L5.33333 8.00001H1.33333C0.6 8.00001 0 8.60001 0 9.33334ZM18 12C17.9997 10.8828 17.6875 9.78793 17.0986 8.83859C16.5097 7.88926 15.6674 7.12319 14.6667 6.62667V17.36C16.64 16.3867 18 14.36 18 12ZM14.6667 1.93334V2.20001C14.6667 2.70667 15 3.14667 15.4667 3.33334C18.9067 4.70667 21.3333 8.08001 21.3333 12C21.3333 15.92 18.9067 19.2933 15.4667 20.6667C14.9867 20.8533 14.6667 21.2933 14.6667 21.8V22.0667C14.6667 22.9067 15.5067 23.4933 16.28 23.2C20.8 21.48 24 17.12 24 12C24 6.88001 20.8 2.52001 16.28 0.800007C15.5067 0.49334 14.6667 1.09334 14.6667 1.93334Z" />
              </svg>

              <div className="relative flex w-full ml-5">
                <div className="absolute -top-1 h-[5px] rounded-full w-full dark:bg-[#EDEDED33] bg-gray-400/50">
                  <div className="h-[5px] rounded-full dark:bg-[#EDEDED] bg-[#252525] w-[35%]"></div>
                  <div className="dark:bg-[#EDEDED] bg-[#252525] h-4 w-4 rounded-full absolute -top-[5px] left-[60px]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full">
            <svg
              className="absolute top-1/2 left-4 transform -translate-y-1/2 w-4 fill-current  "
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.9152 20.2277L11.6652 13.9777C11.1072 14.4241 10.4654 14.7775 9.73997 15.038C9.01453 15.2984 8.24258 15.4286 7.42413 15.4286C5.3966 15.4286 3.68082 14.7262 2.27681 13.3214C0.872787 11.9167 0.170407 10.2009 0.169662 8.17413C0.169662 6.1466 0.872043 4.43082 2.27681 3.02681C3.68157 1.62279 5.39734 0.920407 7.42413 0.919662C9.45166 0.919662 11.1674 1.62204 12.5714 3.02681C13.9755 4.43157 14.6778 6.14734 14.6786 8.17413C14.6786 8.99258 14.5484 9.76453 14.288 10.49C14.0275 11.2154 13.6741 11.8572 13.2277 12.4152L19.5056 18.6931C19.7102 18.8977 19.8125 19.1488 19.8125 19.4464C19.8125 19.7441 19.7009 20.0045 19.4777 20.2277C19.2731 20.4323 19.0127 20.5346 18.6964 20.5346C18.3802 20.5346 18.1198 20.4323 17.9152 20.2277ZM7.42413 13.1964C8.81922 13.1964 10.0052 12.708 10.9822 11.731C11.9591 10.7541 12.4472 9.56847 12.4464 8.17413C12.4464 6.77904 11.958 5.59303 10.981 4.61609C10.0041 3.63916 8.81847 3.15106 7.42413 3.15181C6.02904 3.15181 4.84303 3.64027 3.86609 4.61721C2.88916 5.59414 2.40106 6.77978 2.40181 8.17413C2.40181 9.56922 2.89027 10.7552 3.86721 11.7322C4.84414 12.7091 6.02978 13.1972 7.42413 13.1964Z" />
            </svg>

            <input
              type="text"
              placeholder="Search"
              className="rounded-full pl-12 w-full py-1 dark:bg-[#363636] bg-gray-300/50 focus:outline-none"
            />
          </div>
          <div className="mt-6 flex gap-6 justify-around">
            <Image
              src="/assets/app_icons/visual-studio-code.svg"
              alt="vscode"
              height={40}
              width={40}
            />
            <Image
              src="/assets/app_icons/google-chrome.svg"
              alt="chrome"
              height={40}
              width={40}
            />
            <Image
              src="/assets/app_icons/internet-mail.svg"
              alt="mail"
              height={40}
              width={40}
            />
            <Image
              src="/assets/app_icons/youtube.svg"
              alt="youtube"
              height={40}
              width={40}
            />
          </div>
        </div>

        {/* Context Windows */}
        <FileManager
          isOpen={activeWindows[0]}
          closeHandler={() => {
            closeWindowHandler(0);
          }}
          refPass={constraintsRef}
        />
        <IFrameWindow
          title="Google Chrome"
          url="https://google-clone-psi-peach.vercel.app/"
          isOpen={activeWindows[1]}
          closeHandler={() => {
            closeWindowHandler(1);
          }}
          refPass={constraintsRef}
          // url="https://friendly-pare-03979d.netlify.app/" spotify
          // url="https://youtubewebui.netlify.app/" youtube
          // https://priyanshu-gmail-clone.netlify.app/ gmail
        ></IFrameWindow>
        <IFrameWindow
          title="Spotify"
          url="https://friendly-pare-03979d.netlify.app/"
          isOpen={activeWindows[2]}
          closeHandler={() => {
            closeWindowHandler(2);
          }}
          refPass={constraintsRef}
        ></IFrameWindow>
        <IFrameWindow
          title="VS Code"
          url="https://upload.wikimedia.org/wikipedia/commons/e/e9/VS_Code_%28Insiders%29.png"
          isOpen={activeWindows[4]}
          closeHandler={() => {
            closeWindowHandler(4);
          }}
          refPass={constraintsRef}
        ></IFrameWindow>
        <InfoWindow
          isOpen={activeWindows[6]}
          closeHandler={() => {
            closeWindowHandler(6);
          }}
          refPass={constraintsRef}
        />
      </motion.div>
    </>
  );
}
