import { motion, type HTMLMotionProps } from 'framer-motion';

type RevealProps = HTMLMotionProps<'div'> & { delay?: number };

/** Fades + lifts its children in once, when they scroll into view. */
const Reveal = ({ delay = 0, children, ...props }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    {...props}
  >
    {children}
  </motion.div>
);

export default Reveal;
