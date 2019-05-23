/**
 * レセプト連想配列を生成する
 * @param {Array} rawdataArray 原データ配列
 */
export const createRezepts = (rawdataArray, isChangeLine, rezepts) => {
  const byId = {};
  const allIds = [];
  let rezeptId = -1;
  let recordId = 1;
  // 最初のREレコードからフッタ前までループ
  for (const record of rawdataArray.slice(1, rawdataArray.length - 1)) {
    if (record[0] === "RE") {
      rezeptId++;
      byId[rezeptId] = {
        id: rezeptId,
        records: [],
        isOpen: isChangeLine ? false : rezepts.byId[rezeptId].isOpen
      };
      allIds.push(rezeptId);
    }
    byId[rezeptId].records.push(recordId++);
  }
  return { type: "CREATE_REZEPTS", payload: { byId: byId, allIds: allIds } };
};

/**
 * レセプトを選択する
 * @param {Number} id 選択したレセプトID
 */
export const selectRezept = id => {
  return {
    type: "SELECT_REZEPT",
    payload: {
      id: id
    }
  };
};

/**
 * 全レセプトを選択する
 * @param {Boolean} isOpen 開いているか
 */
export const selectAllRezept = isOpen => {
  return {
    type: "SELECT_ALL_REZEPT",
    payload: {
      isOpen: isOpen
    }
  };
};

/**
 * store初期化
 */
export const clearRezepts = () => {
  return { type: "CLEAR_REZEPTS" };
};
