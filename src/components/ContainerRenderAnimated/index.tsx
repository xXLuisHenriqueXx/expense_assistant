import React, { ReactNode } from "react";
import { AnimatePresence, MotiView } from "moti";

interface IContainerRenderAnimatedProps {
  children: ReactNode;
  index: number;
  isDeleted: boolean;
}

const ContainerRenderAnimated = ({
  children,
  index,
  isDeleted,
}: IContainerRenderAnimatedProps) => {
  return (
    <AnimatePresence>
      {!isDeleted && (
        <MotiView
          from={{ translateX: -300, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          exit={{ opacity: 0, translateX: 300 }}
          transition={{
            type: "timing",
            duration: 200,
            delay: index * 100,
          }}
        >
          {children}
        </MotiView>
      )}
    </AnimatePresence>
  );
};

export default ContainerRenderAnimated;
