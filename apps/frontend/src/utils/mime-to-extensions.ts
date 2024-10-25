export function mimeToExtensions(mimes: string[]) {
  return mimes.reduce((acc, mime) => {
    const extension = "." + mime.split("/")[1];
    return {
      ...acc,
      [mime]: [extension],
    };
  }, {});
}
