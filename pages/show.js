import { useRouter } from 'next/router';
import convertDirectoryToJson from "../lib/convertDirectoryToJson";
import findPath from "../lib/findPath";

export default function ShowFile({ fileTree }) {
    const router = useRouter();
    let { pubId } = router.query;

    if (!pubId) {
        return <div>Loading...</div>;
    }
    if(pubId.endsWith(".pdf"))
        pubId = pubId.replace(/\.pdf$/, "");


    const filePath = findPath(fileTree, pubId);//?.replace("public", "");

    if (!filePath) {
        return <div>File not found</div>;
    }

    return (
      <div>
        <h1>
          Displaying: <a href={filePath}>{pubId}.pdf</a>
        </h1>
        <embed src={filePath} type="application/pdf" width="100%" height="600px" style={{ height: "90vh" }} />
      </div>
    );
}

export async function getStaticProps() {
    const fileTree = convertDirectoryToJson("public");

    return {
        props: {
            fileTree,
        },
    };
}
