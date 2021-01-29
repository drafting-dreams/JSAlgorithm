function dashToCamel(dashStr) {
  return (
    dashStr[0].toUpperCase() +
    dashStr.replace(/-([a-z])/g, replacer).substring(1)
  );
}

function replacer(match, p) {
  return p.toUpperCase();
}

console.log(dashToCamel("abc-def-ggg"));
