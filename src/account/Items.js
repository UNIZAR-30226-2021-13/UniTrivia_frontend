import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBox from '@material-ui/icons/AddBox';
import {Card, CardHeader, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));



const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

function Items(props) {
  const profile=props

  console.log(props.comprados);

  const classes = useStyles();
  const [values, setValues] = useState({
    played: '6',
    wins: '3',
    ncoins: '67'
  });

  function generate(element) {
    if (profile.comprados != null){
      return (profile.comprados).map((value) =>
          React.cloneElement(element, {
            key: value,
          }),
      );
    }


  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const clickAddAvatar = () => {
    console.log("avatar clickado");
  }

  const clickAddBanner = () => {
    console.log("banner clickado");
  }

  const clickAddFicha = () => {
    console.log("ficha clickado");
  }

  return (
      <Card>
        <CardHeader
            subheader="Objetos adquiridos por el usuario"
            title="Objetos"
        />
        <div className={classes.demo}>
          AVATARES
          <List>
            {generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                      primary="Single-line item"
                      secondary={false ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="add" onClick={clickAddAvatar}>
                      <AddBox/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
            )}
          </List>
        </div>
        <div className={classes.demo}>
          BANNERS
          <List>
            {generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                      primary="Single-line item"
                      secondary={false ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="add" onClick={clickAddBanner}>
                      <AddBox/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
            )}
          </List>
        </div>
        <div className={classes.demo}>
          FORMAS DE FICHA
          <List>
            {generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                      primary="Single-line item"
                      secondary={false ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="add" onClick={clickAddFicha}>
                      <AddBox/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
            )}
          </List>
        </div>
      </Card>

  );
}

export default Items;
