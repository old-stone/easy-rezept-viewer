/**
 * カラム連想配列を生成する
 * @param {Array} rawdataArray 原データ配列
 * @param {Object} master マスタ
 */
export const createColumns = (rawdataArray, recordDefs) => {
  const byId = {};
  const allIds = [];
  let columnId = 0;
  rawdataArray.forEach(row => {
    const recordShikibetsuInfo = row[0];
    const recordDef = recordDefs.byId[recordShikibetsuInfo];
    row.forEach((column, index) => {
      byId[columnId] = {
        id: columnId,
        recordShikibetsuInfo: recordShikibetsuInfo,
        value: column,
        error: deepCheck(column, recordDef && recordDef.columns[index])
      };
      allIds.push(columnId);
      columnId++;
    });
  });
  return { type: "CREATE_COLUMNS", payload: { byId: byId, allIds: allIds } };
};

/**
 * カラムの値を変更する
 * @param {Number} id カラムID
 * @param {String} value 値
 * @param {Object} columnDef カラム定義
 */
export const changeValue = (id, value, columnDef) => {
  return {
    type: "CHANGE_VALUE",
    payload: {
      id: id,
      value: value,
      error: deepCheck(value, columnDef)
    }
  };
};

/**
 * store初期化
 */
export const clearColumns = () => {
  return { type: "CLEAR_COLUMNS" };
};

/**
 * カラムレベルのチェックを行う
 * @param {String} value 値
 * @param {Object} columnDef カラム定義
 */
const deepCheck = (value, columnDef) => {
  if (value === undefined) {
    return "項目不足";
  }

  if (!columnDef) {
    return "項目超過";
  }

  const error = [];
  // TODO: 条件もっとある
  if (columnDef.type === "数字" && value.match(/[^0-9,.]/)) {
    error.push("モード誤り");
  }
  const byteLen = getByteLen(value);
  if (byteLen > columnDef.maxBytes) {
    error.push("バイト数超過");
  }
  if (columnDef.isFixed && byteLen < columnDef.maxBytes) {
    error.push("バイト数不足");
  }
  return error.join(",");
};

/**
 * 文字列のバイト数を取得する
 * @param {String} str 文字列
 */
const getByteLen = str => {
  const len = str.length;
  let cd,
    blen = 0;

  for (let i = 0; i < len; i++) {
    blen += 2;
    cd = str.charCodeAt(i);
    if (0x20 <= cd && cd <= 0x7e) {
      blen--;
    }
    if (0xff61 <= cd && cd <= 0xff9f) {
      blen--;
    }
  }
  return blen;
};
