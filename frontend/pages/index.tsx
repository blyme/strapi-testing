import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { fetchAPI } from "@/lib/api";
import { ICase } from "@/src/lib/types";

const inter = Inter({ subsets: ["latin"] });

type headingProps = {
  title: string | null;
};

export function Heading({ title }: headingProps) {
  return <h1 className={`${inter.className} test`}>{title}</h1>;
}

type ICaseWithTitle = Pick<ICase, "id"> & {
  attributes: Pick<ICase["attributes"], "title" | "slug">;
};

type props = {
  data: ICaseWithTitle[];
};

export default function Home({ data }: props) {
  console.log(data);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {data.map((a) => (
          <div key={a.id}>
            <Heading key={a.id} title={a.attributes.title} />
            <pre>slug:</pre>
            <code>{a.attributes.slug}</code>
          </div>
        ))}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const testsRes = await fetchAPI("/cases", {
    fields: ["title"],
    populate: {
      tags: {
        fields: ["name", "createdAt"]
      }
    }
  });

  return {
    props: {
      data: testsRes.data,
    },
  };
}
