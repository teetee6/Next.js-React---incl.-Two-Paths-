import { useRouter } from "next/router";

export default function some_id() {
  let router = useRouter();
  console.log(router.query);

  return (
    <div>
      <h1>events-some_id page</h1>
    </div>
  );
}
