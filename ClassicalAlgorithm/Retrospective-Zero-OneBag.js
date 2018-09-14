function wrapper (bagSize, values, weights) {
  let current_weight = 0;
  let current_value = 0;
  let best_value = 0;
  let path = [];
  function constraint (current_layer) {
    let sum_value = current_value;
    for(let i=current_layer; i<values.length; i++) {
      sum_value += values[i];
    }
    return sum_value > best_value;
  }
  return function retroZeroOne (layer) {
    if(layer>=values.length || !constraint(layer)) {
      if(current_value > best_value) {
        best_value = current_value;
        //console.log(best_value);
      }
      return;
    }
    path[layer] = 0;
    retroZeroOne(layer+1);
    if(current_weight + weights[layer] <= bagSize) {
      path[layer] = 1;
      current_value += values[layer];
      current_weight += weights[layer];
      retroZeroOne(layer+1);
      current_weight -= weights[layer];
      current_value -= values[layer];
    }
    return best_value;

  }
}

const bagSize = 18;
const v = [2,4,6,8];
const w = [3, 8, 9,2];

console.log(wrapper(bagSize, v, w)(0));
