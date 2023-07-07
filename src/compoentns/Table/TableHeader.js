import React, { useState } from "react";
// import arrowaup from "../../.../../../assets/images/arrowaup.svg";

const arrowDownStyle = {
  display: "inline-flex",
  marginLeft: "10px",
  transform: "rotate(180deg)",
  transition: "1s ease-out"
};
const arrowUpStyle = {
  display: "inline-flex",
  marginLeft: "10px",
  transform: "rotate(0deg)",
  transition: "1s ease-out"
};

function TableHeader({
  column,
  tableRowFilteredData,
  setTableRowFilteredData,
  genericProps,
  tableRowData
}) {
  const [sortType, setSortType] = useState("default"); // defult , sortup , sortdown

  const handleSortFunc = column => {
    const { enableSort, sortFunc } = column;

    let sortData = [...tableRowFilteredData];
    let newSortType = "default";

    switch (sortType) {
      case "default":
        if (column.sortingKeys || column.id) {
          sortData = _.sortBy(
            tableRowFilteredData,
            column.sortingKeys || column.id
          );
          newSortType = "sortUp";
        }
        break;
      case "sortUp":
        sortData = _.reverse(
          _.sortBy(tableRowFilteredData, column.sortingKeys || column.id)
        );
        newSortType = "sortDown";
        break;
      default:
        sortData = tableRowData;
        break;
    }

    if (enableSort) {
      setTableRowFilteredData(sortData);
    }

    if (enableSort && sortFunc) {
      sortFunc(tableRowData, column);
    }

    setSortType(newSortType);
  };
  return (
    <th onClick={() => handleSortFunc(column)}>
      {typeof column.titleAccessor === "function" ? (
        <column.titleAccessor
          {...column.titleAccessorProps}
          data={genericProps}
        />
      ) : (
        column.titleAccessor
      )}
      {column.tooltip && (
        <>
          <img id={column.id} src={tooltip} alt={tooltip} />
          <UncontrolledTooltip placement="top" target={column.id}>
            {column.tooltip}
          </UncontrolledTooltip>
        </>
      )}
      {typeof column.subTitleAccessor === "function" ? (
        <column.subTitleAccessor {...column.subTitleAccessor} />
      ) : (
        <small>{column.subTitleAccessor}</small>
      )}
      {column.enableSort && (
        <div
          style={
            sortType === "sortUp"
              ? arrowUpStyle
              : sortType === "sortDown"
              ? arrowDownStyle
              : { display: "none" }
          }
        >
          <img src={arrowaup} style={{ width: "15px" }} />
        </div>
      )}
    </th>
  );
}

export default TableHeader;
