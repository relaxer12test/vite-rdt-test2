export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function sampleList(): Promise<number[]> {
  await sleep(1500);

  return new Array(30).fill(1);
}

export async function sample(id: number): Promise<number> {
  await sleep(500);

  return id;
}
