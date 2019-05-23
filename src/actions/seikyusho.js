/**
 * 原データ配列から請求書を生成する
 * @param {Array} rawdataArray 原データ配列
 */
export const createSeikyusho = (rawdataArray, isChangeLine, selectedId) => {
  return {
    type: "CREATE_SEIKYUSHO",
    payload: {
      headerId: 0,
      footerId: rawdataArray.length - 1,
      selectedId: isChangeLine ? 0 : selectedId,
      extention: getExtension(
        getTensuHyouCode(rawdataArray[0][0]),
        Boolean(rawdataArray[1][18])
      ),
      isActive: true
    }
  };
};

/**
 * レコードを選択する
 * @param {Number} selectedId 選択したレコード番号
 */
export const selectRecord = selectedId => {
  return {
    type: "SELECT_RECORD",
    payload: {
      selectedId: selectedId
    }
  };
};

/**
 * store初期化
 */
export const clearSeikyusho = () => {
  return { type: "CLEAR_SEIKYUSHO" };
};

/**
 * 点数表コードを取得する
 * @param {String} headerRecordShikibetsuInfo ヘッダのレコード識別情報
 */
const getTensuHyouCode = headerRecordShikibetsuInfo => {
  if (headerRecordShikibetsuInfo === "IR") {
    return 1;
  } else if (headerRecordShikibetsuInfo === "UK") {
    return 3;
  } else if (headerRecordShikibetsuInfo === "YK") {
    return 4;
  } else {
    return null;
  }
};

/**
 * 拡張子を取得する
 * @param {Number} tensuHyouCode 点数表コード
 * @param {Boolean} isHenrei 返戻レセプト？
 */
const getExtension = (tensuHyouCode, isHenrei) => {
  if (tensuHyouCode === 1 || tensuHyouCode === 3) {
    if (isHenrei) {
      return ".UKS";
    } else {
      return ".UKE";
    }
  } else if (tensuHyouCode === 3) {
    if (isHenrei) {
      return ".CYS";
    } else {
      return "CYO";
    }
  }
};
