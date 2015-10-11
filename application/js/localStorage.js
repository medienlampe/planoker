/**
 * Handles LocalStorage feature detection
 * and save/load of data
 *
 * @author Eric Zieger
 */

var plokerLocalStorage = (function ($) {
  'use strict';

  var oPlokerLocalStorage = {},
    oInternalStorage = {},
    sStorageName = 'plokerLocalStorage';


  /**
   * detects if the browser supports localStorage
   * and return plokerLocalStorage object with the set/get functions
   * or returns false so we can use if (window.plokerLocalStorage)
   *
   * @private
   * @returns mixed
   */
  function init() {

    // check if localStorage is available else return false
    try {
      window.localStorage.setItem(sStorageName, sStorageName);
      window.localStorage.removeItem(sStorageName);
    } catch (e) {
      return false;
    }

    // localstorage is available so we load the last save
    var sStorageValue = window.localStorage.getItem(sStorageName);

    // on first application start sStorage is null so we should check it
    if (sStorageValue) {
      oInternalStorage = JSON.parse(sStorageValue);
    }

    return oPlokerLocalStorage;
  }


  /**
   * saves your given item in the internal storage object with the defined sKey as key
   * and writes everything to the localStorage.
   *
   * @public
   * @param   string  sKey
   * @param   mixed   item
   * @returns boolean
   */
  oPlokerLocalStorage.setItem = function (sKey, item) {
    // set/overwrite internal variable
    oInternalStorage[sKey] = item;

    // save to localstorage
    window.localStorage.setItem(sStorageName, JSON.stringify(oInternalStorage));

    return true;
  };


  /**
   * return data from the internal localStorage object or false if
   * the given sKey is not defined inside the internal object
   *
   * @public
   * @param   string sKey
   * @returns mixed
   */
  oPlokerLocalStorage.getItem = function (sKey) {

    // when sKey is available return the value
    if (oInternalStorage[sKey]) {
      return oInternalStorage[sKey];
    }

    return false;
  };


  // returns false or instance of oPlokerLocalStorage
  return init();

}(jQuery));
