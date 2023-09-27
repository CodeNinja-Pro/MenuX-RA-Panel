// --- Material Ui Imports --- //
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import withStyles from '@material-ui/core/styles/withStyles'

export const FiCard = withStyles({
  root: {}
})(Card)

export const FiCardActionArea = withStyles({
  root: {}
})(CardActionArea)

export const FiCardActions = withStyles({
  root: {}
})(CardActions)

export const FiCardContent = withStyles({
  root: {
    position: 'relative',
    backgroundColor: 'transparent'
  }
})(CardContent)

export const FiCardMedia = withStyles({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '100%'
  }
})(CardMedia)

// --- Exports --- //
export default {
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardContent,
  FiCardMedia
}
