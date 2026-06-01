import useGetAllJobs from "@/hooks/useGetAllJobs";
import Category from "../home/Category";
import Header from "../home/Header";
import LatestJobs from "../home/LatestJobs";

const Home = () => {
  useGetAllJobs();

  return (
    <div>
      <Header />
      <Category />
      <LatestJobs />
    </div>
  );
};

export default Home;
