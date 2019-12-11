function action(type: string | number, payload = {}) {
  return { type, payload };
}

export default action;
