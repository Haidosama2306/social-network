export class StringUtils {
  static displayUserName = (str) => {
    return str.replace("#", "");
  };

  static formatNumber = (val) => {
    return new Intl.NumberFormat().format(val);
  };
}
