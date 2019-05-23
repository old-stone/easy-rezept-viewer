export const changeRawdata = text => {
  const array = csv2array(text);
  return {
    type: "CHANGE_RAWDATA",
    text: text,
    array: array,
    errors: shallowCheck(array)
  };
};

export const createRawdata = (records, columns) => {
  return changeRawdata(
    records.allIds
      .map(recordId =>
        records.byId[recordId].columns
          .map(columnId => columns.byId[columnId].value)
          .join(",")
      )
      .join("\n")
  );
};

/**
 * csvをパースし2次元配列を生成する
 * @param {String} csv CSVのテキストデータ
 */
const csv2array = csv => {
  if (!csv) {
    return [];
  }
  const csvRows = csv.trim().split("\n");
  let csvRowsColumns = [];
  for (let i = 0; i < csvRows.length; ++i) {
    csvRowsColumns[i] = csvRows[i].split(",");
  }
  return csvRowsColumns;
};

/**
 * 請求書として致命的なエラーが無いか浅いチェックを行う
 * @param {Array} rawdataArray 原データ配列
 */
const shallowCheck = rawdataArray => {
  // 空の場合
  if (!rawdataArray.length) {
    return [];
  }

  const errors = [];
  if (!["IR", "UK", "YK"].includes(rawdataArray[0][0])) {
    errors.push("ヘッダレコードのレコード識別情報が不正です。");
  }
  const footerRecordShikibetsu = rawdataArray[rawdataArray.length - 1][0];
  if (footerRecordShikibetsu !== "RS") {
    errors.push("フッタレコードのレコード識別情報が不正です。");
  }
  // TODO: ヘッダ・フッタが複数存在する場合
  if (!rawdataArray[1] || rawdataArray[1][0] !== "RE") {
    errors.push("2レコード目がレセプト共通レコードではありません。");
  }
  if (errors.length) {
    return errors;
  }
  return [];
};
