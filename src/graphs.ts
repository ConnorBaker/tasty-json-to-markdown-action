import * as echarts from "echarts";
import { sums } from "./grouped.ts";
import { formatTime } from "./mod.ts";

// In SSR mode the first container parameter is not required
const myChart = echarts.init(null, "light", {
  renderer: "svg", // must use SVG rendering mode
  ssr: true, // enable SSR
  width: 1600, // need to specify height and width
  height: 900,
});

const myData = [...sums].sort((a, b) => b.value - a.value);
const top = myData.slice(0, 3);
const bottom = {
  name: "Other",
  value: myData.slice(3).reduce((acc, { value }) => acc + value, 0),
};

const option = {
  animation: false,
  title: {
    text: "Stuff",
    left: "center",
    textStyle: {
      color: "#999",
      fontWeight: "normal",
      fontSize: 14,
    },
  },
  series: {
    name: "Access From",
    type: "pie",
    radius: ["40%", "70%"],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: "#fff",
      borderWidth: 2,
    },
    label: {
      show: true,
      position: "outer",
      alignTo: "edge",
      edgeDistance: 0,
      fontSize: 16,
      formatter: ((params: any) => {
        return `${params.name} (${params.percent}%)\n\n${
          formatTime(params.value)
        } seconds`;
      }),
    },
    labelLine: {
      show: true,
      length: 30,
      length2: "50%",
      lineStyle: {
        width: 3,
      },
    },

    data: [bottom, ...top],
  },
};

option && myChart.setOption(option);

// Output a string
const svgStr = myChart.renderToSVGString();

myChart.dispose();

Deno.writeFileSync("./test.svg", new TextEncoder().encode(svgStr));
