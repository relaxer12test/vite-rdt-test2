import { defer } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { sample, sampleList } from "~/models/storage";
import { Suspense } from "react";
import { Await } from "react-router";

export async function loader() {
  return defer({
    list: await sampleList(),
    sample: sample(Math.ceil(Math.random() * 10000)),
    date: new Date().toISOString(),
  });
}

export default function List() {
  const { list, sample } = useLoaderData<typeof loader>();
  return (
    <div>
      <Suspense fallback={"…"}>
        <Await resolve={sample}>
          {(sample) => (
            <div>
              <div>sample: {sample}</div>
            </div>
          )}
        </Await>
      </Suspense>
      <ul>
        <Suspense fallback={"…"}>
          <Await resolve={list}>
            {(list) =>
              list.map((_: number, i: number) => (
                <li key={i}>
                  <Link to={`/${i}`}>Sample : {i}</Link>
                </li>
              ))
            }
          </Await>
        </Suspense>
      </ul>
    </div>
  );
}
