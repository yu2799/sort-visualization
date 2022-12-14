import * as d3 from "d3";
import {
  Button,
  Container,
  Grid,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import {
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export const Contents = (): JSX.Element => {
  const [dataLength, setDataLength] = useState<number>(100);
  const [data, setData] = useState<number[]>([0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [shuffled, setShuffled] = useState<boolean>(false);
  const [compareCnt, setCompareCnt] = useState<number>(0);
  const [cnt, setCnt] = useState<number>(0);

  const height: number = 150;
  const width: number = 200;
  const colorScale = useCallback(
    d3.scaleSequential(d3.interpolateRainbow).domain([0, dataLength]),
    [dataLength]
  );
  const yScale = useCallback(
    d3.scaleLinear().domain([0, dataLength]).range([0, height]),
    [dataLength]
  );

  const marks = [
    {
      value: 10,
      label: 10,
    },
    {
      value: 100,
      label: 100,
    },
    {
      value: 200,
      label: 200,
    },
  ];

  const sort = (func: Promise<void>) => {
    setLoading(true);
    func.then(() => {
      setShuffled(false);
      setLoading(false);
    });
  };

  const handleShuffled = () => {
    setLoading(true);
    setCompareCnt(0);
    setCnt(0);
    const shuffle = async (
      [...array]: number[],
      iterCnt: number
    ): Promise<void> => {
      for (let cnt = 0; cnt < iterCnt; ++cnt) {
        for (let i = array.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
          await new Promise((resolve) => setTimeout(resolve, dataLength / 20));
          setData(array.slice());
        }
      }
    };
    shuffle(data, 2).then(() => {
      setShuffled(true);
      setLoading(false);
    });
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setDataLength(newValue as number);
  };

  useEffect(() => {
    setData([...Array(dataLength)].map((_, i) => i + 1));
  }, [dataLength]);
  return (
    <>
      {data.length === 1 ? (
        <div>loading...</div>
      ) : (
        <Container sx={{ py: 3 }}>
          <svg viewBox={`0 0 ${width} ${height}`}>
            <g fontSize="5" style={{ userSelect: "none" }}>
              <text y="5">{`???????????????${compareCnt} ???`}</text>
              <text y="15">{`???????????????${cnt} ???`}</text>
            </g>
            <g transform={`translate(${width},${height}) rotate(180)`}>
              {data.map((num, idx) => {
                return (
                  <rect
                    key={idx}
                    x={(width * (dataLength - idx - 1)) / dataLength}
                    y={0}
                    width={width / dataLength}
                    height={yScale(num) * 0.9}
                    fill={colorScale(num)}
                  />
                );
              })}
            </g>
          </svg>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <Button
                variant="contained"
                onClick={handleShuffled}
                disabled={loading || shuffled}
              >
                init
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Typography>array length</Typography>
            </Grid>
            <Grid item xs={6}>
              <Slider
                defaultValue={100}
                min={10}
                max={200}
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
                onChange={handleChange}
                disabled={loading || shuffled}
              />
            </Grid>
          </Grid>

          <Stack spacing={2} direction="row" sx={{ p: 1 }}>
            <Typography variant="h3" component="div">
              <Typography component="em">
                <Typography variant="h3" component="b">
                  O
                </Typography>
              </Typography>
              (n
              <Typography variant="h5" component="sup">
                2
              </Typography>
              )
            </Typography>

            <Button
              variant="contained"
              onClick={() =>
                sort(bubbleSort(data, setCompareCnt, setCnt, setData))
              }
              disabled={loading || !shuffled}
            >
              bubble
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                sort(insertionSort(data, setCompareCnt, setCnt, setData))
              }
              disabled={loading || !shuffled}
            >
              insertion
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                sort(selectionSort(data, setCompareCnt, setCnt, setData))
              }
              disabled={loading || !shuffled}
            >
              selection
            </Button>
            <Stack spacing={2} direction="row" sx={{ p: 1 }}>
              <Typography variant="h3" component="div">
                <Typography component="em">
                  <Typography variant="h3" component="b">
                    O
                  </Typography>
                </Typography>
                (nlogn)
              </Typography>
              <Button
                variant="contained"
                onClick={() =>
                  sort(
                    mergeSort(
                      data,
                      setCompareCnt,
                      setCnt,
                      setData,
                      0,
                      dataLength
                    )
                  )
                }
                disabled={loading || !shuffled}
              >
                merge
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  sort(
                    quickSort(
                      data,
                      setCompareCnt,
                      setCnt,
                      setData,
                      0,
                      dataLength
                    )
                  )
                }
                disabled={loading || !shuffled}
              >
                quick
              </Button>
            </Stack>
          </Stack>
        </Container>
      )}
    </>
  );
};

const bubbleSort = async (
  array: number[],
  setCompareCnt: Dispatch<SetStateAction<number>>,
  setCnt: Dispatch<SetStateAction<number>>,
  setData: Dispatch<SetStateAction<number[]>>
) => {
  for (let i = 0; i < array.length - 1; ++i) {
    for (let j = 1; j < array.length - i; ++j) {
      if (array[j] < array[j - 1]) {
        [array[j - 1], array[j]] = [array[j], array[j - 1]];
        setCnt((prev) => prev + 1);
      }
      setCompareCnt((prev) => prev + 1);
      setData(array.slice());
      await new Promise((resolve) => setTimeout(resolve, 1 / 2 ** 10));
    }
  }
};

const insertionSort = async (
  array: number[],
  setCompareCnt: Dispatch<SetStateAction<number>>,
  setCnt: Dispatch<SetStateAction<number>>,
  setData: Dispatch<SetStateAction<number[]>>
) => {
  for (let i = 1; i < array.length; ++i) {
    let j = i;
    while (j !== 0 && array[j - 1] > array[j]) {
      [array[j - 1], array[j]] = [array[j], array[j - 1]];
      --j;
      setCnt((prev) => prev + 1);
      setCompareCnt((prev) => prev + 1);
      setData(array.slice());
      await new Promise((resolve) => setTimeout(resolve, 1 / 2 ** 10));
    }
  }
};

const selectionSort = async (
  array: number[],
  setCompareCnt: Dispatch<SetStateAction<number>>,
  setCnt: Dispatch<SetStateAction<number>>,
  setData: Dispatch<SetStateAction<number[]>>
) => {
  for (let i = 0; i < array.length - 1; ++i) {
    let idx = i;
    let tmpMin = array[i];
    for (let j = i + 1; j < array.length; ++j) {
      setCompareCnt((prev) => prev + 1);
      if (array[j] < tmpMin) {
        tmpMin = array[j];
        idx = j;
      }
    }
    [array[idx], array[i]] = [array[i], array[idx]];
    setCnt((prev) => prev + 1);
    setData(array.slice());
    await new Promise((resolve) => setTimeout(resolve, 1 / 2 ** 10));
  }
};

const mergeSort = async (
  array: number[],
  setCompareCnt: Dispatch<SetStateAction<number>>,
  setCnt: Dispatch<SetStateAction<number>>,
  setData: Dispatch<SetStateAction<number[]>>,
  left: number,
  right: number
) => {
  if (right - left === 1) return;
  const mid = Math.floor(left + (right - left) / 2);
  await mergeSort(array, setCompareCnt, setCnt, setData, left, mid);
  await mergeSort(array, setCompareCnt, setCnt, setData, mid, right);

  const tmp = [];
  for (let i = left; i < mid; ++i) tmp.push(array[i]);
  for (let i = right - 1; i >= mid; --i) tmp.push(array[i]);

  let leftIdx = 0;
  let rightIdx = tmp.length - 1;
  for (let i = left; i < right; ++i) {
    if (tmp[leftIdx] < tmp[rightIdx]) {
      array[i] = tmp[leftIdx++];
    } else {
      array[i] = tmp[rightIdx--];
    }
    setCompareCnt((prev) => prev + 1);
    setData(array.slice());
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
};

const quickSort = async (
  array: number[],
  setCompareCnt: Dispatch<SetStateAction<number>>,
  setCnt: Dispatch<SetStateAction<number>>,
  setData: Dispatch<SetStateAction<number[]>>,
  left: number,
  right: number
) => {
  if (right - left <= 1) return;
  const pivotIdx = Math.floor((left + right) / 2);
  const pivot = array[pivotIdx];
  [array[pivotIdx], array[right - 1]] = [array[right - 1], array[pivotIdx]];
  setData(array.slice());
  setCnt((prev) => prev + 1);
  setCompareCnt((prev) => prev + 1);
  await new Promise((resolve) => setTimeout(resolve, 10));

  let i = left;
  for (let j = i; j < right - 1; ++j) {
    if (array[j] < pivot) {
      [array[i++], array[j]] = [array[j], array[i]];
      setData(array.slice());
      setCnt((prev) => prev + 1);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    setCompareCnt((prev) => prev + 1);
  }
  [array[i], array[right - 1]] = [array[right - 1], array[i]];
  setData(array.slice());
  setCnt((prev) => prev + 1);
  setCompareCnt((prev) => prev + 1);
  await new Promise((resolve) => setTimeout(resolve, 10));

  await quickSort(array, setCompareCnt, setCnt, setData, left, i);
  await quickSort(array, setCompareCnt, setCnt, setData, i + 1, right);
};
