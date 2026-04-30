import { motion as Motion } from "framer-motion";

const Reveal = ({ children }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </Motion.div>
  );
};

export default Reveal;