import { useState, useEffect, useRef } from "react";
import TextInput from "../Inputs/TextInput";
import InlineWrapper from "../Inputs/InlineWrapper";

let autoComplete;

export const GOOGLE_PLACES_API_KEY =
  process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

export default function AddressAutofill({ onAddressChange }) {
  const [AddQuery, setAddQuery] = useState("");
  const [AddressLine2, setAddressLine2] = useState("");
  const autoCompleteRef = useRef(null);
  const [street, setStreet] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [stateAbbv, setStateAbbv] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("USA");

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
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
    const AddQuery = addressObject.formatted_address;
    updateQuery(AddQuery);

    let street = "";
    let postcode = "";
    let city = "";
    let state = "";
    let state_abbv = "";

    for (const component of addressObject.address_components) {
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
        case "sublocality_level_1":
        case "locality": {
          city = component.long_name;
          break;
        }
        case "administrative_area_level_1": {
          state = component.long_name;
          state_abbv = component.short_name;
          break;
        }
        default:
          break;
      }
    }
    setStreet(street);
    setCityName(city);
    setStateName(state);
    setStateAbbv(state_abbv);
    setPostcode(postcode);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`,
      () => {
        // if (window.google && window.google.maps) {
        handleScriptLoad(setAddQuery, autoCompleteRef);
        // }
      }
    );
  }, []);
  useEffect(() => {
    onAddressChange({
      addr1: AddQuery,
      addr2: AddressLine2,
      city: cityName,
      state: stateName,
      zipcode: postcode,
      country,
    });
  }, [AddQuery, AddressLine2, cityName, stateName, postcode, country]);

  useEffect(() => {
    // console.log("street", street);
    // console.log("cityName", cityName);
    // console.log("stateAbbv", stateAbbv);
    // console.log("stateName", stateName);
    // console.log("postcode", postcode);
    // console.log("country", country);
  }, [street, cityName, stateAbbv, stateName, postcode, country]);
  return (
    <>
      <TextInput
        type="full-single-text-input"
        label="Address 1"
        ref={autoCompleteRef}
        onChange={(e) => setAddQuery(e.target.value)}
        value={AddQuery}
        placeholder="Enter Address Line 1"
      />

      <TextInput
        type="full-single-text-input"
        label="Address 2 (Optional)"
        onChange={(e) => setAddressLine2(e.target.value)}
        value={AddressLine2}
        placeholder="Enter Address Line 2"
      />

      <InlineWrapper>
        <TextInput
          type="full-single-text-input"
          label="City"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          placeholder="New York City"
        />

        <TextInput
          type="full-single-text-input"
          label="State"
          onChange={(e) => setStateName(e.target.value)}
          value={stateName}
          placeholder="New York"
        />
      </InlineWrapper>

      <InlineWrapper>
        <TextInput
          type="full-single-text-input"
          label="ZipCode"
          onChange={(e) => setPostcode(e.target.value)}
          value={postcode}
          placeholder="ZipCode"
        />

        <TextInput
          type="full-single-text-input"
          label="Country"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          placeholder="USA"
        />
      </InlineWrapper>
    </>
  );
}
