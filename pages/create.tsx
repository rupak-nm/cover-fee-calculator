import { CreateCover } from "@components/CreateCover";
import Header from "@components/Header";
import { NextPage } from "next";

const CreateCoverPage: NextPage = () => {
  return (
    <div>
      <Header title="Neptune Mutual - Create New Cover" navKey="create" />
      <main>
        <CreateCover />
      </main>

      <footer></footer>
    </div>
  );
};

export default CreateCoverPage;
