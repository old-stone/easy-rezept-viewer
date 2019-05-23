import recDefsChouzai201806 from "../static/recordDefinitions/rousai/chouzai.2018.06.json";
import recDefsIka201806 from "../static/recordDefinitions/rousai/ika.2018.06.json";
import recDefsShika201806 from "../static/recordDefinitions/rousai/shika.2018.06.json";

/**
 * レコード定義郡を取得する
 * @param {String} headerRecordShikibetsuInfo ヘッダのレコード識別情報
 */
export const setRecordDefs = headerRecordShikibetsuInfo => {
  const recordDefs = (rid => {
    if (rid === "IR") {
      return recDefsIka201806;
    } else if (rid === "UK") {
      return recDefsShika201806;
    } else if (rid === "YK") {
      return recDefsChouzai201806;
    } else {
      return null;
    }
  })(headerRecordShikibetsuInfo);

  const byId = {};
  const allIds = [];
  recordDefs.forEach(def => {
    const rid = def.recordShikibetsuInfo;
    byId[rid] = {
      id: rid,
      name: def.name,
      columns: def.columns
    };
    allIds.push(rid);
  });

  return {
    type: "SET_RECORD_DEFS",
    payload: {
      byId: byId,
      allIds: allIds
    }
  };
};

/**
 * store初期化
 */
export const clearMaster = () => {
  return { type: "CLEAR_MASTER" };
};
