import React, {useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { setTimeout } from 'timers';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.black,
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if(!Boolean(anchorEl)) return;
    setTimeout(() => {
        const formatOptions = document.querySelectorAll('[data-edit-menu]');
        const divs = document.querySelectorAll('.MuiListItemText-root');

        divs.forEach((span) => {
            const sp = span as HTMLElement;
            sp.style.pointerEvents = 'none';
        });
        
        formatOptions.forEach(option => {
            const bt = option as HTMLElement;
            if (bt.getAttribute('listener') !== 'true') {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    const btn = e.target as HTMLElement;
                    const cmd_val = btn.getAttribute('data-edit-menu').split(':');
                    document.execCommand(cmd_val[0], false, cmd_val[1]);
                });
            };
        });
    }, 0)

  }, [anchorEl]);

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="outlined"
        color="primary"
        onClick={handleClick}
      >
        Format
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={handleClose}
      >
        <StyledMenuItem data-edit-menu="formatBlock:H1">
          <ListItemText primary="Header 1" />
        </StyledMenuItem>
        <StyledMenuItem data-edit-menu="formatBlock:H2">
          <ListItemText primary="Header 2" />
        </StyledMenuItem>
        <StyledMenuItem data-edit-menu="formatBlock:H3">
          <ListItemText primary="Header 3" />
        </StyledMenuItem>
        <StyledMenuItem data-edit-menu="formatBlock:H4">
          <ListItemText primary="Header 4" />
        </StyledMenuItem>
        <StyledMenuItem data-edit-menu="formatBlock:H5">
          <ListItemText primary="Header 5" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}