import { useEffect, useState } from "react";
import { formatNum } from "./section-components/CoinTable";

function HeaderCell(props) {
  return (
    <th scope="col" className="sticky top-0 py-3 px-6 border-b-2 bg-body border-purple-400 hover:bg-gray-700">
      <div className="flex items-center justify-end">
        {props.children}
        <button href="#">
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 320 512">
            <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
          </svg>
        </button>
      </div>
    </th>
  );
}

function HeaderCellLeading(props) {
  return (
    <th scope="col" className="sticky top-0 py-3 px-6 border-b-2 bg-body border-purple-400 hover:bg-gray-700">
      {props.children}
    </th>
  );
}

function DataCellLeading(props) {
  return (
    <td scope="row" className="py-4 px-4 font-semibold text-gray-200 text-left whitespace-nowrap">
      {props.children}
    </td>
  );
}

function DataCell({ isIncrement, children }) {
  return (
    <td
      className={`py-4 px-6 text-gray-200 text-right font-semibold ${
        (isIncrement === undefined && "") ||
        (isIncrement === true && "bg-green-500/25") ||
        (isIncrement === false && "bg-red-500/25")
      }`}
    >
      {children}
    </td>
  );
}

function TableHead(props) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      {props.children}
    </thead>
  );
}

function TableRow(props) {
  return <tr className="bg-body border-b border-blue-gray-800 hover:bg-blue-gray-800/50 ">{props.children}</tr>;
}

function TableHeadRow(props) {
  return <tr className="borer-b bg-gray-900 ">{props.children}</tr>;
}

function TableBody(props) {
  return <tbody>{props.children}</tbody>;
}

function Table(props) {
  return (
    <div
      id="table"
      className="container scrollbar-hidden max-w-screen-2xl overflow-y-auto h-[800px] mx-auto overflow-x-auto relative shadow-md  border border-blue-gray-800"
    >
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-4000">{props.children}</table>
    </div>
  );
}

export {
  HeaderCell,
  DataCell,
  DataCellLeading,
  TableRow,
  TableHead,
  TableHeadRow,
  TableBody,
  Table,
  HeaderCellLeading,
};
