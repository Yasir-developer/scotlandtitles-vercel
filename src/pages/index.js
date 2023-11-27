import { Inter } from "next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../config";
import { Puff } from "react-loader-spinner";
import Select from "react-select";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [headerData, setHeaderData] = useState("");
  const [nextBtn, setNextBtn] = useState("");
  const [prevBtn, setPrevBtn] = useState("");
  const [btn, setBtn] = useState("");
  const [linkData, setLinkData] = useState("");
  const [count, setCount] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [loader, setLoader] = useState(true);

  const [search, setSearch] = useState(false);
  const [searchType, setSearchType] = useState(false);

  const [pageInformation, setPageInformation] = useState("");
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState([]);
  const [dispatchStatus, setDispatchStatus] = useState([]);

  const [checkedOrders, setCheckedOrders] = useState([]);
  const [checkedDispatchOrders, setCheckedDispatchOrders] = useState([]);

  // const db = connectToDatabase();

  // console.log(db, "db");

  useEffect(() => {
    listOrders();
    downloadStatus();
    dispatchedStatus();
    // console.log(status, "al status");
  }, []);
  useEffect(() => {
    console.log(pageInformation, "pageInformation");
  }, [pageInformation, nextBtn, prevBtn, selectedOption]);

  const options = [
    { value: "printed", label: "Printed" },
    { value: "dispatched", label: "Dispatched" },
  ];
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (pagination) => {
    setSearch(true);

    listOrders();
    // setSearchLoader(false);
  };

  const downloadStatus = () => {
    setLoader(true);
    // if (!checked) {
    // If checkbox is checked, make a POST request
    axios
      .get(`${server}/api/getDownloadStatus`)
      .then((response) => {
        console.log(response.data, "response status ===========");

        setStatus(response.data.data);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error.message, "get Download status");
      });
    // }
  };

  const dispatchedStatus = () => {
    setLoader(true);
    // if (!checked) {
    // If checkbox is checked, make a POST request
    axios
      .get(`${server}/api/getDispatchedStatus`)
      .then((response) => {
        console.log(response.data, "Dispatch response status ===========");

        setDispatchStatus(response.data.data);

        setLoader(false);
      })
      .catch((error) => {
        console.log(error.message, "get Download status");
      });
    // }
  };
  const handleCheckboxChange = async (id, selectedOptions) => {
    selectedOptions.forEach((option) => {
      console.log(option, "option for each");
      if (option.value === "printed") {
        console.log("In Printed");
        setCheckedOrders([...checkedOrders, id]);

        // setSelectedOption(options[0]);

        // Call the API for 'printed'
        axios
          .post(`${server}/api/downloadFile`, { orderId: id, download: true })
          .then((response) => {
            // console.log(response, "printed Response");
            // handle the response
          })
          .catch((error) => {
            // handle the error
          });
      } else if (option.value === "dispatched") {
        console.log("In Dispatched order");

        setCheckedDispatchOrders([...checkedDispatchOrders, id]);

        // setSelectedOption(options[1]);

        axios
          .post(`${server}/api/dispatchedFile`, {
            orderId: id,
            dispatched: true,
          })
          .then((response) => {
            console.log(response, "dispatched Response");
            // setSelectedOption(options[1]);

            // handle the response
          })
          .catch((error) => {
            // handle the error
          });
      }
    });
  };

  const onRefresh = async () => {
    setLoader(true);
    // console.log(pagination, "pagination");
    console.log(pageInformation, "pageInformation pageInformation");

    var url = `${server}/api/listOrder`;

    console.log(url, "all url");

    await axios
      .get(url)
      .then((res) => {
        if (res.status == 200) {
          if (res.data.data.data.length == 0) {
            setCount("No Result Found");
          }
          setOrders(res.data.data.data);
          setHeaderData(res?.data?.data?.headers);
          setLinkData(res.data?.data?.headers?.link);
          if (res?.data?.data?.headers?.link) {
            const urls = res?.data?.data?.headers?.link
              .split(", ")
              .map((link) => {
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
        }
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
  };

  const listOrders = async (pagination, url) => {
    setLoader(true);
    // console.log(pageInformation, "pageInformation pageInformation");
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
        if (res.status == 200) {
          console.log(res, "res");
          if (res?.data?.data?.data?.length == 0) {
            setCount("No Result Found");
          }
          setOrders(res?.data?.data?.data);
          setHeaderData(res?.data?.data?.headers);
          setLinkData(res?.data?.data?.headers?.link);
          if (res?.data?.data?.headers?.link) {
            const urls = res?.data?.data?.headers?.link
              .split(", ")
              .map((link) => {
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
  const customStyles = {
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.value === "printed" ? "#228B22" : "#E9D502",
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: state.data.value === "printed" ? "white" : "black",
    }),
  };
  const check = () => {
    if (orders?.length > 0) {
      return orders.map((item, index) => {
        // console.log(first)
        const isOrderDownloaded = status.some(
          (sta) => sta.orderId === item.order_number
        );

        const isOrderDispacthed = dispatchStatus.some(
          (sta) => sta.orderId === item.order_number
        );

        const hasPrintedPack = item.line_items.some(
          (data) =>
            data.variant_title && data.variant_title.includes("Printed Pack")
        );

        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "8px",

              alignItems: "center",
              borderBottomWidth: "1px",
              borderRadius: "2px",
            }}
            key={index}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p style={{ marginLeft: "10px", marginRight: "50px" }}>
                Order {item.name}
              </p>

              <Select
                className="multi-select"
                value={
                  (isOrderDownloaded ||
                    checkedOrders.includes(item.order_number)) &&
                  (isOrderDispacthed ||
                    checkedDispatchOrders.includes(item.order_number))
                    ? options
                    : (isOrderDownloaded ||
                        checkedOrders.includes(item.order_number)) &&
                      !(
                        isOrderDispacthed ||
                        checkedDispatchOrders.includes(item.order_number)
                      )
                    ? options[0]
                    : !(
                        isOrderDownloaded ||
                        checkedOrders.includes(item.order_number)
                      ) &&
                      (isOrderDispacthed ||
                        checkedDispatchOrders.includes(item.order_number))
                    ? options[1]
                    : []
                }
                onChange={(selectedOptions) => {
                  console.log(selectedOptions, "selectedOptions====");
                  handleCheckboxChange(item.order_number, selectedOptions);
                }}
                isClearable={false}
                styles={customStyles}
                // style={{ backgroundColor: "orange" }}
                options={options}
                components={{ MultiValueRemove: NoCrossMultiValueRemove }}
                isMulti
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <a
                href={`https://scotlandtitlesapp.com/pdfs/${item.order_number}.pdf`}
                download
                target="_blank"
                rel="noreferrer"
              >
                <button className="pdf-buttons">Digital PDF</button>
              </a>

              {hasPrintedPack && (
                <a
                  href={`https://scotlandtitlesapp.com/pdfs/${item.order_number}-printed.pdf`}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="pdf-printed-buttons">Printed PDF</button>
                </a>
              )}
            </div>
          </div>
        );
      });
    } else {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No Result Found
        </div>
      );
    }
  };
  const NoCrossMultiValueRemove = (props) => {
    return <div />;
  };

  return (
    <main className={`flex min-h-screen flex-col p-24`}>
      {!loader ? (
        <div className="search-container">
          <div style={{}}>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search Order No"
              className="search-input"
            />

            <button
              onClick={query == "" ? onRefresh : handleSearch}
              className="search-button"
              // disabled={!query}
            >
              Search
            </button>
          </div>
          <div>
            <button
              onClick={onRefresh}
              className="refresh-button"
              // disabled={!query}
            >
              Refresh
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

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
      {!loader ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            marginTop: "10px",
          }}
        >
          {prevBtn && linkData ? (
            <button
              // style={{ marginLeft: "10px", cursor: "pointer" }}
              className="next-btn"
              onClick={() => nextBtnHandle()}
            >
              Previous
            </button>
          ) : (
            ""
          )}
          {nextBtn && linkData ? (
            <button onClick={() => previousBtnHandle()} className="next-btn">
              Next
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
