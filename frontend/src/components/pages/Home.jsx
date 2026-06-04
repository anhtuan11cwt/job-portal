import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import Category from "../home/Category";
import Header from "../home/Header";
import LatestJobs from "../home/LatestJobs";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="mx-auto px-2 sm:px-4 lg:px-6 max-w-7xl">
      <Header />
      <Category />
      <LatestJobs />
    </div>
  );
};

export default Home;
