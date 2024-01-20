import { Await } from "react-router";
import { Link, useLoaderData } from "@remix-run/react";
import { defer, LoaderFunctionArgs } from "@remix-run/node";
import { sample } from "~/models/storage";
import { Suspense } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  return defer({
    sample: sample(parseInt(`${params.id}`, 10)),
    date: new Date().toISOString(),
  });
}

export default function Sample() {
  const { sample } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        <Link to={"/list"}>Back</Link>
      </div>
      <div>Loaded Sample</div>
      <Suspense fallback={"…"}>
        <Await resolve={sample}>
          {(sample) => (
            <div>
              <div>{sample}</div>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
