import React from "react"
import Popover from "@material-ui/core/Popover"
import Typography from "@material-ui/core/Typography"

import PropTypes from "prop-types"
import styled from "styled-components"

import { connect } from "react-redux"
import { viewActionTypes } from "../../store/view"

const mapStateToProps = state => ({
  view: state.view
})

const mapDispatchToProps = dispatch => ({
  closePasswordPopover: () => {
    dispatch({
      type: viewActionTypes.CLOSE_POPOVER
    })
  }
})

class BROCPopover extends React.Component {
  static propTypes = {
    anchorEl: PropTypes.object,
    onClose: PropTypes.func
  }

  render() {
    return (
      <Popover
        BackdropProps={{
          invisible: true
        }}
        disableAutoFocus={true}
        disableRestoreFocus={true}
        open={this.props.view.popover.open}
        anchorEl={this.props.anchorEl}
        onClose={this.props.closePasswordPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <PopoverText>
          <Typography>
            {this.props.view.popover.message}
          </Typography>
        </PopoverText>
      </Popover>
    )
  }
}

const PopoverText = styled.div`
  padding: 1rem;
  width: 14rem;
`
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BROCPopover)
