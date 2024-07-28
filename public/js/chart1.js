const ctx = document.getElementById("barchart").getContext("2d");
const barchart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Keterangan Suhu Lingkungan",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

async function fetchData() {
  const url = "http://localhost:3000/api/data";

  try {
    const response = await fetch(url);
    const data = await response.json();
    const feeds = data.feeds;

    const labels = feeds.map((feed) => new Date(feed.created_at).toLocaleString());
    const suhuData = feeds.map((feed) => parseFloat(feed.field1));

    barchart.data.labels = labels;
    barchart.data.datasets[0].data = suhuData;
    barchart.update();
  } catch (error) {
    console.error("Error fetching data from server:", error);
  }
}

setInterval(fetchData, 15000);
fetchData();
