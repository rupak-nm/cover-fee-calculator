import { CreateCover } from "@components/CreateCover";
import Header from "@components/Header";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <Header title="Neptune Mutual - Create New Cover" />
      <main>
        <CreateCover />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
