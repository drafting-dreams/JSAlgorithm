var singleton = (function () {
  let holder;
  return {
    getInstance() {
      if (!holder) {
        holder = {
          property: "abc",
          method: function () {
            return "method";
          },
        };
      }
      return holder;
    },
  };
})();

singleton.getInstance();
