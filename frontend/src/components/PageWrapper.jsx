import { motion as Motion } from "framer-motion";

const pageVariant = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 }
};

const PageWrapper = ({ children }) => {
  return (
    <Motion.div
      variants={pageVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {children}
    </Motion.div>
  );
};

export default PageWrapper;