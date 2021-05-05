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
import {Card, CardHeader, Collapse, Typography} from "@material-ui/core";
import PropTypes from 'prop-types';
import {FixedSizeList} from 'react-window';
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import axios from "axios";
import {getToken} from "../Utils/Common";

let avatares = [];
let banners = [];
let fichas = [];

const useStyles = makeStyles((theme) => ({

    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));


function renderRowAvatars(props){
  const { index, style } = props;
  let currentAv = '/images/avatars/' + avatares[index] + '.jpg';
    //console.log(avatares);

  const clickAddAvatar = () => {
        console.log("avatar clickado");
        console.log(String(avatares[index]));
        let aceptar = window.confirm("Presione en OK para cambiar su Avatar");
        if(aceptar === true) {
            axios.post('https://unitrivia.herokuapp.com/api/profile/modify/avatar', {}, {
                headers: {
                    jwt: getToken(),
                    idavatar: String(avatares[index])
                }
            }).then(response => {

                //setUserSession(response.data.token, response.data.user);
                window.location.reload(true);
            }).catch(error => {

                alert('Error al cambiar avatar');
            });
        }
  }

  return(

      <ListItem button style={style} key={index} onClick={clickAddAvatar}>
        <ListItemAvatar>
          <Avatar
            src={currentAv}
          >

          </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary="Avatar"
        />
      </ListItem>

  )
}

renderRowAvatars.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

function Items(props) {
    const profile = props.comprados;
    const classes = useStyles();
    const [openAvatar, setOpenAvatar] = useState(false);
    const [openBanner, setOpenBanner] = useState(false);
    const [openFicha, setOpenFicha] = useState(false);

    if(profile != null) {
        console.log(profile);
        avatares = [];
        banners = [];
        fichas = [];
        for (let i = 0; i < profile.length; i++) {
            let word = profile[i];
            if (word[0] == 'a') {
                avatares.push(word);
            } else if (word[0] == 'b') {
                banners.push(word);
            } else if (word[0] == 'f') {
                fichas.push(word);
            }
        }
    }


  //console.log(banners);
  //console.log(fichas);



    const handleClickAv = () => {
        setOpenAvatar(!openAvatar);
    };
    const handleClickBa = () => {
        setOpenBanner(!openBanner);
    };
    const handleClickFi = () => {
        setOpenFicha(!openFicha);
    };

  return (
      <Card>
        <CardHeader
            subheader="Objetos adquiridos por el usuario"
            title="Objetos"
        />
        <List>

          <div className={classes.demo}>
              <ListItem button onClick={handleClickAv}>
                  <ListItemText primary="Avatares" />
                  {openAvatar ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openAvatar} timeout="auto">
                  <FixedSizeList height={100} width={800} itemSize={46} itemCount={avatares.length}>
                      {renderRowAvatars}
                  </FixedSizeList>
              </Collapse>
          </div>

          <div className={classes.demo}>
              <ListItem button onClick={handleClickBa}>
                  <ListItemText primary="Banners" />
                  {openBanner ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openBanner} timeout="auto">
                  <FixedSizeList height={100} width={800} itemSize={46} itemCount={banners.length}>
                      {renderRowAvatars}
                  </FixedSizeList>
              </Collapse>
          </div>

          <div className={classes.demo}>
              <ListItem button onClick={handleClickFi}>
                  <ListItemText primary="Formas de ficha" />
                  {openFicha ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openFicha} timeout="auto">
                  <FixedSizeList height={100} width={800} itemSize={46} itemCount={fichas.length}>
                      {renderRowAvatars}
                  </FixedSizeList>
              </Collapse>
          </div>

        </List>
      </Card>

  );
}

export default Items;
