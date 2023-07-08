import React, { useState } from "react";
import PropTypes from "prop-types";
import FormHeader from "./TableHeader";
import  "./table.module.scss";

const styleCss = {
  textAlign: "center",
  border: "none",
};

const HeadlessTable = ({
  tableConfig,
  tableRowData,
  tableStriped,
  tableHover,
  tableClass,
  genericProps,
  loading,
}) => {
  const [tableRowFilteredData, setTableRowFilteredData] = useState(tableRowData);

  return (
    <table
      className={`bijTable ${
        tableStriped && 'tableStripedClass'
      } ${tableHover && 'tableHoverClass'} ${tableClass}`}
    >
      <thead>
        <tr>
          {tableConfig?.map((column) => {
            return (
              <FormHeader
                tableRowFilteredData={tableRowFilteredData}
                setTableRowFilteredData={setTableRowFilteredData}
                column={column}
                genericProps={genericProps}
                tableRowData={tableRowData}
              />
            );
          })}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <>
            {new Array(tableConfig?.length).fill(0)?.map(() => {
              return (
                <td>
                  <div className={'skeletonBox'}></div>
                </td>
              );
            })}
          </>
        ) : (
          <>
            {tableRowFilteredData?.length === 0 && (
              <>
                <tr>
                  <td style={styleCss} colspan={tableConfig?.length}>
                    No Data Found
                  </td>
                </tr>
              </>
            )}
            {tableRowFilteredData?.map((list, index) => {
              return (
                <tr>
                  {tableConfig?.map((value) => {
                    return (
                      <>
                        <td>
                          {typeof value.accessor === "function" ? (
                            <value.accessor
                              genericProps={genericProps}
                              {...value.accessorProps}
                              data={list}
                              index={index}
                            />
                          ) : (
                            <>
                              {list[value.accessor] !== null &&
                                value?.accessorIcon}{" "}
                              {list[value.accessor] === null ||
                              list[value.accessor] === undefined
                                ? "-"
                                : value?.accessorIcon === "₹"
                                ? list[value.accessor].toLocaleString("en-IN", {
                                    currency: "INR",
                                  })
                                : list[value.accessor]}
                            </>
                          )}
                        </td>
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </>
        )}
      </tbody>
    </table>
  );
};

HeadlessTable.PropTypes = {
  tableConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableRowData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableStriped: PropTypes.bool,
  tableHover: PropTypes.bool,
  tableClass: PropTypes.object,
  genericProps: PropTypes.object,
  loading: PropTypes.bool,
};

export default HeadlessTable;
