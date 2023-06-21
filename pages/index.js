import { useState } from "react";
import convertDirectoryToJson from "../lib/convertDirectoryToJson";

const Directory = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button className="expand" onClick={() => setIsOpen(!isOpen)}>
        <span className="state">{isOpen ? "-" : "+"}</span> {name}
      </button>
      {isOpen && <ul>{children}</ul>}
    </li>
  );
};

const File = ({ name, path }) => (
  <li>
    <a href={`/show?pubId=${name}`}>{name}</a>
  </li>
);

const renderTree = (nodes, path = "") => {
  return Object.entries(nodes).map(([key, value]) => {
    if (typeof value !== "string") {
      if(path == "Books/"){
        return (renderTree(value, path + key + "/"));
      }
      return (
        <Directory key={path + key} name={key}>
          {renderTree(value, path + key + "/")}
        </Directory>
      );
    }

    return <File key={path + key} name={key} path={path + key} />;
  });
};

export default function Home({ fileTree }) {
  return (
    <div>
      <h1>List of PDF files</h1>
      <ul>{renderTree(fileTree)}</ul>
    </div>
  );
}

export async function getStaticProps() {
  const fileTree = convertDirectoryToJson("public");
  
  // console.log(fileTree);

  return {
    props: {
      fileTree,
    },
  };
}
