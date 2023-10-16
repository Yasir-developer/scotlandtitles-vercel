import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../config";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const req = () => {
  //   axios.post("/api/shopify-apis/order", orderObj).then((res) => {
  //     console.log(res);
  //   });
  // };
  const [orders, setOrders] = useState([]);
  const [headerData, setHeaderData] = useState("");
  const [nextBtn, setNextBtn] = useState("");
  const [prevBtn, setPrevBtn] = useState("");
  const [btn, setBtn] = useState("");

  const [pageInformation, setPageInformation] = useState("");

  useEffect(() => {
    listOrders();
  }, []);
  useEffect(() => {
    console.log(pageInformation, "pageInformation");
  }, [pageInformation]);

  const listOrders = async (pagination) => {
    console.log(pagination, "pagination");
    console.log(pageInformation, "pageInformation pageInformation");
    const url = `${server}/api/listOrder${
      pagination ? `?page_info=${pagination}` : ""
    }`;

    // const response = await fetch(url);

    // console.log(url, "all url");
    // const data = response.headers;
    // console.log(data, "data");

    axios
      .get(url)
      .then((res) => {
        console.log(res.data.data.headers.link, "total response link");
        console.log(res.data.data, "overall response");

        // setLoader(false);

        if (res.status == 200) {
          setOrders(res.data.data.data);
          setHeaderData(res.data.data.headers);
          const urls = res.data.data.headers.link.split(", ").map((link) => {
            const [urlPart, relPart] = link.split("; ");
            const url = urlPart.slice(1, -1); // Removing '<' and '>'
            const rel = relPart.trim().split("=")[1].slice(1, -1); // Extracting 'next' from rel="next"
            setBtn(rel);
            // setNextBtn(rel);
            const params = new URLSearchParams(new URL(url).search);
            const pageInfo = params.get("page_info");
            // console.log("Page Info for Previous:", urls[0].pageInfo);
            // console.log("Page Info for Next:", urls[1].pageInfo);
            return { rel, pageInfo };
          });
          if (urls[0].rel == "previous" && urls[1].rel == "next") {
            setNextBtn(urls[1]?.pageInfo);
            setPageInformation(urls[0].pageInfo);
            setPrevBtn(urls[0].pageInfo);
          } else if (urls[0].rel == "next") {
            setNextBtn(urls[0].pageInfo);
            setPrevBtn("");
          } else {
            setPageInformation();
            setNextBtn("");
          }
          console.log(urls, "-------------------");

          // if (urls[1]?.pageInfo) {
          //   setNextBtn(urls[1]?.pageInfo);
          //   setPageInformation(urls[0].pageInfo);
          //   setPrevBtn(urls[0].pageInfo);
          // } else {
          //   setNextBtn(urls[0].pageInfo);
          //   // setPrevBtn(urls[0].pageInfo)
          // }

          // console.log("page_info:", pageInfo);
          // console.log("Page Info for Previous:", urls[0].pageInfo);
          // console.log("Page Info for Next:", urls[1].pageInfo);
          // console.log("Rel:", rel);
          // console.log(headerData, "headerData");
          // setCases(res?.data?.cases);
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const nextBtnHandle = () => {
    setPageInformation(pageInformation);
    listOrders(pageInformation);
  };

  const previousBtnHandle = () => {
    setNextBtn(nextBtn);
    listOrders(nextBtn);
  };

  const check = () => {
    return orders.map((item, index) => {
      const hasPrintedPack = item.line_items.some((data) =>
        data.variant_title.includes("Printed Pack")
      );

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px",
            margin: "10px",
            alignItems: "center",
            backgroundColor: "#D3D3D3",
            borderRadius: "2px",
            // height:
          }}
          key={index}
        >
          <p>Order {item.name}</p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <a
              href={`https://scotlandtitlesapp.com/pdfs/${item.order_number}.pdf`}
              download
              target="_blank"
              rel="noreferrer"
            >
              <button>Download Digital Pdf file</button>
            </a>

            {hasPrintedPack && (
              <a
                href={`https://scotlandtitlesapp.com/pdfs/${item.order_number}-printed.pdf`}
                download
                target="_blank"
                rel="noreferrer"
              >
                <button>Download Printed pdf file</button>
              </a>
            )}
          </div>
        </div>
      );
    });
  };
  return (
    <main className={`flex min-h-screen flex-col  justify-between p-24`}>
      {check()}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          // height: "100px",
          width: "100%",
        }}
      >
        {nextBtn ? (
          <p
            onClick={() => previousBtnHandle()}
            style={{
              cursor: "pointer",
            }}
          >
            Previous
          </p>
        ) : (
          ""
        )}
        {prevBtn ? (
          <p
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={() => nextBtnHandle()}
          >
            Next
          </p>
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
