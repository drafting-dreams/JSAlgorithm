function dashToCamel(dashStr) {
  return dashStr.replace(/-[a-z]/g, replacer);
}

function replacer(match) {
  return '-' + match[1].toUpperCase();
}

console.log(dashToCamel('abc-def-ggg'))
