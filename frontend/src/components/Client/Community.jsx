import { useEffect } from "react";

const Community = () => {
  useEffect(() => {
    window.location.href = "https://www.facebook.com/groups/nextconnecthub/", "_blank";
    
  }, []);

  return null; // This prevents rendering anything while redirecting
};

export default Community;
