import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { pageTransition } from "@/lib/motion";

const SiteLayout = () => {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col">
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
