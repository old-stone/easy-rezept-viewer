/**
 * レコード連想配列を生成する
 * @param {Array} rawdataArray 原データ配列
 */
export const createRecords = rawdataArray => {
  const byId = {};
  const allIds = [];
  let columnIndex = 0;
  rawdataArray.forEach((row, rowIndex) => {
    byId[rowIndex] = {
      id: rowIndex,
      recordShikibetsuInfo: row[0],
      columns: row.map(() => columnIndex++)
    };
    allIds.push(rowIndex);
  });
  return {
    type: "CREATE_RECORDS",
    payload: {
      byId: byId,
      allIds: allIds
    }
  };
};

/**
 * store初期化
 */
export const clearRecords = () => {
  return { type: "CLEAR_RECORDS" };
};
