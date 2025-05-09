(function () {
  "use strict";

  window.addEventListener("load", init);

  function init() {
    qs("form").addEventListener("submit", onSubmit);
  }

  function onSubmit(event) {
    event.preventDefault();

    const form = new FormData(qs("form"));
    fetchImg(form);
  }

  function fetchImg(form) {
    // Append form data from index.html unto the api request form data
    postData.set("text0", form.get("text0"));
    postData.set("text1", form.get("text1"));

    // Create a POST request to the API
    fetch(url, {
      method: "POST",
      body: postData,
    })
      .then((response) => statusCheck(response))
      .then((res) => res.json())
      .then((data) => {
        createImg(data.data.url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  /**
   *
   * @param {*} url
   */
  function createImg(url) {
    const imgOut = id("imgOut");

    // Check if we already have an img element
    if (imgOut.children[0])
      imgOut.children[0].src = url; // Simply replace the img element's src
    else {
      // Create the img element

      let img = document.createElement("img");

      img.src = url;
      imgOut.append(img);
    }

    imgOut.classList.add("hasImg");
  }

  /////////////////////////////////////////////////////////////////////
  // Helper functions
  /**
  * Helper function to return the response's result text if successful, otherwise
  * returns the rejected Promise result with an error status and corresponding text
  * @param {object} res - response to check for success/error

  * @return {object} - valid response if response was successful, otherwise rejected
  *                    Promise result
  */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Helper function for getting elements by id
   * @param {String} id The id of the element, as is in the html
   * @returns The element, null of not found
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * function shortener for query select
   * @param {string} selector CSS selector style string, i.e "ul li p"
   * @returns The first element it found
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
  /**
   * Function shortener for querySelectAll
   * @param {string} selector CSS selector style string, i.e "ul li p"
   * @returns An array of all the elements that match the query
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();
