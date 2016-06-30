package com.framework.utils;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

public class PinYinUtil
{
  public static String converterToFirstSpell(String chines)
  {
    String pinyinName = "";
    char[] nameChar = chines.toCharArray();
    HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
    defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
    defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
    for (int i = 0; i < nameChar.length; i++) {
      if (nameChar[i] > '?') {
        try
        {
          String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(nameChar[i], defaultFormat);
          if ((pinyinArray == null) || (pinyinArray.length <= 0)) {
            continue;
          }
          pinyinName = pinyinName + pinyinArray[0].charAt(0);
        }
        catch (BadHanyuPinyinOutputFormatCombination e)
        {
          e.printStackTrace();
        }
      } else {
        pinyinName = pinyinName + nameChar[i];
      }
    }
    if (pinyinName.isEmpty()) {
      pinyinName = pinyinName + "#";
    }
    return pinyinName;
  }
  
  public static String converterToSpell(String chines)
  {
    String pinyinName = "";
    char[] nameChar = chines.toCharArray();
    HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
    defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
    defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
    for (int i = 0; i < nameChar.length; i++) {
      if (nameChar[i] > '?') {
        try
        {
          String[] pinyinArray = PinyinHelper.toHanyuPinyinStringArray(nameChar[i], defaultFormat);
          if ((pinyinArray == null) || (pinyinArray.length <= 0)) {
            continue;
          }
          pinyinName = pinyinName + pinyinArray[0].charAt(0);
        }
        catch (BadHanyuPinyinOutputFormatCombination e)
        {
          e.printStackTrace();
        }
      } else {
        pinyinName = pinyinName + nameChar[i];
      }
    }
    return pinyinName;
  }
}