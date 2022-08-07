import * as d3 from "d3";
import { Button, Container } from "@mui/material";
import { useState, useCallback, Dispatch, SetStateAction } from "react";

const DATA_LENGTH = 50;

export const Contents = (): JSX.Element => {
  const [data, setData] = useState<number[]>(
    [...Array(DATA_LENGTH)].map((_, i) => i + 1)
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [shuffled, setShuffled] = useState<boolean>(false);
  const [cnt, setCnt] = useState<number>(0);

  const height: number = 200;
  const width: number = 200;
  const colorScale = useCallback(
    d3.scaleSequential(d3.interpolateRainbow).domain([0, DATA_LENGTH]),
    []
  );
  const yScale = useCallback(
    d3.scaleLinear().domain([0, DATA_LENGTH]).range([0, height]),
    []
  );

  const sort = (func: Promise<void>) => {
    setLoading(true);
    func.then(() => {
      setShuffled(false);
      setLoading(false);
    });
  };

  const handleShuffled = () => {
    setLoading(true);
    const shuffle = async (
      [...array]: number[],
      iterCnt: number
    ): Promise<void> => {
      for (let cnt = 0; cnt < iterCnt; ++cnt) {
        for (let i = array.length - 1; i >= 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
          await new Promise((resolve) => setTimeout(resolve, DATA_LENGTH / 20));
          setData(array.slice());
        }
      }
    };
    shuffle(data, 2).then(() => {
      setShuffled(true);
      setLoading(false);
    });
  };

  return (
    <Container sx={{ py: 3 }}>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <text y="10" fontSize="10">
          {`交換回数：${cnt} 回`}
        </text>
        <g transform={`translate(${width},${height}) rotate(180)`}>
          {data.map((num, idx) => {
            return (
              <rect
                key={idx}
                x={(width * (DATA_LENGTH - idx)) / DATA_LENGTH}
                y={0}
                width={width / DATA_LENGTH}
                height={yScale(num) * 0.9}
                fontSize="5px"
                fill={colorScale(num)}
              >
                {num}
              </rect>
            );
          })}
        </g>
      </svg>
      <Button
        variant="contained"
        onClick={handleShuffled}
        disabled={loading || shuffled}
      >
        init
      </Button>

      <Button
        variant="contained"
        onClick={() => sort(bubbleSort(data, setCnt, setData))}
        disabled={loading || !shuffled}
      >
        bubble
      </Button>
      <Button
        variant="contained"
        onClick={() => sort(insertionSort(data, setCnt, setData))}
        disabled={loading || !shuffled}
      >
        insertion
      </Button>
    </Container>
  );
};

const bubbleSort = async (
  [...array]: number[],
  setCnt: Dispatch<SetStateAction<number>>,
  setData: Dispatch<SetStateAction<number[]>>
) => {
  for (let i = 0; i < DATA_LENGTH - 1; ++i) {
    for (let j = 1; j < DATA_LENGTH - i; ++j) {
      if (array[j] < array[j - 1]) {
        [array[j - 1], array[j]] = [array[j], array[j - 1]];
        setCnt((prev) => prev + 1);
      }
      await new Promise((resolve) => setTimeout(resolve, 1 / 2 ** 10));
      setData(array.slice());
    }
  }
};

const insertionSort = async (
  [...array]: number[],
  setCnt: Dispatch<SetStateAction<number>>,
  setData: Dispatch<SetStateAction<number[]>>
) => {
  for (let i = 1; i < DATA_LENGTH; ++i) {
    let j = i;
    while (j !== 0 && array[j - 1] > array[j]) {
      [array[j - 1], array[j]] = [array[j], array[j - 1]];
      --j;
      setCnt((prev) => prev + 1);
      setData(array.slice());
      await new Promise((resolve) => setTimeout(resolve, 1 / 2 ** 10));
    }
  }
};
