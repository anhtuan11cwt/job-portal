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
    <div className="px-6 md:px-12 lg:px-24 xl:px-40">
      <Header />
      <Category />
      <LatestJobs />
    </div>
  );
};

export default Home;
