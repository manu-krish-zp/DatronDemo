import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Box } from "@mui/material";
import { FileContext } from "../Hooks/FileProvider";
import { download } from "../Functions/ExcelWriter";

const downloadOptions = ["Download XLSX", "Download CSV"];

export default function SplitButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const {data}=React.useContext(FileContext)

  const handleClick = () => {
    download(data!,selectedIndex)
  };
  

  const menuClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setIsOpen(false);
    download(data!,index)
  };

  const handleToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      ref.current &&
      ref.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setIsOpen(false);
  };

  return (
    <Box>
      <ButtonGroup
        variant="contained"
        ref={ref}
        aria-label="split button"
        //  sx={{position:{xs:"absolute",md:'static'},bottom:20,right:10}}
      >
        <Button onClick={handleClick}>{"Download"}</Button>
        <Button size="small" onClick={handleToggle}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 100,
        }}
        open={isOpen}
        anchorEl={ref.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {downloadOptions.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => menuClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
