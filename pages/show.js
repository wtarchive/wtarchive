import { useRouter } from 'next/router';
import React, { useEffect, useRef } from "react";
import convertDirectoryToJson from "../lib/convertDirectoryToJson";
import findPath from "../lib/findPath";
import PDFObject from "pdfobject";

export default function ShowFile({ fileTree }) {
    const router = useRouter();
    let { pubId, query } = router.query;

    if (!pubId) {
        return <div>Loading...</div>;
    }
    if(pubId.endsWith(".pdf"))
        pubId = pubId.replace(/\.pdf$/, "");


    let filePath = findPath(fileTree, pubId);
    while(filePath == null){
        let year = undefined;
        let idWithoutYear = undefined;
        if (pubId.match(/^\d{4}_/)) {
            //Remove YYYY_
            year = pubId.match(/^\d{4}/)[0];
            idWithoutYear = pubId.replace(/^\d{4}_/, "");
        }
        if(idWithoutYear){
            filePath = findPath(fileTree, idWithoutYear);
            if(filePath) break;
            filePath = findPath(fileTree, idWithoutYear + "_" + year);
            if(filePath) break;
            filePath = findPath(fileTree, year + "_" + idWithoutYear);
        }
        if(filePath) break;
        filePath = findPath(fileTree, idWithoutYear || pubId, (a, b) => a.includes(b));
        break;
    }

    if (!filePath) {
        return <div>File not found</div>;
    }

    let filename = filePath.substring(filePath.lastIndexOf("/") + 1);
    const url = filePath;
    // let host = window.location.hostname;
    // if (host != "localhost") 
    // {
    //     if (host == "localhost")
    //         host = "wt-archive.netlify.app";
    //     url = "https://docs.google.com/viewer?embedded=true&url=" + encodeURIComponent(`https://${host}/${filePath}`);
    //     if(query)
    //         url += `&query=${encodeURIComponent(query)}`;
    // }
    // return (
    //   <div>
    //     <h1>
    //       Displaying: <a href={filePath}>{filename}</a>
    //     </h1>
    //     {/* <embed src={filePath} type="application/pdf" width="100%" height="600px" style={{ height: "90vh" }} ></embed> */}
    //     {/* <iframe src={url} width="100%" height="600px" style={{ height: "90vh" }}></iframe> */}
    //     PDFObject.embed(pdfUrl, containerRef.current, options);
    //   </div>
    // );

    const containerRef = useRef(null);

    useEffect(() => {
      const pdfUrl = url;
      const options = {
        width: "100%",
        height: "90vh",
        //style: { height: "90vh" }
      };

      PDFObject.embed(pdfUrl, containerRef.current, options);
    }, []);

    return (
      <div>
        <h1>
          Displaying: <a href={filePath}>{filename}</a>
        </h1>
        <div ref={containerRef}></div>
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
