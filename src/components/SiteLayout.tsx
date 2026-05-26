import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { pageTransition } from "@/lib/motion";

const SiteLayout = () => {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col">
      {!reduce && (
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-accent z-[100] origin-left shadow-[0_0_10px_rgba(245,158,11,0.5)]"
          style={{ scaleX }}
        />
      )}
      <div aria-hidden className="atmosphere" />
      <SiteHeader />
      <AnimatePresence mode="popLayout">
        <motion.main
          id="main"
          key={pathname}
          className="flex-1"
          variants={reduce ? undefined : pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <SiteFooter />
    </div>
  );
};

export default SiteLayout;
