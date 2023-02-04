import { useRouter } from "next/router";

function events_slug_function() {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h1>events/...slug page</h1>
    </div>
  );
}

export default events_slug_function;
