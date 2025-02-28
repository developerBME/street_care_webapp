import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

export const GOOGLE_PLACES_API_KEY = "AIzaSyBnF0aSySY400NMs2LV32sNzR29BEbPV3s";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const Sample_form = () => {
  // const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [street, setStreet] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [postcode, setPostcode] = useState("");

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    // debugger;
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        types: ["address"],
        componentRestrictions: { country: ["us"] },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();

    // debugger;

    const query = addressObject.formatted_address;
    updateQuery(query);
    // console.log({ query });
    console.log("yoyo", addressObject, query);

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };

    let street = "";
    let postcode = "";
    let city = "";
    let state = "";

    // const street = query && query.split(",")[0];
    // const cityName = query && query.split(",")[1];
    // const stateName = query && query.split(",")[2];
    // const postcode = query && query.split(",")[2];

    // console.log(autoComplete.getPlace());
    for (const component of addressObject.address_components) {
      console.log(component);
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number": {
          street = `${component.long_name} ${street}`;
          break;
        }
        case "route": {
          street += component.long_name;
          break;
        }

        case "postal_code": {
          postcode = `${component.long_name}${postcode}`;
          break;
        }
        case "postal_code_suffix": {
          postcode = `${postcode}-${component.long_name}`;
          break;
        }
        case "locality": {
          city = component.long_name;
          break;
        }
        case "administrative_area_level_1": {
          state = component.long_name;
          break;
        }
        default:
          break;

        // case "locality": {
        //   document.querySelector("#locality").value = component.long_name;
        //   break;
        // }
        // case "administrative_area_level_1": {
        //   document.querySelector("#state").value = component.short_name;
        //   break;
        // }
        // case "country": {
        //   document.querySelector("#country").value = component.long_name;
        //   break;
        // }
      }
    }

    setStreet(street);
    console.log(street);
    console.log(addressObject.address_components);
    setCityName(city);
    setStateName(state);
    setPostcode(postcode);

    // console.log({ latLng });
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  // console.log(cityName);

  return (
    <div className="relative flex flex-col items-center ">
      <div className="lg:w-[887px] md:w-[90%] mx-2 lg:mx-40 mt-32 mb-32 md:mb-[55px] rounded-3xl bg-white text-black ">
        <div className="items-center justify-center px-12 py-8 lg:px-32 lg:py-24 h-full w-full rounded-3xl bg-[#F8F9F0] grid grid-cols-1">
          <div className="w-full h-fit flex-col justify-start items-start gap-16 inline-flex">
            <div className="w-fit text-[#212121] text-[45px] font-medium font-inter leading-[52px]">
              Sample Form
            </div>
            <div className="w-full">
              <div className="flex flex-col">
                <label>Enter Address</label>
                <input
                  type="text"
                  ref={autoCompleteRef}
                  className="my-5 w-full h-10 pl-3"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search for a place"
                  value={query}
                ></input>
              </div>
            </div>

            <div className="w-full">
              <form
                id="address-form"
                action=""
                method="get"
                autocomplete="off"
                className="flex flex-col gap-4"
              >
                <label className="">
                  <span className="w-full">Street*</span>
                  <input
                    id="street-address"
                    name="street-address"
                    required
                    autoComplete="off"
                    className="my-5 w-full h-10 pl-3"
                    value={street}
                  />
                </label>
                <label className="">
                  <span className="w-full">City*</span>
                  <input
                    id="locality"
                    name="locality"
                    required
                    className="my-5 w-full h-10 pl-3"
                    value={cityName}
                  />
                </label>
                <label className="">
                  <span className="w-full">State*</span>
                  <input
                    id="state"
                    name="state"
                    required
                    className="my-5 w-full h-10 pl-3"
                    value={stateName}
                  />
                </label>
                <label className="">
                  <span className="w-full">Zipcode*</span>
                  <input
                    id="postcode"
                    name="postcode"
                    required
                    className="my-5 w-full h-10 pl-3"
                    value={postcode}
                  />
                </label>
                <button
                  type="button"
                  className="bg-gray-300 text-black border-r-2 m-10 cursor-pointer"
                >
                  Save Address
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sample_form;
