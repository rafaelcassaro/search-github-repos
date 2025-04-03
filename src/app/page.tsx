import { Suspense } from "react";
import { getRepos } from "./lib/api";
import SearchUser from "./ui/search";
import Table from "./ui/table";
import Loading from "./loading";
import SortBy from "./ui/sort";
import FilterReposInput from "./ui/filterReposInput";


export default async function Home(props: { searchParams?: Promise<{ user?: string; page?: string; }>; }) {
  const searchParams = await props.searchParams;
  const user = searchParams?.user || '';
  const repositoriesData = getRepos(user);

  return (
    <main className="max-w-screen-2xl mx-auto text-text-white ">
      <div className="">
        <h1 className=" block text-3xl font-bold">Pesquise um usuario do github</h1>
        <div className="my-6 ">
          <SearchUser />
        </div>
        <hr className="bg-weakblack p-1px my-7 mx-auto" />
      </div>
      <div className="flex justify-between ">
        <SortBy />
        <FilterReposInput />
      </div>

      <Suspense fallback={<Loading />}>
        <Table repositoriesData={repositoriesData} />
      </Suspense>
    </main>
  );
}