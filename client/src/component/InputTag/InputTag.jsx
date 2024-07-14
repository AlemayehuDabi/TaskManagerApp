import React, { useState } from "react";
import "./InputTag.css";
import { MdClose, MdAdd } from "react-icons/md";

const InputTag = ({ tags, setTags }) => {
  const [valTag, setValTag] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setValTag(e.target.value);
  };

  const addNewTag = () => {
    if (valTag.trim() !== "") {
      setTags((prevTags) => [...prevTags, valTag.trim()]);
      setValTag("");
    }
  };

  const addKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const deleteTag = (tagDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagDelete));
  };

  return (
    <>
      {tags?.length > 0 && (
        <div className="tag-list">
          {tags.map((tag, index) => (
            <span key={index} className="tag-item">
              #{tag.slice(0, 4)}
              <button
                className="tag-close-button"
                onClick={() => deleteTag(tag)}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="tag-cont">
        <input
          className="tag-input"
          placeholder="# tags"
          value={valTag}
          onChange={handleChange}
          onKeyDown={addKeyDown}
        />
        <button className="tag-button" onClick={addNewTag}>
          <MdAdd className="tag-icon" color="#fff" />
        </button>
      </div>
    </>
  );
};

export default InputTag;
