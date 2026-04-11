import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="min-h-screen bg-background grid-bg flex items-center justify-center px-6">
    <div className="text-center">
      <h1 className="font-display font-extrabold text-8xl text-primary text-glow mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">الصفحة غير موجودة</p>
      <Link to="/">
        <Button className="bg-gradient-to-l from-primary to-secondary text-primary-foreground rounded-xl">
          العودة للرئيسية
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
