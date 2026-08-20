"use client";

import { createContext, useContext } from "react";
const TableContext = createContext();
function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div>{children}</div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <ul
      style={{ gridTemplateColumns: columns }}
      className={`grid border border-zinc-300 pl-2.5  py-3 font-semibold gap-x-9`}
    >
      {children}
    </ul>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <ul
      style={{ gridTemplateColumns: columns }}
      className={`grid gap-28 bg-white items-center pl-2.5 py-3 dark:bg-zinc-300 dark:text-zinc-950 gap-x-9`}
    >
      {children}
    </ul>
  );
}
function Body({ data, render }) {
  if (data.length === 0) {
    return (
      <p className="bg-white items-center text-center  py-7  font-medium text-gray-600">
        No data to show at the moment
      </p>
    );
  }
  return <div>{data.map(render)}</div>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
