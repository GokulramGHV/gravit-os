import { motion, useDragControls } from 'framer-motion';
export default function WindowPanel({
  children,
  title,
  isOpen,
  closeHandler,
  refPass,
  height = 550,
  width = 800,
}) {
  const controls = useDragControls();

  const variants = {
    open: { scale: 1, y: 0, transition: { duration: 0.2, ease: 'linear' } },
    closed: {
      scale: 0,
      y: '100%',
      transition: { duration: 0.2, ease: 'linear' },
    },
  };

  function startDrag(event) {
    controls.start(event);
  }

  return (
    <>
      <motion.div
        drag
        dragListener={false}
        dragControls={controls}
        dragTransition={{ bounceDamping: 0, bounceStiffness: 1000 }}
        dragElastic={0}
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
        style={{ width: width, height: height }}
        className={`absolute transform dark:bg-[#252525] bg-[#eee] rounded-[24px] shadow-xl p-4 flex flex-col`}
      >
        <div className="flex">
          <div className="flex gap-6">
            <button
              className="w-4 h-4 rounded-full bg-[#FF7575] hover:bg-[#FF4D4D]"
              onClick={closeHandler}
            ></button>
            <button
              className="w-4 h-4 rounded-full bg-[#DB9E42] hover:bg-[#D68E2A]"
              onClick={closeHandler}
            ></button>
            <button
              className="w-4 h-4 rounded-full bg-[#959595] hover:bg-[#7E7E7E]"
              onClick={closeHandler}
            ></button>
          </div>
          <div
            className="font-medium w-full relative right-10 cursor-grab"
            onPointerDown={startDrag}
          >
            <p className="cursor-grab text-center select-none">{title}</p>
          </div>
        </div>
        {children}
      </motion.div>
    </>
  );
}
