import { CoverList } from "@components/CoverList";
import { CreateCover } from "@components/CreateCover";
import Header from "@components/Header";
import { NoCovers } from "@components/NoCovers";
import { useFetchCovers } from "@utils/hooks/useFetchCovers";
import { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [showFormPage, setShowFormPage] = useState(false);

  const { data } = useFetchCovers();
  return (
    <div>
      <Header title="Neptune Mutual - Create New Cover" />
      <main>
        {showFormPage ? (
          <CreateCover />
        ) : (
          <>
            {data.length ? (
              <CoverList
                covers={data}
                gotoCreateCover={() => setShowFormPage(true)}
              />
            ) : (
              <NoCovers gotoCreateCover={() => setShowFormPage(true)} />
            )}
          </>
        )}
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
