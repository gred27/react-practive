import React, { useState, useEffect, useReducer, useCallback } from "react";
import Table from "./Table";

const initialState = {
    winner: "",
    turn: "O",
    tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ],
    recentCell: [-1, -1],
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner 이렇게 하면 안됨.
            // 항상 새로운 객체를 만들어서 바뀔 부분만 바꿔서 리턴
            // 기존 state의 얕은 복사
            return {
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL:
            // 불변성을 위해 객체들을 모두 얕은 복사
            // immer라는 라이브러리로 가독성 해결
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        case CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === "O" ? "X" : "O",
            };
        case RESET_GAME:
            return {
                ...state,
                turn: "O",
                tableData: [
                    ["", "", ""],
                    ["", "", ""],
                    ["", "", ""],
                ],
                recentCell: [-1, -1],
            };
        default:
            return state;
    }
};
const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;
    const onClickTable = useCallback(() => {
        // action을 dispatch 할 때마다 reducer가 실행됨.
        dispatch({ type: SET_WINNER, winner: winner });
    }, []);

    // 승리조건 체크
    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0 || cell < 0) {
            return;
        }

        let win = false;
        if (
            tableData[row][0] === turn &&
            tableData[row][1] === turn &&
            tableData[row][2] === turn
        ) {
            win = true;
        }

        if (
            tableData[0][cell] === turn &&
            tableData[1][cell] === turn &&
            tableData[2][cell] === turn
        ) {
            win = true;
        }

        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }

        if (tableData[2][0] === turn && tableData[1][1] === turn && tableData[0][2] === turn) {
            win = true;
        }

        if (win) {
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else {
            let checkDraw = true;
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) {
                        checkDraw = false;
                    }
                });
            });

            if (checkDraw) {
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}></Table>
            {winner && <div>{winner} 님의 승리</div>}
        </>
    );
};

export default TicTacToe;
