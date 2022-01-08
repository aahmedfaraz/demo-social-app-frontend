import React from "react";
import { connect } from "react-redux";
import { setSelected } from "../../actions/menuDataActions";

const MenuTab = ({ selected, setSelected }) => {
  return (
    <ul className='menu-tab'>
      <li
        onClick={() => setSelected("profile")}
        className={selected === "profile" ? "selected" : ""}
      >
        My Profile
      </li>
      <li
        onClick={() => setSelected("timeline")}
        className={selected === "timeline" ? "selected" : ""}
      >
        My Timeline
      </li>
      <li
        onClick={() => setSelected("newsfeed")}
        className={selected === "newsfeed" ? "selected" : ""}
      >
        News Feed
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => ({
  selected: state.menu.selected,
});

export default connect(mapStateToProps, { setSelected })(MenuTab);
