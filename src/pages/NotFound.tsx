import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="label-amber uppercase tracking-[0.2em] text-[12px] font-bold">
          Error 404
        </div>
        <h1 className="mt-4 font-display text-[72px] lg:text-[96px] font-extrabold text-ivory leading-none">
          404
        </h1>
        <p className="mt-6 text-[16px] text-muted-2 leading-relaxed">
          The page you are looking for does not exist or has been moved. Use the button below to return to the home screen.
        </p>
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cta-shine">
            <Link to="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
