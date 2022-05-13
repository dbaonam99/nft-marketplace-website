import React, { useRef } from "react";

const ContactForm = ({
  updateFormInput,
  formInput,
  createMarket,
  onFileChange,
  fileUrl,
}) => {
  const inputFile = useRef();

  const openFileUpload = () => {
    inputFile.current.click();
  };

  return (
    <>
      <div className="contact_form">
        <div className="row">
          <div className="col-12">
            <div id="success_fail_info"></div>
          </div>

          <div className="col-12 col-md-12">
            <p className="w-text">Upload Item File</p>
            <div className="group-file">
              <p className="g-text">PNG, GIF, WEBP, MP4 or MP3. Max 100mb</p>
              <div className="new_Btn more-btn" onClick={openFileUpload}>
                Upload File
              </div>
              <br />
              {fileUrl && <img className="rounded mt-4" src={fileUrl} alt="" />}
              <input
                ref={inputFile}
                type="file"
                name="upload"
                id="upload-btn"
                onChange={onFileChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="group">
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={(e) =>
                  updateFormInput({ ...formInput, name: e.target.value })
                }
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Item name</label>
            </div>
          </div>
          <div className="col-12">
            <div className="group">
              <textarea
                name="Description"
                id="Description"
                required
                onChange={(e) =>
                  updateFormInput({
                    ...formInput,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Item Description</label>
            </div>
          </div>

          <div className="col-12 col-md-12">
            <div className="group">
              <input
                type="text"
                name="price"
                id="price"
                required
                onChange={(e) =>
                  updateFormInput({ ...formInput, price: e.target.value })
                }
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Item Price in ETH</label>
            </div>
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className="more-btn mb-15"
              onClick={createMarket}
            >
              Create Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
