import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  //// 링크를 클릭하지 않고 주소창에 바로 검색해서 이동하면,  동적사전생성이 끝나지 않았기 때문에 에러가 난다.
  // 폴백상태일때 보여준다(fallback: true)
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// 동적 페이지의 어떤 인스턴스를 사전 생성할지 알려주는 함수
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    // paths: [
    //     { params: { pid: "p1" } },
    //   ////   { params: { pid: "p2" } },
    //   ////   { params: { pid: "p3" } },
    // ],
    paths: pathsWithParams,
    fallback: true,
  };
}

export default ProductDetailPage;
