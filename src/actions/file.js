import encoding from "encoding-japanese";

/**
 * ファイルをSJISでローカルに保存する
 * @param {String} text テキストデータ
 * @param {String} fileName ファイル名
 * @param {String} extention 拡張子
 */
export const saveFile = (text, fileName, extention) => {
  const element = document.createElement("a");
  const shiftJisCodeList = encoding.convert(
    text.split("").map((c, index) => text.codePointAt(index)),
    "sjis",
    "unicode"
  );
  const uInt8List = new Uint8Array(shiftJisCodeList);
  const file = new Blob([uInt8List], {
    type: "text/plain"
  });
  element.href = URL.createObjectURL(file);
  element.download = fileName + extention;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();

  return { type: "SAVE_FILE" };
};

/**
 * ファイル名を変更する
 * @param {String} fileName ファイル名
 */
export const changeFileName = fileName => {
  return { type: "CHANGE_FILE_NAME", fileName: fileName };
};

/**
 * storeの初期化
 */
export const clearFile = () => {
  return { type: "CLEAR_FILE" };
};
