setTimeout(() => {
  typeof source === "string"
    ? process.stdout.write("111")
    : process.stdout.write("22");
});

let source = null;
