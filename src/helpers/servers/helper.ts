let start = process.hrtime();

export const elapsed_time = function (note: string) {
  var precision = 3; // 3 decimal places
  var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
  console.log(
    process.hrtime(start)[0] +
      " s, " +
      elapsed.toFixed(precision) +
      " ms - " +
      note
  ); // print message + time
  start = process.hrtime(); // reset the timer
};

export const retryFunction = async <T>(
  promiseFunc: (e?: any) => T,
  counter: number
): Promise<T | undefined> => {
  try {
    return await promiseFunc();
  } catch (error) {
    if (counter <= 0) throw error;
    console.log(error, "error happens");
    return await retryFunction(promiseFunc, counter - 1);
  }
};
