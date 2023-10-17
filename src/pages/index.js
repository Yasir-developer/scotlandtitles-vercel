import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../config";
import { Audio, Puff, RotatingLines } from "react-loader-spinner";

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
  const [linkData, setLinkData] = useState("");
  const [count, setCount] = useState("");

  const [loader, setLoader] = useState(true);
  // const [searchLoader, setSearchLoader] = useState(false);

  const [search, setSearch] = useState(false);
  const [searchType, setSearchType] = useState(false);

  const [pageInformation, setPageInformation] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    listOrders();
    console.log(linkData);
  }, []);
  useEffect(() => {
    console.log(pageInformation, "pageInformation");
  }, [pageInformation, nextBtn, prevBtn]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (pagination) => {
    // setSearchLoader(true);
    // if (query) {
    setSearch(true);
    // Update the URL with search query
    //   const url = `${server}/api/listOrder?name=${query}`;
    //   listOrders(url);
    //   console.log("Searching for:", query);
    // } else {
    //   setSearch(false);
    //   // Use the original URL without search query
    //   const url = `${server}/api/listOrder${
    //     pagination ? `?page_info=${pagination}` : ""
    //   }`;
    listOrders();
    // setSearchLoader(false);
  };

  const listOrders = async (pagination, url) => {
    console.log(search, "search");
    console.log(query, "que");
    setLoader(true);
    console.log(pagination, "pagination");
    console.log(pageInformation, "pageInformation pageInformation");
    if (!search && query == "") {
      var url = `${server}/api/listOrder${
        pagination ? `?page_info=${pagination}` : ""
      }`;
    } else {
      url = `${server}/api/listOrder?name=${query}`;
    }
    console.log(url, "all url");

    await axios
      .get(url)
      .then((res) => {
        console.log(res.data.data.headers.link, "total response link");
        console.log(res.data.data, "overall response");

        // setLoader(false);

        if (res.status == 200) {
          if (res.data.data.data.length == 0) {
            setCount("No Result Found");
          }
          setOrders(res.data.data.data);
          setHeaderData(res.data.data.headers);
          setLinkData(res.data.data.headers.link);
          if (res.data.data.headers.link) {
            const urls = res.data.data.headers.link.split(", ").map((link) => {
              const [urlPart, relPart] = link.split("; ");
              const url = urlPart.slice(1, -1); // Removing '<' and '>'
              const rel = relPart.trim().split("=")[1].slice(1, -1); // Extracting 'next' from rel="next"
              setBtn(rel);
              // setNextBtn(rel);
              const params = new URLSearchParams(new URL(url).search);
              const pageInfo = params.get("page_info");

              return { rel, pageInfo };
            });
            if (urls[0]?.rel == "previous" && urls[1]?.rel == "next") {
              setNextBtn(urls[1]?.pageInfo);
              setPageInformation(urls[0].pageInfo);
              setPrevBtn(urls[0].pageInfo);
            } else if (urls[0].rel == "next") {
              setNextBtn(urls[0].pageInfo);
              setPrevBtn("");
            } else {
              setPrevBtn(urls[0].pageInfo);

              setPageInformation(urls[0].pageInfo);
              setNextBtn("");
            }
            setQuery("");
            console.log(urls, "-------------------");
          }
          setLoader(false);
          setSearch(false);

          // if (urls[1]?.pageInfo) {
          //   setNextBtn(urls[1]?.pageInfo);
          //   setPageInformation(urls[0].pageInfo);
          //   setPrevBtn(urls[0].pageInfo);
          // } else {
          //   setNextBtn(urls[0].pageInfo);
          //   // setPrevBtn(urls[0].pageInfo)
          // }
        }
      })
      .catch((error) => {
        console.log(error.message, "error");
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
    if (orders.length > 0) {
      return orders.map((item, index) => {
        // console.log(item, "itemmmmmmmmmmmmmm");
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
    } else {
      return <div>No results found</div>;
    }
  };
  return (
    <main className={`flex min-h-screen flex-col justify-between p-24`}>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search Order No"
          className="search-input"
        />

        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {!loader ? (
        check() // Assuming check() returns valid JSX
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Puff
            height="80"
            width="80"
            radius={1}
            color="#D3D3D3"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        {nextBtn && linkData ? (
          <p
            onClick={() => previousBtnHandle()}
            style={{
              cursor: "pointer",
            }}
          >
            Next
          </p>
        ) : (
          ""
        )}
        {prevBtn && linkData ? (
          <p
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={() => nextBtnHandle()}
          >
            Previous
          </p>
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
