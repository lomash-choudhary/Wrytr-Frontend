import type { ReactElement } from "react";
import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  type VariantLabels,
} from "framer-motion";
const AnimationWrapper = ({
  children,
  key,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  className,
}: AnimationWrapperType) => {
  /*
        framer motion
        initial is used to define that how will our div look initially

        so intially we have defined that it will not be visible because we have made the
        opacitity to 0

        animate is used to make that will be the final state of this element going to be


        AnimatePresence keep track of our motion div so it gives us power to controll the div
    */
  return (
    <AnimatePresence>
      <motion.div
        key={key}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

interface AnimationWrapperType {
  children: ReactElement<any>;
  initial?: boolean | TargetAndTransition | VariantLabels | undefined;
  animate?: boolean | TargetAndTransition | VariantLabels | undefined;
  transition?: object;
  key: string;
  className?: string;
}

export default AnimationWrapper;
