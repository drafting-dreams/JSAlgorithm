class EventHub {
  constructor() {
    this.events = {};
  }

  addEventListener(eventname, fn) {
    if (this.events[eventname]) {
      this.events[eventname].push(fn);
    } else {
      this.events[eventname] = [fn];
    }
  }

  removeEventListener(eventname, fn) {
    if (this.events[eventname]) {
      const index = this.evnets[eventname].indexOf(fn);
      if (index >= 0) this.events[eventname].splice(index, 1);
    }
  }

  publish(eventname, event) {
    if (this.events[eventname]) {
      this.events[eventname].forEach((fn) => {
        fn(event);
      });
    }
  }
}
