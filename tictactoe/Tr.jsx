import React, { useRef, useEffect, memo } from "react";
import Td from "./Td";

const Tr = memo(({ rowIndex, rowData, dispatch }) => {
    console.log("tr render");
    const ref = useRef([]);
    useEffect(() => {
        console.log(
            "row",
            rowIndex === ref.current[0],
            rowData === ref.current[1],
            dispatch === ref.current[2]
        );
        ref.current = [rowIndex, rowData, dispatch];
    }, [rowIndex, rowData, dispatch]);
    return (
        <>
            <tr>
                {Array(rowData.length)
                    .fill()
                    .map((td, i) => (
                        <Td
                            key={"td" + i}
                            rowIndex={rowIndex}
                            cellIndex={i}
                            cellData={rowData[i]}
                            dispatch={dispatch}>
                            {""}
                        </Td>
                    ))}
            </tr>
        </>
    );
});

export default Tr;
